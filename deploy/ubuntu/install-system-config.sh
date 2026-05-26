#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/jim-site/app}"
DEPLOY_USER="${DEPLOY_USER:-ksp}"

install -m 0644 "$APP_DIR/deploy/ubuntu/jim-site.nginx" /etc/nginx/sites-available/jim-site
ln -sfn /etc/nginx/sites-available/jim-site /etc/nginx/sites-enabled/jim-site
rm -f /etc/nginx/sites-enabled/default

cat >/etc/sudoers.d/jim-site-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
EOF
chmod 0440 /etc/sudoers.d/jim-site-deploy

nginx -t
systemctl reload nginx || systemctl restart nginx
