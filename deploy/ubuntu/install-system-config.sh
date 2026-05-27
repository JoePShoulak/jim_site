#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/jim-site/app}"
DEPLOY_USER="${DEPLOY_USER:-ksp}"
DEPLOY_OPERATOR="${DEPLOY_OPERATOR:-leo}"

install -m 0644 "$APP_DIR/deploy/ubuntu/jim-site.nginx" /etc/nginx/sites-available/jim-site
ln -sfn /etc/nginx/sites-available/jim-site /etc/nginx/sites-enabled/jim-site
rm -f /etc/nginx/sites-enabled/default

install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-apply-deploy" /usr/local/sbin/jim-site-apply-deploy
install -m 0755 "$APP_DIR/deploy/ubuntu/jim-site-disable" /usr/local/sbin/jim-site-disable

cat >/etc/sudoers.d/jim-site-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /usr/local/sbin/jim-site-disable, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-apply-deploy /tmp/jim-site.tar.gz
$DEPLOY_OPERATOR ALL=(root) NOPASSWD: /usr/local/sbin/jim-site-install-system-config, /usr/local/sbin/jim-site-disable, /bin/systemctl reload nginx, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
EOF
chmod 0440 /etc/sudoers.d/jim-site-deploy
visudo -cf /etc/sudoers.d/jim-site-deploy

nginx -t
systemctl reload nginx || systemctl restart nginx
