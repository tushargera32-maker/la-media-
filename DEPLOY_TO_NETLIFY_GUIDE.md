# 🚀 DEPLOY TO NETLIFY - STEP BY STEP GUIDE

## 📋 **PREREQUISITES:**

1. ✅ GitHub account
2. ✅ Netlify account (free tier works)
3. ✅ Project ready (YES - ours is!)

---

## 🔧 **METHOD 1: GITHUB + NETLIFY (RECOMMENDED)**

### **Step 1: Push to GitHub**

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - LA Media website complete"

# Create repo on GitHub then:
git remote add origin https://github.com/YOUR_USERNAME/la-media-website.git
git branch -M main
git push -u origin main
```

### **Step 2: Connect to Netlify**

1. Go to: https://app.netlify.com
2. Click: **"Add new site"** → **"Import an existing project"**
3. Choose: **"Deploy with GitHub"**
4. Authorize Netlify to access GitHub
5. Select your repository: `la-media-website`

### **Step 3: Configure Build Settings**

```
Build command: npm run build
Publish directory: .next
```

### **Step 4: Environment Variables**

Add these in Netlify dashboard (Site settings → Environment variables):

```
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=your-secret-here-generate-new-one
NEXTAUTH_URL=https://your-site.netlify.app
NODE_ENV=production
```

Generate secret:
```bash
openssl rand -base64 32
```

### **Step 5: Deploy**

Click **"Deploy site"**

Netlify will:
- Clone your repo
- Install dependencies
- Build the project
- Deploy to CDN

---

## ⚡ **METHOD 2: NETLIFY CLI (FASTER FOR TESTING)**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy (first time)
netlify init

# Future deploys
netlify deploy --prod
```

---

## 🎯 **BUILD CONFIGURATION:**

Create `netlify.toml` in root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## ⚠️ **IMPORTANT: DATABASE ISSUE**

**Problem:** SQLite won't work on Netlify (serverless environment)

**Solutions:**

### **Option 1: Use Turso (Recommended - Free)**
```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Create database
turso db create la-media

# Get connection URL
turso db show la-media --url

# Update .env
DATABASE_URL="libsql://your-db.turso.io"
```

### **Option 2: Use Neon (PostgreSQL - Free)**
1. Go to: https://neon.tech
2. Create project
3. Copy connection string
4. Update schema for PostgreSQL

### **Option 3: Use PlanetScale (MySQL - Free)**
1. Go to: https://planetscale.com
2. Create database
3. Copy connection string

---

## 🔐 **SECURITY CHECKLIST:**

Before deploying:

```bash
# 1. Create .gitignore (if not exists)
echo "node_modules
.env
.env.local
.next
prisma/dev.db
prisma/dev.db-journal" > .gitignore

# 2. Remove .env from git if committed
git rm --cached .env
git commit -m "Remove .env from git"
```

---

## 📝 **DEPLOYMENT STEPS (FULL):**

### **1. Prepare Project**

```bash
# Test build locally
npm run build

# Check if it works
npm start

# Fix any errors
```

### **2. Push to GitHub**

```bash
git init
git add .
git commit -m "LA Media website - production ready"

# Create repo on GitHub, then:
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### **3. Netlify Setup**

1. Login to Netlify
2. New site from Git
3. Choose GitHub
4. Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Deploy!

### **4. Custom Domain (Optional)**

In Netlify dashboard:
- Domain settings → Add custom domain
- Point your DNS to Netlify
- SSL automatically enabled

---

## 🎨 **WHAT CLIENT WILL SEE:**

**Preview URL:** `https://la-media-xyz123.netlify.app`

Later can change to:
- `https://lamedia.netlify.app`
- `https://www.lamediacommunications.com` (custom domain)

---

## ✅ **POST-DEPLOYMENT:**

1. **Test everything:**
   - All pages load
   - Images show
   - Forms work
   - Admin login works

2. **Admin access:**
   ```
   URL: https://your-site.netlify.app/admin/login
   Email: (your ADMIN_EMAIL from env)
   Password: (your ADMIN_PASSWORD from env - never commit it)
   ```

3. **Update later:**
   - Push to GitHub
   - Netlify auto-deploys

---

## 💰 **COST:**

**Netlify Free Tier:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited sites
- ✅ SSL included
- ✅ Auto-deploys from Git
- ✅ Perfect for client preview

**Upgrade needed if:**
- Site gets 100k+ views/month
- Need team collaboration

---

## 🚨 **QUICK DEPLOY (5 MINUTES):**

```bash
# 1. Build test
npm run build

# 2. Install Netlify CLI
npm i -g netlify-cli

# 3. Login
netlify login

# 4. Deploy
netlify deploy --prod

# 5. Done! Get URL
```

---

## 📞 **HELP:**

If issues:
1. Check build logs in Netlify
2. Verify environment variables
3. Test build locally first
4. Check `.gitignore` file

---

**READY TO DEPLOY? Batao main help kar dunga!** 🚀

**GitHub repo banana hai ya direct Netlify CLI se deploy karu?**
