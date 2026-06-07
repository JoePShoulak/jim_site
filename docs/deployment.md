# LAN Production Deployment

`jim_site` runs as a static Vite build served by Nginx on the Ubuntu HP1 server.
Deployments use the same tar archive pattern as the other Shoulak apps: build a
package locally, copy it to the server, then ask the server to unpack, build, and
reload Nginx.

## Production Shape

```text
Browser
  -> https://pitcherbasinandtowel.com
  -> HP1 Nginx static frontend
  -> /opt/jim-site/app/dist
```

Key paths and identities:

- app directory: `/opt/jim-site/app`
- deploy archive: `/tmp/jim-site.tar.gz`
- deploy user that owns the app files: `ksp`
- passwordless deploy operator: `leo` by default
- Nginx site file: `/etc/nginx/sites-available/jim-site`
- HTTPS site file: `/etc/nginx/sites-available/jim-site-ssl`
- production port: `5101`
- public origin port: `5102`
- public domains: `pitcherbasinandtowel.com`, `www.pitcherbasinandtowel.com`

## Short Commands

From Git Bash on the dev machine:

```bash
cd C:/Users/joeps/coding/jim_site
source deploy/aliases.sh
```

Then use the same verbs as the other apps:

```bash
deploy hp1
status hp1
logs-recent hp1
cert hp1
restart hp1
```

`down` disables only the Jim Nginx site and reloads Nginx. It does not stop the
shared HP1 Nginx process.

## First Server Setup

Run this once from Git Bash on your development machine. This packages the app,
copies it to HP1, runs bootstrap, applies the package, builds the frontend, and
reloads Nginx.

```bash
bootstrap
```

The setup step may ask for the server password because it installs system config.
After that, normal deploys should use `deploy`.

If the SSH user on HP1 is not `leo`, set `DEPLOY_OPERATOR` during bootstrap on
the server:

```bash
sudo DEPLOY_OPERATOR=your_user bash deploy/ubuntu/bootstrap.sh
```

## Normal Deploy

After the first setup, use:

```bash
deploy hp1
```

That command:

- creates `deploy/dist/jim-site.tar.gz`
- copies the archive to `/tmp/jim-site.tar.gz` on HP1
- runs the locked-down deploy wrapper
- replaces `/opt/jim-site/app`
- installs dependencies
- builds the Vite app
- verifies and reloads Nginx

## Operator Commands

The main operator surface is `deploy/manage.sh`, matching the other Shoulak
projects:

```bash
bash deploy/manage.sh package
bash deploy/manage.sh send hp1
bash deploy/manage.sh deploy hp1
bash deploy/manage.sh bootstrap hp1
bash deploy/manage.sh auth-check hp1
bash deploy/manage.sh trust hp1
bash deploy/manage.sh status hp1
bash deploy/manage.sh logs-recent hp1
bash deploy/manage.sh logs hp1
bash deploy/manage.sh cert hp1
bash deploy/manage.sh sudoers hp1
bash deploy/manage.sh up hp1
bash deploy/manage.sh down hp1
bash deploy/manage.sh restart hp1
```

`hp1` is the default target, so `bash deploy/manage.sh deploy` still deploys to
the production Jim site host. `hp4` is available as an alternate target when
needed.

Use `auth-check` before a normal deploy if the host has been rebuilt or sudoers
may be stale. Use `sudoers` after a deploy when the deployed app copy contains a
new sudoers shape.

## HTTPS Certificate

The public site uses a dedicated Let's Encrypt cert for:

```text
pitcherbasinandtowel.com
www.pitcherbasinandtowel.com
```

The base Nginx config serves HTTP on port `80` for ACME challenges and redirects
normal public traffic to HTTPS. Port `5102` serves the same static app as a
public origin for any HTTPS-terminating front proxy; it must not redirect back to
HTTPS or the proxy can loop. The SSL Nginx site is generated only after certbot
succeeds, so first deploys do not fail because certificate files are missing.

After deploying the cert helper, issue or renew the cert with:

```bash
bash deploy/manage.sh cert hp1
```

The helper defaults to `joep@shoulak.org` for Let's Encrypt registration.

## Scripts

- `deploy/package-for-ubuntu.sh`: creates the tar archive.
- `deploy/source-deploy.sh`: legacy send helper; prefer `deploy/manage.sh send`.
- `deploy/manage.sh`: uniform package, send, deploy, status, logs, and service wrapper.
- `deploy/apply-deploy.sh`: applies an archive on the target machine.
- `deploy/ubuntu/bootstrap.sh`: first-time HP1 setup.
- `deploy/ubuntu/jim-site-apply-deploy`: no-password server-side deploy wrapper.
- `deploy/ubuntu/jim-site-disable`: disables only the Jim Nginx site.
- `deploy/ubuntu/jim-site-issue-certs`: issues the public Let's Encrypt cert and enables HTTPS.
- `deploy/ubuntu/install-system-config.sh`: refreshes Nginx and sudo permissions.
- `scripts/prod`: older local helper for status, setup, deploy, reload, and SSH.

## Checks

Open the production site from another LAN machine:

```text
http://192.168.20.21:5101
```

Useful server checks:

```bash
sudo nginx -t
sudo systemctl status nginx --no-pager
sudo tail -f /var/log/nginx/error.log
```

