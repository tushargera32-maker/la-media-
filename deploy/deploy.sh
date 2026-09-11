#!/usr/bin/env bash
# Deploy/refresh the app on the VPS. Run as root (or a sudo user) from anywhere:
#   bash /var/www/la-media/deploy/deploy.sh
# First run: git clone https://github.com/tushargera32-maker/la-media-.git /var/www/la-media
#            then create /var/www/la-media/.env (copy from Vercel env vars)
set -euo pipefail

APP_DIR="/var/www/la-media"
cd "$APP_DIR"

echo "=== 1/5 pull ==="
git pull --ff-only

echo "=== 2/5 install (npm ci for reproducible builds) ==="
npm ci --no-audit --no-fund

echo "=== 3/5 prisma client ==="
npx prisma generate

echo "=== 4/5 build ==="
npm run build

echo "=== 5/5 restart ==="
pm2 startOrRestart ecosystem.config.js --env production
pm2 save
pm2 startup systemd -u root --hp /root >/dev/null 2>&1 || true

echo "=== health ==="
sleep 3
curl -sf http://127.0.0.1:3000/api/health/db && echo && echo "DEPLOY OK"
