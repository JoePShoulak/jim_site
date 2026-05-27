#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"
ARCHIVE="$OUT_DIR/jim-site.tar.gz"

mkdir -p "$OUT_DIR"
rm -f "$ARCHIVE"

tar -czf "$ARCHIVE" \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='deploy/dist' \
  -C "$REPO_DIR" .

echo "$ARCHIVE"
