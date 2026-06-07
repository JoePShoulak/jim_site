#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/jim-site/app}"
DEPLOY_USER="${DEPLOY_USER:-ksp}"
DEPLOY_OPERATOR="${DEPLOY_OPERATOR:-leo}"
ISSUE_CERTS=0

case "${1:-}" in
  --issue-certs)
    ISSUE_CERTS=1
    ;;
  "")
    ;;
  *)
    echo "Usage: jim-site-install-system-config [--issue-certs]" >&2
    exit 64
    ;;
esac

install -m 0644 "$APP_DIR/deploy/ubuntu/jim-site.nginx" /etc/nginx/sites-available/jim-site
ln -sfn /etc/nginx/sites-available/jim-site /etc/nginx/sites-enabled/jim-site
rm -f /etc/nginx/sites-enabled/default

install -m 0755 "$APP_DIR/deploy/ubuntu/install-system-config.sh" /usr/local/sbin/jim-site-install-system-config
install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-apply-deploy" /usr/local/sbin/jim-site-apply-deploy
install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-disable" /usr/local/sbin/jim-site-disable
install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-issue-certs" /usr/local/sbin/jim-site-issue-certs

if [[ -f /etc/letsencrypt/live/pitcherbasinandtowel.com/fullchain.pem && -f /etc/letsencrypt/live/pitcherbasinandtowel.com/privkey.pem ]]; then
  /usr/local/sbin/jim-site-issue-certs --nginx-only
fi

cat >/etc/sudoers.d/jim-site-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /usr/local/sbin/jim-site-disable, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-apply-deploy /tmp/jim-site.tar.gz
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /usr/local/sbin/jim-site-install-system-config --issue-certs, /usr/local/sbin/jim-site-disable, /usr/local/sbin/jim-site-issue-certs, /usr/local/sbin/jim-site-issue-certs *, /usr/local/sbin/jim-site-issue-certs --status, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/bin/tail -n 0 -F /var/log/nginx/jim-site-error.log /var/log/nginx/jim-site-hermes.jsonl /var/log/nginx/jim-site-public-error.log /var/log/nginx/jim-site-public.jsonl /var/log/nginx/jim-site-public-origin-error.log /var/log/nginx/jim-site-public-origin.jsonl /var/log/nginx/jim-site-public-ssl-error.log /var/log/nginx/jim-site-public-ssl.jsonl, /usr/bin/tail -n 120 /var/log/nginx/jim-site-error.log /var/log/nginx/jim-site-hermes.jsonl /var/log/nginx/jim-site-public-error.log /var/log/nginx/jim-site-public.jsonl /var/log/nginx/jim-site-public-origin-error.log /var/log/nginx/jim-site-public-origin.jsonl /var/log/nginx/jim-site-public-ssl-error.log /var/log/nginx/jim-site-public-ssl.jsonl
EOF
chmod 0440 /etc/sudoers.d/jim-site-deploy
visudo -cf /etc/sudoers.d/jim-site-deploy

if [[ "$ISSUE_CERTS" == "1" ]]; then
  /usr/local/sbin/jim-site-issue-certs
  exit 0
fi

nginx -t
systemctl reload nginx || systemctl restart nginx
