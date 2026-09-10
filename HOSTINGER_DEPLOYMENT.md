# Hostinger Next.js Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. **Database Setup**
- [ ] Create PostgreSQL database on Hostinger
- [ ] Note down database credentials:
  - Host
  - Database name
  - Username
  - Password
  - Port (usually 5432)

### 2. **Environment Variables**
Create `.env.production` file with:

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# NextAuth (if using authentication)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-secure-random-string-here"

# Optional: Analytics, etc.
```

### 3. **Build & Deploy Steps**

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Hostinger deployment"
git push origin main
```

#### Step 2: Connect to Hostinger
1. Login to Hostinger hPanel
2. Go to "Website" section
3. Select "Node.js App"
4. Choose Next.js application
5. Connect your GitHub repository

#### Step 3: Configure Build Settings
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18.x or 20.x
- **Environment Variables:** Add all from `.env.production`

#### Step 4: Deploy Database
```bash
# On your local machine, generate migration
npx prisma migrate deploy

# Or connect to Hostinger and run:
npx prisma db push
npx prisma generate
```

### 4. **Post-Deployment Tasks**

#### Seed Initial Data (if needed)
```bash
# Connect via SSH to Hostinger or run locally targeting production DB
npx prisma db seed
```

#### Verify Everything Works
- [ ] Homepage loads
- [ ] Blog posts display
- [ ] Gallery works
- [ ] Admin panel accessible
- [ ] Forms submit correctly
- [ ] Images load properly

### 5. **Domain Setup**
1. Point your domain to Hostinger nameservers
2. In hPanel, add your custom domain
3. Enable SSL certificate (free with Hostinger)
4. Update `NEXTAUTH_URL` in environment variables

### 6. **Important Files Check**

Make sure these files are configured:

**package.json** - Scripts section:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -H 0.0.0.0 -p $PORT",
    "lint": "next lint"
  }
}
```

**next.config.ts** - Check output mode:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone', // For Hostinger
  images: {
    domains: ['yourdomain.com'],
    unoptimized: false
  }
};
```

### 7. **Database Migration Commands**

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx tsx prisma/seed.ts
```

### 8. **Common Issues & Fixes**

**Issue:** Build fails
**Fix:** Check Node.js version matches locally (18.x or 20.x)

**Issue:** Database connection fails
**Fix:** Verify DATABASE_URL is correct, check if Hostinger allows external connections

**Issue:** Images don't load
**Fix:** Make sure `/public` folder is included in build, check image paths

**Issue:** 500 errors
**Fix:** Check server logs in Hostinger hPanel, verify all environment variables

### 9. **Performance Optimization**

Add to `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};
```

### 10. **Backup Before Deploy**

```bash
# Backup database locally
npx prisma db pull
npx prisma db execute --file backup.sql

# Export data
npx tsx prisma/export-data.ts
```

## 🚀 Quick Deploy Commands

```bash
# 1. Build locally to test
npm run build

# 2. Test production build
npm start

# 3. Push to GitHub
git add .
git commit -m "Production ready"
git push origin main

# 4. Deploy on Hostinger
# - Connect GitHub repo
# - Set environment variables
# - Click Deploy
```

## 📞 Support

- Hostinger Support: Available 24/7 via live chat
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs

## ✅ Deployment Checklist

- [ ] Database created and credentials saved
- [ ] Environment variables configured
- [ ] Code pushed to GitHub
- [ ] Hostinger connected to GitHub
- [ ] Build settings configured
- [ ] Database migrated
- [ ] Site loads correctly
- [ ] Admin panel works
- [ ] SSL enabled
- [ ] Domain configured
