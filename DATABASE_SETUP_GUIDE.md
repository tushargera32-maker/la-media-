# Database & Form Entries Setup Guide

## Current Setup

Your forms are currently configured to use **SQLite** (local development) with **Prisma ORM**.

For production, you need to choose a database provider.

---

## Option 1: **Turso (Recommended - FREE)** ✅

**What is Turso?**
- SQLite-based cloud database (edge-optimized)
- Built specifically for serverless apps
- Fast, global distribution

**Free Tier:**
- ✅ **500 databases** (more than enough)
- ✅ **9 GB total storage**
- ✅ **1 billion row reads/month**
- ✅ **25 million row writes/month**
- ✅ **Unlimited locations**
- ✅ Perfect for your use case

**Cost for More:**
- If you exceed free tier: ~$29/month (unlikely for events site)
- You'll only pay if you get MASSIVE traffic

**Setup Steps:**

```bash
# 1. Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# 2. Sign up (free)
turso auth signup

# 3. Create database
turso db create la-media-production

# 4. Get connection URL
turso db show la-media-production --url

# 5. Get auth token
turso db tokens create la-media-production

# 6. Update .env
DATABASE_URL="libsql://la-media-production-[your-org].turso.io"
DATABASE_AUTH_TOKEN="your-token-here"
```

**In Vercel (Production):**
- Add these as Environment Variables in Vercel dashboard
- Redeploy

**Why Turso?**
- ✅ Already configured in your project
- ✅ Free tier is generous
- ✅ No credit card needed for free tier
- ✅ SQLite compatibility (same as local dev)
- ✅ Fast edge performance

---

## Option 2: **PlanetScale (MySQL) - FREE** ✅

**Free Tier:**
- ✅ **1 database**
- ✅ **10 GB storage**
- ✅ **100 million reads/month**
- ✅ **10 million writes/month**
- ✅ **1 production branch** + 1 development branch

**Cost for More:**
- Hobby plan: $29/month
- More branches, analytics, backups

**Setup:**
```bash
# 1. Sign up at planetscale.com
# 2. Create database "la-media"
# 3. Get connection string
# 4. Update prisma/schema.prisma

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

# 5. Update DATABASE_URL in .env and Vercel
DATABASE_URL="mysql://[user]:[password]@[host]/[database]?sslaccept=strict"
```

---

## Option 3: **Supabase (PostgreSQL) - FREE** ✅

**Free Tier:**
- ✅ **500 MB database space**
- ✅ **Unlimited API requests**
- ✅ **50,000 monthly active users**
- ✅ **2 GB file storage**
- ✅ **Realtime subscriptions**

**Cost for More:**
- Pro: $25/month
- More storage, backups, support

**Setup:**
```bash
# 1. Sign up at supabase.com
# 2. Create new project
# 3. Get PostgreSQL connection string
# 4. Update schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# 5. Update .env
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
```

---

## Option 4: **Vercel Postgres - PAID** ⚠️

**No free tier** - Starts at $20/month

**Pricing:**
- Hobby: $20/month (60 compute hours)
- Pro: Custom pricing

**Only use if:**
- You need tight Vercel integration
- Budget allows

---

## Option 5: **Railway - FREE (Limited)** ⚠️

**Free Trial:**
- ✅ **$5 free credit**
- ✅ **500 hours execution time**
- ✅ Good for testing

**After Trial:**
- Pay-as-you-go (~$5-10/month for small apps)

---

## **Recommendation for Your Project:**

### **Use Turso** 🎯

**Why?**
1. **Already configured** in your `next.config.ts` and Prisma
2. **Most generous free tier** for your use case
3. **No credit card required** for free tier
4. **SQLite-based** - same as local dev, easy migration
5. **Built for serverless** - perfect for Vercel

**Expected Usage:**
- Design Dialects registration: ~500-1000 entries/event
- Build Right inquiries: ~100-200/month
- Total: Well within free tier limits

---

## Where Your Form Entries Go

### **Current Flow:**

```
User fills form → API route validates → Prisma saves to database → Admin views in dashboard
```

### **Tables:**

1. **ArchitectRegistration**
   - From: `/register/architect`
   - Fields: name, email, phone, firm, COA number
   - Admin: `/admin/registrations?type=architects`

2. **SponsorRegistration**
   - From: `/register/sponsor`
   - Fields: company, contact, GST, address, stall size
   - Admin: `/admin/registrations?type=sponsors`

3. **ContactSubmission**
   - From: Build Right form, Contact page
   - Fields: name, email, phone, message
   - Admin: `/admin/contacts`

4. **CollaborationRequest**
   - From: Partner page
   - Admin: `/admin/collaborations`

5. **NewsletterSubscriber**
   - From: Newsletter signup
   - Admin: `/admin/newsletter`

---

## Cost Breakdown (Realistic)

### **Turso (Recommended):**
```
Month 1-12: FREE (within limits)
After 1 year: Still FREE (unless you hit 25M writes/month)
```

### **If You Somehow Exceed Free Tier:**
```
Turso Pro: $29/month
PlanetScale Hobby: $29/month
Supabase Pro: $25/month
```

**Reality Check:**
- 1000 registrations/month = 1000 writes
- Free tier = 25 MILLION writes
- You'd need 25,000 registrations/month to exceed
- **You won't hit limits**

---

## Setup Checklist for Production

- [ ] 1. Create Turso account (free)
- [ ] 2. Create database
- [ ] 3. Get connection URL + auth token
- [ ] 4. Add to Vercel environment variables:
  - `DATABASE_URL`
  - `DATABASE_AUTH_TOKEN`
- [ ] 5. Run migrations:
  ```bash
  npx prisma migrate deploy
  ```
- [ ] 6. Test forms on production
- [ ] 7. Check admin dashboard works

---

## Backup Strategy

### **Automatic (Turso):**
- Point-in-time recovery available
- Database snapshots

### **Manual Backup:**
```bash
# Export all data
npx prisma db pull
npx prisma studio  # Browse and export manually

# Or use Turso CLI
turso db shell la-media-production ".dump" > backup.sql
```

**Do this:** Monthly before major events

---

## Email Notifications (Optional)

**Current:** Form entries only go to database

**To Add Email Alerts:**

### **Option A: Resend (FREE)** ✅
- 3,000 emails/month free
- 100 emails/day free
- Easy setup

### **Option B: SendGrid**
- 100 emails/day free

### **Option C: Postmark**
- 100 emails/month free

**Implementation:**
```typescript
// app/api/registrations/architect/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// After saving to database:
await resend.emails.send({
  from: 'notifications@yourdomain.com',
  to: 'admin@lamediacommunications.com',
  subject: 'New Architect Registration',
  html: `<p>New registration from ${firstName} ${lastName}</p>`
});
```

---

## Summary - What You Need to Pay For

### **Minimum (FREE Setup):**
- ✅ Vercel hosting: FREE (Hobby plan)
- ✅ Turso database: FREE (generous limits)
- ✅ Domain: ~₹800/year (.com) or FREE (.vercel.app subdomain)
- ✅ Email alerts (optional): FREE (Resend 3000/month)

### **Total Cost:**
- **₹0/month** (if using free subdomain)
- **~₹65/month** (if buying custom domain)

### **Only Pay If:**
- You get 25 million form submissions/month (won't happen)
- You want premium features (backups, analytics)

---

## Next Steps

1. **Go with Turso** (already configured, most generous free tier)
2. **Sign up** at turso.tech
3. **Create database** following steps above
4. **Add credentials** to Vercel
5. **Deploy** and test

**Need help setting up? Let me know!**
