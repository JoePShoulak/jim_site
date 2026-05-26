# LAN Production Deployment

This app is designed to run on the same Ubuntu server as `ksp_python`, using the
same push-to-deploy shape, but without a backend service. Nginx serves the built
Vite app directly on port `5101`.

## Production Shape

```text
Browser
  -> http://192.168.20.105:5101
  -> Nginx static frontend
  -> /opt/jim-site/app/dist
```

## First Server Setup

Copy or clone this repository onto the Ubuntu server, then run:

```bash
cd /path/to/jim_site
sudo bash deploy/ubuntu/bootstrap.sh
```

The bootstrap creates:

- app directory: `/opt/jim-site/app`
- bare deployment repo: `/srv/git/jim-site.git`
- deploy user: `ksp`
- Nginx site on port `5101`

## SSH Deploy User

The push-to-deploy remote expects SSH access as the `ksp` user. If the key is
already installed for `ksp_python`, no additional user setup should be needed.
Otherwise, add your public key on the server:

```bash
sudo install -d -m 700 -o ksp -g ksp /home/ksp/.ssh
echo "YOUR_PUBLIC_KEY_HERE" | sudo tee -a /home/ksp/.ssh/authorized_keys
sudo chown ksp:ksp /home/ksp/.ssh/authorized_keys
sudo chmod 600 /home/ksp/.ssh/authorized_keys
```

## Push-To-Deploy

From your development machine:

```bash
git remote add prod ssh://ksp@192.168.20.105/srv/git/jim-site.git
git push prod main
```

The server-side hook checks out `main`, installs Node dependencies, builds the
app, refreshes the Nginx site config, and reloads Nginx.

## Daily Prod Commands

From Git Bash in the project root on your development machine:

```bash
bash scripts/prod status      # check the frontend URL
bash scripts/prod reload      # test and reload Nginx
bash scripts/prod repair-sudo # refresh prod sudo permissions
bash scripts/prod redeploy    # re-run deployment even if Git says up-to-date
bash scripts/prod deploy      # push current commit to production main
bash scripts/prod ssh         # open SSH session
```

Optional local alias:

```bash
bash scripts/install-prod-alias
source ~/.bashrc
```

That installs:

```bash
alias jprod='bash /c/Users/joeps/coding/jim_site/scripts/prod'
jprod status
jprod deploy
```

## Manual Deploy

If you already have the latest code on the server:

```bash
cd /opt/jim-site/app
bash deploy/ubuntu/deploy.sh
```

Frontend from another LAN machine:

```text
http://192.168.20.105:5101
```

Logs:

```bash
sudo tail -f /var/log/nginx/error.log
```
