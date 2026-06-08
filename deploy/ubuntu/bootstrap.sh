#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="${APP_NAME:-jim-site}"
DEPLOY_USER="${DEPLOY_USER:-leo}"
DEPLOY_OPERATOR="${DEPLOY_OPERATOR:-leo}"
APP_ROOT="${APP_ROOT:-/opt/$APP_NAME}"
APP_DIR="${APP_DIR:-$APP_ROOT/app}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script with sudo."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

apt-get update
apt-get install -y ca-certificates curl nginx sudo

if ! command -v node >/dev/null 2>&1 || ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 20 ? 0 : 1)' >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "$DEPLOY_USER"
fi

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_ROOT" "$APP_DIR"

install -m 0755 "$SCRIPT_DIR/install-system-config.sh" /usr/local/sbin/jim-site-install-system-config
install -m 0755 "$SCRIPT_DIR/jim-site-apply-deploy" /usr/local/sbin/jim-site-apply-deploy
install -m 0755 "$SCRIPT_DIR/jim-site-disable" /usr/local/sbin/jim-site-disable
install -m 0755 "$SCRIPT_DIR/jim-site-issue-certs" /usr/local/sbin/jim-site-issue-certs

cat >/etc/sudoers.d/jim-site-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /usr/local/sbin/jim-site-disable, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-apply-deploy /tmp/jim-site.tar.gz
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /usr/local/sbin/jim-site-install-system-config --issue-certs, /usr/local/sbin/jim-site-disable, /usr/local/sbin/jim-site-issue-certs, /usr/local/sbin/jim-site-issue-certs *, /usr/local/sbin/jim-site-issue-certs --status, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/bin/tail -n 0 -F /var/log/nginx/jim-site-error.log /var/log/nginx/jim-site-hermes.jsonl /var/log/nginx/jim-site-public-error.log /var/log/nginx/jim-site-public.jsonl /var/log/nginx/jim-site-public-origin-error.log /var/log/nginx/jim-site-public-origin.jsonl /var/log/nginx/jim-site-public-ssl-error.log /var/log/nginx/jim-site-public-ssl.jsonl, /usr/bin/tail -n 120 /var/log/nginx/jim-site-error.log /var/log/nginx/jim-site-hermes.jsonl /var/log/nginx/jim-site-public-error.log /var/log/nginx/jim-site-public.jsonl /var/log/nginx/jim-site-public-origin-error.log /var/log/nginx/jim-site-public-origin.jsonl /var/log/nginx/jim-site-public-ssl-error.log /var/log/nginx/jim-site-public-ssl.jsonl
EOF
chmod 0440 /etc/sudoers.d/jim-site-deploy
visudo -cf /etc/sudoers.d/jim-site-deploy

if [[ -d "$REPO_DIR/.git" ]]; then
  find "$APP_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
  tar -czf /tmp/jim-site-bootstrap.tar.gz \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='deploy/dist' \
    -C "$REPO_DIR" .
  tar -xzf /tmp/jim-site-bootstrap.tar.gz -C "$APP_DIR"
  rm -f /tmp/jim-site-bootstrap.tar.gz
  chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_ROOT"
  jim-site-install-system-config
  sudo -u "$DEPLOY_USER" bash "$APP_DIR/deploy/ubuntu/deploy.sh"
fi

cat <<EOF

Bootstrap complete.

Production URL:
  http://$(hostname -I | awk '{print $1}'):5101

No-password deploy command from your development machine:
  cd C:/Users/joeps/coding/jim_site
  source deploy/aliases.sh
  deploy

Passwordless deploy operator:
  $DEPLOY_OPERATOR
EOF
