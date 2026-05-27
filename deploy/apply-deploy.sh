#!/usr/bin/env bash
set -Eeuo pipefail

ARCHIVE="${1:-/tmp/jim-site.tar.gz}"
APP_NAME="${APP_NAME:-jim-site}"
DEPLOY_USER="${DEPLOY_USER:-ksp}"
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
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_ROOT"

sudo -u "$DEPLOY_USER" bash -lc "cd '$APP_DIR' && bash deploy/ubuntu/deploy.sh"
