#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

REMOTE="${JIM_REMOTE:-hp1}"
SSH_CONFIG="$ROOT_DIR/deploy/dist/jim-ssh-config"
SSH_CONFIG_REL="deploy/dist/jim-ssh-config"
SSH_KNOWN_HOSTS="$ROOT_DIR/deploy/dist/jim-known-hosts"
SSH_KNOWN_HOSTS_REL="deploy/dist/jim-known-hosts"
USER_KNOWN_HOSTS="${JIM_USER_KNOWN_HOSTS:-$HOME/.ssh/known_hosts}"
SSH_IDENTITY="${JIM_SSH_IDENTITY:-}"
SSH_OPTS=(-F "$SSH_CONFIG" -o BatchMode=yes)
SSH_INTERACTIVE_OPTS=(-F "$SSH_CONFIG")
ARCHIVE_LOCAL="$ROOT_DIR/deploy/dist/jim-site.tar.gz"
ARCHIVE_REMOTE="${JIM_ARCHIVE:-/tmp/jim-site.tar.gz}"
BOOTSTRAP_DIR="${JIM_BOOTSTRAP_DIR:-~/jim-site-deploy}"
APPLY="/usr/local/sbin/jim-site-apply-deploy"
ENABLE="/usr/local/sbin/jim-site-install-system-config"
DISABLE="/usr/local/sbin/jim-site-disable"
ISSUE_CERTS="/usr/local/sbin/jim-site-issue-certs"
PUBLIC_DOMAIN="${JIM_PUBLIC_DOMAIN:-pitcherbasinandtowel.com}"
PUBLIC_ALT_DOMAIN="${JIM_PUBLIC_ALT_DOMAIN:-www.pitcherbasinandtowel.com}"
PROD_URL="${JIM_PROD_URL:-https://pitcherbasinandtowel.com}"
VERBOSE="${JIM_DEPLOY_VERBOSE:-0}"
USE_COLOR=0

if [[ -t 1 && -z "${NO_COLOR:-}" ]]; then
  USE_COLOR=1
fi

usage() {
  cat <<EOF
Usage: bash deploy/manage.sh [--verbose] <command> [target]

Commands:
  package     Build the deploy archive only
  send        Build and copy the deploy archive only
  deploy      Package, copy, and apply through /usr/local/sbin/jim-site-apply-deploy
  bootstrap   First-time path: copy archive, run installer, then apply deploy
  auth-check  Check passwordless SSH and deploy sudo access
  trust       Refresh the deploy SSH host key for a rebuilt host/IP
  status      Show Jim site, Nginx, and endpoint status
  logs        Follow Jim Nginx logs from now
  logs-recent Show recent Jim Nginx logs
  cert        Issue/renew the pitcherbasinandtowel.com Let's Encrypt cert
  sudoers     Refresh Nginx config and deploy sudoers from the deployed app copy
  up          Enable the Jim Nginx site and reload Nginx
  down        Disable only the Jim Nginx site and reload Nginx
  restart     Verify and reload Nginx

Targets:
  hp1         Default Jim site host
  hp4         Alternate Shoulak HP host

Environment:
  JIM_REMOTE=hp1
  JIM_HP1_HOST=192.168.20.21
  JIM_HP4_HOST=192.168.20.24
  JIM_USER=leo
  JIM_SSH_IDENTITY=/path/to/key
  JIM_CERTBOT_EMAIL=joep@shoulak.org
EOF
}

color_text() {
  local color="$1"
  local text="$2"

  if [[ "$USE_COLOR" == "1" ]]; then
    printf '\033[%sm%s\033[0m' "$color" "$text"
  else
    printf '%s' "$text"
  fi
}

status_run() {
  color_text 36 "RUN"
}

status_ok() {
  color_text 32 "OK"
}

status_fail() {
  color_text 31 "ERR"
}

abort_after_step_failure() {
  local exit_code="$1"
  local label="$2"

  echo "Aborting after failed step: $label" >&2
  exit "$exit_code"
}

run_step() {
  local label="$1"
  local exit_code
  shift

  if [[ "$VERBOSE" == "1" ]]; then
    printf '\n== %s ==\n' "$label"
    if "$@"; then
      return 0
    else
      exit_code=$?
      abort_after_step_failure "$exit_code" "$label"
    fi
  fi

  local output_file
  output_file="$(mktemp)"
  printf '[%s] %s ... ' "$(status_run)" "$label"
  if "$@" >"$output_file" 2>&1; then
    printf '[%s]\n' "$(status_ok)"
    rm -f "$output_file"
    return 0
  else
    exit_code=$?
  fi

  printf '[%s]\n' "$(status_fail)"
  if [[ -s "$output_file" ]]; then
    sed 's/^/  /' "$output_file" >&2
  fi
  rm -f "$output_file"
  abort_after_step_failure "$exit_code" "$label"
}

run_interactive_step() {
  local label="$1"
  local exit_code
  shift

  printf '[%s] %s\n' "$(status_run)" "$label"
  if "$@"; then
    printf '[%s] %s\n' "$(status_ok)" "$label"
    return 0
  else
    exit_code=$?
  fi

  printf '[%s] %s\n' "$(status_fail)" "$label" >&2
  abort_after_step_failure "$exit_code" "$label"
}

ensure_ssh_config() {
  cd "$ROOT_DIR"
  mkdir -p "$(dirname "$SSH_CONFIG_REL")"
  cat > "$SSH_CONFIG_REL" <<EOF
Host hp1
  HostName ${JIM_HP1_HOST:-192.168.20.21}
  User ${JIM_USER:-leo}
  StrictHostKeyChecking accept-new

Host hp4
  HostName ${JIM_HP4_HOST:-192.168.20.24}
  User ${JIM_USER:-leo}
  StrictHostKeyChecking accept-new

Host *
  StrictHostKeyChecking accept-new
  UserKnownHostsFile $SSH_KNOWN_HOSTS
EOF

  if [[ -n "$SSH_IDENTITY" ]]; then
    cat >> "$SSH_CONFIG_REL" <<EOF
  IdentityFile $SSH_IDENTITY
  IdentitiesOnly yes
EOF
  fi
}

target_or_default() {
  echo "${1:-$REMOTE}"
}

require_target() {
  case "$1" in
    hp1|hp4)
      ;;
    *)
      echo "Unknown target: $1" >&2
      usage >&2
      exit 64
      ;;
  esac
}

target_host() {
  local target="$1"

  require_target "$target"
  ensure_ssh_config
  ssh -G -F "$SSH_CONFIG" "$target" | awk '$1 == "hostname" { print $2; exit }'
}

target_known_host_names() {
  local target="$1"
  local host
  host="$(target_host "$target")"

  printf '%s\n' "$host" "$target"
}

remote_ssh() {
  local target="$1"
  shift

  require_target "$target"
  ensure_ssh_config
  ssh "${SSH_OPTS[@]}" "$target" "$@"
}

remote_interactive_ssh() {
  local target="$1"
  shift

  require_target "$target"
  ensure_ssh_config
  ssh "${SSH_INTERACTIVE_OPTS[@]}" "$target" "$@"
}

package_app() {
  run_step "build Jim site deploy archive" bash -c "cd '$ROOT_DIR' && bash deploy/package-for-ubuntu.sh"
}

copy_archive() {
  local target="$1"
  local ssh_mode="${2:-batch}"
  local scp_opts=("${SSH_OPTS[@]}")

  if [[ "$ssh_mode" == "interactive" ]]; then
    scp_opts=("${SSH_INTERACTIVE_OPTS[@]}")
  fi

  require_target "$target"
  ensure_ssh_config
  if [[ "$ssh_mode" == "interactive" ]]; then
    run_interactive_step "upload archive to $target" scp "${scp_opts[@]}" "$ARCHIVE_LOCAL" "$target:$ARCHIVE_REMOTE"
  else
    run_step "upload archive to $target" scp "${scp_opts[@]}" "$ARCHIVE_LOCAL" "$target:$ARCHIVE_REMOTE"
  fi
}

send_app() {
  local target="$1"
  local ssh_mode="${2:-batch}"

  package_app
  copy_archive "$target" "$ssh_mode"
}

deploy_app() {
  local target="$1"

  echo "Deploy Jim site to $target"
  send_app "$target"
  run_step "apply deploy on $target" remote_ssh "$target" "sudo -n $APPLY $ARCHIVE_REMOTE"
}

bootstrap_app() {
  local target="$1"

  echo "Bootstrap Jim site on $target"
  send_app "$target" interactive
  run_interactive_step "install Jim site on $target" remote_interactive_ssh "$target" -t "rm -rf $BOOTSTRAP_DIR && mkdir -p $BOOTSTRAP_DIR && tar -xzf $ARCHIVE_REMOTE -C $BOOTSTRAP_DIR && cd $BOOTSTRAP_DIR && sudo bash deploy/ubuntu/bootstrap.sh && sudo bash deploy/apply-deploy.sh $ARCHIVE_REMOTE"
}

up_app() {
  local target="$1"

  echo "Enable Jim site on $target"
  run_step "enable site and reload nginx" remote_ssh "$target" "sudo -n $ENABLE"
}

down_app() {
  local target="$1"

  echo "Disable Jim site on $target"
  run_step "disable site and reload nginx" remote_ssh "$target" "sudo -n $DISABLE"
}

restart_app() {
  local target="$1"

  echo "Reload Jim site on $target"
  run_step "verify and reload nginx" remote_ssh "$target" "sudo -n /usr/sbin/nginx -t && sudo -n /usr/bin/systemctl reload nginx"
}

status_app() {
  local target="$1"

  require_target "$target"
  ensure_ssh_config
  echo "== $target =="
  ssh "${SSH_OPTS[@]}" "$target" '
    printf "host="; hostname
    printf "nginx="; systemctl is-active nginx 2>/dev/null || true
    printf "site="; test -e /etc/nginx/sites-enabled/jim-site && echo enabled || echo disabled
    printf "local_http="; curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:5101/ || echo unavailable
    printf "public_origin="; curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:5102/ -H "Host: '"$PUBLIC_DOMAIN"'" || echo unavailable
    printf "local_https="; curl -kfsS -o /dev/null -w "%{http_code}\n" https://127.0.0.1/ -H "Host: '"$PUBLIC_DOMAIN"'" || echo unavailable
    printf "public_http="; curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1/ -H "Host: '"$PUBLIC_DOMAIN"'" || echo unavailable
    printf "cert="; sudo -n '"$ISSUE_CERTS"' --status | paste -sd " " -
    printf "public_url="; echo "'"$PROD_URL"'"
  '
}

logs_app() {
  local target="$1"

  echo "Follow Jim site logs on $target"
  remote_ssh "$target" "sudo -n /usr/bin/tail -n 0 -F /var/log/nginx/jim-site-error.log /var/log/nginx/jim-site-hermes.jsonl /var/log/nginx/jim-site-public-error.log /var/log/nginx/jim-site-public.jsonl /var/log/nginx/jim-site-public-origin-error.log /var/log/nginx/jim-site-public-origin.jsonl /var/log/nginx/jim-site-public-ssl-error.log /var/log/nginx/jim-site-public-ssl.jsonl"
}

logs_recent_app() {
  local target="$1"

  remote_ssh "$target" "sudo -n /usr/bin/tail -n 120 /var/log/nginx/jim-site-error.log /var/log/nginx/jim-site-hermes.jsonl /var/log/nginx/jim-site-public-error.log /var/log/nginx/jim-site-public.jsonl /var/log/nginx/jim-site-public-origin-error.log /var/log/nginx/jim-site-public-origin.jsonl /var/log/nginx/jim-site-public-ssl-error.log /var/log/nginx/jim-site-public-ssl.jsonl"
}

sudoers_app() {
  local target="$1"

  run_step "refresh Jim site config and sudoers on $target" remote_ssh "$target" "sudo -n $ENABLE"
}

cert_app() {
  local target="$1"
  local email="${JIM_CERTBOT_EMAIL:-joep@shoulak.org}"
  local command="sudo -n $ENABLE --issue-certs"

  if [[ "$email" == *"'"* || "$email" == *" "* ]]; then
    echo "JIM_CERTBOT_EMAIL must not contain spaces or single quotes." >&2
    exit 64
  fi

  if [[ "$email" != "joep@shoulak.org" ]]; then
    command="sudo -n $ISSUE_CERTS '$email'"
  fi

  echo "Issue/renew Jim site certificate on $target"
  run_step "refresh Jim site config and sudoers on $target" remote_ssh "$target" "sudo -n $ENABLE"
  run_step "issue certificate for $PUBLIC_DOMAIN" remote_ssh "$target" "$command"
}

auth_check_app() {
  local target="$1"

  ensure_ssh_config
  ssh "${SSH_OPTS[@]}" "$target" "set -e; echo 'ssh ok'; sudo -n -l >/tmp/jim-site-sudo-list.txt; grep -F '$APPLY $ARCHIVE_REMOTE' /tmp/jim-site-sudo-list.txt >/dev/null; grep -F '$ENABLE' /tmp/jim-site-sudo-list.txt >/dev/null; grep -F '$DISABLE' /tmp/jim-site-sudo-list.txt >/dev/null; grep -F '$ISSUE_CERTS' /tmp/jim-site-sudo-list.txt >/dev/null; grep -F '/usr/sbin/nginx -t' /tmp/jim-site-sudo-list.txt >/dev/null; grep -F '/usr/bin/systemctl reload nginx' /tmp/jim-site-sudo-list.txt >/dev/null; grep -F '/usr/bin/tail -n 120 /var/log/nginx/jim-site-error.log /var/log/nginx/jim-site-hermes.jsonl /var/log/nginx/jim-site-public-error.log /var/log/nginx/jim-site-public.jsonl /var/log/nginx/jim-site-public-origin-error.log /var/log/nginx/jim-site-public-origin.jsonl /var/log/nginx/jim-site-public-ssl-error.log /var/log/nginx/jim-site-public-ssl.jsonl' /tmp/jim-site-sudo-list.txt >/dev/null; rm -f /tmp/jim-site-sudo-list.txt; echo 'deploy sudo ok'"
}

trust_app() {
  local target="$1"
  local host
  local scanned_keys

  host="$(target_host "$target")"
  cd "$ROOT_DIR"
  mkdir -p "$(dirname "$SSH_KNOWN_HOSTS_REL")"
  touch "$SSH_KNOWN_HOSTS_REL"
  chmod u+rw "$SSH_KNOWN_HOSTS_REL" 2>/dev/null || true
  mkdir -p "$(dirname "$USER_KNOWN_HOSTS")"
  touch "$USER_KNOWN_HOSTS"
  chmod u+rw "$USER_KNOWN_HOSTS" 2>/dev/null || true

  while IFS= read -r known_host; do
    ssh-keygen -R "$known_host" -f "$SSH_KNOWN_HOSTS_REL" >/dev/null 2>&1 || true
    ssh-keygen -R "$known_host" -f "$USER_KNOWN_HOSTS" >/dev/null 2>&1 || true
  done < <(target_known_host_names "$target")

  echo "Scanning SSH host key for $target ($host)"
  scanned_keys="$(ssh-keyscan -T 5 -t ed25519 "$host")"
  printf '%s\n' "$scanned_keys" >> "$SSH_KNOWN_HOSTS_REL"
  printf '%s\n' "$scanned_keys" >> "$USER_KNOWN_HOSTS"
  sort -u "$SSH_KNOWN_HOSTS_REL" -o "$SSH_KNOWN_HOSTS_REL"
  sort -u "$USER_KNOWN_HOSTS" -o "$USER_KNOWN_HOSTS"
  ssh-keygen -lf "$SSH_KNOWN_HOSTS_REL" | grep -E "(^| )$host( |$|,)" || true
}

main() {
  local args=()
  local arg
  for arg in "$@"; do
    case "$arg" in
      -v|--verbose)
        VERBOSE=1
        ;;
      *)
        args+=("$arg")
        ;;
    esac
  done

  set -- "${args[@]}"

  local command="${1:-}"
  local target
  target="$(target_or_default "${2:-}")"

  case "$command" in
    package)
      package_app
      ;;
    send)
      send_app "$target"
      ;;
    deploy)
      deploy_app "$target"
      ;;
    bootstrap)
      bootstrap_app "$target"
      ;;
    auth-check)
      auth_check_app "$target"
      ;;
    trust)
      trust_app "$target"
      ;;
    status)
      status_app "$target"
      ;;
    logs)
      logs_app "$target"
      ;;
    logs-recent)
      logs_recent_app "$target"
      ;;
    cert)
      cert_app "$target"
      ;;
    sudoers)
      sudoers_app "$target"
      ;;
    up)
      up_app "$target"
      ;;
    down)
      down_app "$target"
      ;;
    restart)
      restart_app "$target"
      ;;
    -h|--help|help|"")
      usage
      ;;
    *)
      echo "Unknown command: $command" >&2
      usage >&2
      exit 64
      ;;
  esac
}

main "$@"
