#!/usr/bin/env bash
# One-time VPS provisioning (Ubuntu 24.04, KVM 1).
# Run as root:  bash deploy/setup-vps.sh
set -euo pipefail

echo "=== 1/6 apt base ==="
apt-get update -y
apt-get install -y curl git ufw nginx certbot python3-certbot-nginx htop

echo "=== 2/6 swap (2GB — protects next build on 4GB RAM) ==="
if ! swapon --show | grep -q swapfile; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "=== 3/6 Node.js 22 + PM2 ==="
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2
node --version

echo "=== 4/6 firewall (SSH + HTTP/S only) ==="
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "=== 5/6 app dir + log dir ==="
mkdir -p /var/www/la-media /var/log/pm2
chown -R www-data:www-data /var/www /var/log/pm2 || true

echo "=== 6/6 nginx baseline ==="
rm -f /etc/nginx/sites-enabled/default
systemctl enable --now nginx ufw

echo "DONE. Next: clone repo to /var/www/la-media, add .env, run deploy/deploy.sh"
