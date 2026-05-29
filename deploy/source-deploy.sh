#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-hp1}"
REMOTE_PATH="${2:-/tmp/jim-site.tar.gz}"
SSH_CONFIG="$SCRIPT_DIR/dist/jim-ssh-config"

ensure_ssh_config() {
  mkdir -p "$(dirname "$SSH_CONFIG")"
  cat > "$SSH_CONFIG" <<EOF
Host hp1
  HostName 192.168.20.21
  User leo
  StrictHostKeyChecking accept-new

Host hp4
  HostName 192.168.20.24
  User leo
  StrictHostKeyChecking accept-new

Host *
  StrictHostKeyChecking accept-new
EOF
}

bash "$SCRIPT_DIR/package-for-ubuntu.sh"
ensure_ssh_config
scp -F "$SSH_CONFIG" "$SCRIPT_DIR/dist/jim-site.tar.gz" "$TARGET:$REMOTE_PATH"

cat <<EOF
Package copied to $TARGET:$REMOTE_PATH

Apply it with:
  ssh -F $SSH_CONFIG $TARGET 'sudo -n /usr/local/sbin/jim-site-apply-deploy $REMOTE_PATH'
EOF

