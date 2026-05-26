#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="${APP_NAME:-jim-site}"
DEPLOY_USER="${DEPLOY_USER:-ksp}"
APP_ROOT="${APP_ROOT:-/opt/$APP_NAME}"
APP_DIR="${APP_DIR:-$APP_ROOT/app}"
BARE_REPO="${BARE_REPO:-/srv/git/$APP_NAME.git}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script with sudo."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

apt-get update
apt-get install -y ca-certificates curl git nginx rsync sudo

if ! command -v node >/dev/null 2>&1 || ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 20 ? 0 : 1)' >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "$DEPLOY_USER"
fi

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_ROOT" "$APP_DIR" "$(dirname "$BARE_REPO")"

if [[ ! -d "$BARE_REPO" ]]; then
  sudo -u "$DEPLOY_USER" git init --bare "$BARE_REPO"
fi

install -m 0755 "$SCRIPT_DIR/git-post-receive" "$BARE_REPO/hooks/post-receive"
chown "$DEPLOY_USER:$DEPLOY_USER" "$BARE_REPO/hooks/post-receive"

install -m 0755 "$SCRIPT_DIR/install-system-config.sh" /usr/local/sbin/jim-site-install-system-config

cat >/etc/sudoers.d/jim-site-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
EOF
chmod 0440 /etc/sudoers.d/jim-site-deploy

if [[ -d "$REPO_DIR/.git" ]]; then
  rsync -a --delete \
    --exclude .git \
    --exclude node_modules \
    --exclude dist \
    "$REPO_DIR/" "$APP_DIR/"
  chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_ROOT"
  jim-site-install-system-config
  sudo -u "$DEPLOY_USER" bash "$APP_DIR/deploy/ubuntu/deploy.sh"
fi

cat <<EOF

Bootstrap complete.

Production URL:
  http://$(hostname -I | awk '{print $1}'):5101

Push-to-deploy remote:
  ssh://$DEPLOY_USER@$(hostname -I | awk '{print $1}')$BARE_REPO

Expected branch:
  $DEPLOY_BRANCH
EOF
