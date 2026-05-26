#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/jim-site/app}"

cd "$APP_DIR"

if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

npm run build

if command -v jim-site-install-system-config >/dev/null 2>&1; then
  sudo jim-site-install-system-config
fi

sudo nginx -t
sudo systemctl reload nginx
