#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-hp4}"
REMOTE_PATH="${2:-/tmp/jim-site.tar.gz}"

bash "$SCRIPT_DIR/package-for-ubuntu.sh"
scp "$SCRIPT_DIR/dist/jim-site.tar.gz" "$TARGET:$REMOTE_PATH"

cat <<EOF
Package copied to $TARGET:$REMOTE_PATH

Apply it with:
  ssh $TARGET 'sudo -n /usr/local/sbin/jim-site-apply-deploy $REMOTE_PATH'
EOF
