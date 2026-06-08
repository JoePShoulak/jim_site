#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/jim-site/app}"
BUILD_ENV_FILE="${BUILD_ENV_FILE:-${EMAILJS_ENV_FILE:-/opt/jim-site/emailjs.env}}"

cd "$APP_DIR"

if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

if [[ -f "$BUILD_ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$BUILD_ENV_FILE"
  set +a
fi

missing_emailjs_vars=()
for name in VITE_EMAILJS_SERVICE_ID VITE_EMAILJS_TEMPLATE_ID VITE_EMAILJS_PUBLIC_KEY; do
  if [[ -z "${!name:-}" ]]; then
    missing_emailjs_vars+=("$name")
  fi
done

if (( ${#missing_emailjs_vars[@]} > 0 )); then
  printf 'Missing EmailJS build config in %s:\n' "$BUILD_ENV_FILE" >&2
  printf '  %s\n' "${missing_emailjs_vars[@]}" >&2
  exit 1
fi

npm run build

if command -v jim-site-install-system-config >/dev/null 2>&1; then
  sudo jim-site-install-system-config
fi

sudo nginx -t
sudo systemctl reload nginx
