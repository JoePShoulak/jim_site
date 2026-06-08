#!/usr/bin/env bash
set -Eeuo pipefail

ARCHIVE="${1:-/tmp/jim-site.tar.gz}"
APP_NAME="${APP_NAME:-jim-site}"
DEPLOY_USER="${DEPLOY_USER:-leo}"
APP_ROOT="${APP_ROOT:-/opt/$APP_NAME}"
APP_DIR="${APP_DIR:-$APP_ROOT/app}"

if [[ ! -f "$ARCHIVE" ]]; then
  echo "Archive not found: $ARCHIVE" >&2
  exit 1
fi

if [[ "${EUID}" -ne 0 ]]; then
  exec sudo bash "$0" "$ARCHIVE"
fi

if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "$DEPLOY_USER"
fi

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$APP_ROOT" "$APP_DIR"
find "$APP_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
tar -xzf "$ARCHIVE" -C "$APP_DIR"
install -m 0755 "$APP_DIR/deploy/ubuntu/install-system-config.sh" /usr/local/sbin/jim-site-install-system-config
install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-apply-deploy" /usr/local/sbin/jim-site-apply-deploy
install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-disable" /usr/local/sbin/jim-site-disable
install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-issue-certs" /usr/local/sbin/jim-site-issue-certs
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_ROOT"

sudo -u "$DEPLOY_USER" bash -lc "cd '$APP_DIR' && bash deploy/ubuntu/deploy.sh"
