#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-${JIM_REMOTE:-hp1}}"

bash "$SCRIPT_DIR/manage.sh" send "$TARGET"

cat <<EOF
Package copied to $TARGET:${JIM_ARCHIVE:-/tmp/jim-site.tar.gz}

Apply it with:
  bash deploy/manage.sh deploy $TARGET
EOF
