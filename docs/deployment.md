# LAN Production Deployment

`jim_site` runs as a static Vite build served by Nginx on the Ubuntu HP4 server.
Deployments use the same tar archive pattern as the other Shoulak apps: build a
package locally, copy it to the server, then ask the server to unpack, build, and
reload Nginx.

## Production Shape

```text
Browser
  -> http://192.168.20.105:5101
  -> Nginx static frontend
  -> /opt/jim-site/app/dist
```

Key paths and identities:

- app directory: `/opt/jim-site/app`
- deploy archive: `/tmp/jim-site.tar.gz`
- deploy user that owns the app files: `ksp`
- passwordless deploy operator: `leo` by default
- Nginx site file: `/etc/nginx/sites-available/jim-site`
- production port: `5101`

## Short Commands

From Git Bash on the dev machine:

```bash
cd C:/Users/joeps/coding/jim_site
source deploy/aliases.sh
```

Then use the same verbs as the other apps:

```bash
deploy
up
down
restart
```

`down` disables only the Jim Nginx site and reloads Nginx. It does not stop the
shared HP4 Nginx process.

## First Server Setup

Run this once from Git Bash on your development machine. This packages the app,
copies it to HP4, runs bootstrap, applies the package, builds the frontend, and
reloads Nginx.

```bash
bootstrap
```

The setup step may ask for the server password because it installs system config.
After that, normal deploys should use `deploy`.

If the SSH user on HP4 is not `leo`, set `DEPLOY_OPERATOR` during bootstrap on
the server:

```bash
sudo DEPLOY_OPERATOR=your_user bash deploy/ubuntu/bootstrap.sh
```

## Normal Deploy

After the first setup, use:

```bash
deploy
```

That command:

- creates `deploy/dist/jim-site.tar.gz`
- copies the archive to `/tmp/jim-site.tar.gz` on HP4
- runs the locked-down deploy wrapper
- replaces `/opt/jim-site/app`
- installs dependencies
- builds the Vite app
- verifies and reloads Nginx

## Scripts

- `deploy/package-for-ubuntu.sh`: creates the tar archive.
- `deploy/source-deploy.sh`: packages and copies the archive to HP4.
- `deploy/manage.sh`: uniform `deploy`, `up`, `down`, `restart` wrapper.
- `deploy/apply-deploy.sh`: applies an archive on the target machine.
- `deploy/ubuntu/bootstrap.sh`: first-time HP4 setup.
- `deploy/ubuntu/jim-site-apply-deploy`: no-password server-side deploy wrapper.
- `deploy/ubuntu/jim-site-disable`: disables only the Jim Nginx site.
- `deploy/ubuntu/install-system-config.sh`: refreshes Nginx and sudo permissions.
- `scripts/prod`: older local helper for status, setup, deploy, reload, and SSH.

## Checks

Open the production site from another LAN machine:

```text
http://192.168.20.105:5101
```

Useful server checks:

```bash
sudo nginx -t
sudo systemctl status nginx --no-pager
sudo tail -f /var/log/nginx/error.log
```
