# Post-Deployment Guide - LA Media Website

## How to Make Changes After Site is Live

### 1. **Content Changes (Easy - No Developer Needed)**

**Admin Panel Access:**
- URL: `https://yourdomain.com/admin/login`
- Login with your admin credentials

**What You Can Change via Admin:**
- ✅ Blog posts (create, edit, delete)
- ✅ Events (add new, update existing)
- ✅ Gallery images
- ✅ Partners/sponsors logos
- ✅ View registrations (architects & sponsors)
- ✅ View Build Right inquiries
- ✅ Newsletter subscribers

---

### 2. **Text/Content Changes (Medium - Developer Needed)**

**Files to Edit:**
- `lib/content.ts` - All static content (event dates, venue, descriptions, contact info)
- `app/(site)/page.tsx` - Homepage text
- Other page files for specific pages

**How to Deploy Changes:**
```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Build to verify
npm run build

# 4. Commit changes
git add .
git commit -m "Update event dates"
git push

# 5. Redeploy on Vercel (automatic if connected to Git)
```

---

### 3. **Image/Poster Changes (Easy)**

**Upload New Images:**
1. Add new image to `/public` folder
2. Update filename in code where referenced
3. Or use same filename to auto-replace

**Example - Changing DD 2.0 Poster:**
- Replace `/public/DD 2.0_Page (1).png` with new poster (same filename)
- Or upload `DD 3.0.png` and update `app/design-dialects/page.tsx`

---

### 4. **Emergency Fixes (Critical Issues)**

**If Something Breaks:**

1. **Rollback on Vercel:**
   - Go to Vercel dashboard
   - Click "Deployments"
   - Find last working version
   - Click "Promote to Production"

2. **Quick Fix:**
   ```bash
   # Fix the issue locally
   # Test thoroughly
   npm run build
   
   # Push fix
   git add .
   git commit -m "Fix: [describe issue]"
   git push
   ```

---

### 5. **Adding New Features (Complex - Developer Needed)**

**Examples:**
- New registration form fields
- New pages
- New functionality
- Design changes

**Process:**
1. Discuss requirements
2. Developer implements locally
3. Test on staging environment
4. Deploy to production after approval

---

### 6. **Database Changes (Critical - Requires Care)**

**Prisma Schema Updates:**
```bash
# 1. Update schema.prisma
# 2. Create migration
npx prisma migrate dev --name add_new_field

# 3. Test locally
# 4. Deploy
git push

# 5. Run migration on production
npx prisma migrate deploy
```

---

### 7. **Environment Variables (Sensitive)**

**If You Need to Update:**
- Database URL
- API keys
- Authentication secrets

**Where to Update:**
1. **Local:** `.env` file
2. **Production:** Vercel dashboard → Settings → Environment Variables

---

### 8. **Regular Maintenance Tasks**

**Weekly:**
- Check `/admin/registrations` for new sign-ups
- Check `/admin/contacts` for Build Right inquiries
- Respond to inquiries

**Monthly:**
- Review site performance on Vercel dashboard
- Check error logs if any issues reported
- Update event dates/content as needed

**Before Major Events:**
- Update event dates in `lib/content.ts`
- Upload new poster images
- Test registration forms
- Update "Upcoming Event" badge timing

---

### 9. **Common Changes You'll Need**

#### **Change Event Dates:**
```typescript
// File: lib/content.ts
export const EVENT = {
  date: "February 13-14, 2027",  // ← Change this
  venue: "New Venue Name",        // ← Change this
  // ...
}
```

#### **Change Contact Numbers:**
```typescript
// File: lib/content.ts
phone: "+91 98151 00385 / 98880 78580 / 99888 00389",  // ← Update
```

#### **Add New Past Event:**
```typescript
// File: app/design-dialects/page.tsx
const PAST_EVENTS = [
  {
    id: "dd-2",
    title: "Design Dialects 2.0",
    date: "Feb 2027",
    location: "Ludhiana, Punjab",
    attendees: "300+",
    image: "/past-event-2.jpg",  // ← Add image to /public
    // ...
  },
]
```

---

### 10. **Getting Help**

**Developer Contact:**
- For code changes, bugs, or new features
- Keep this document + codebase access

**Documentation:**
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Vercel: https://vercel.com/docs

---

### 11. **Backup Strategy**

**What's Automatically Backed Up:**
- ✅ Code (on GitHub)
- ✅ Deployments (Vercel keeps history)

**What You Need to Backup:**
- ⚠️ Database (export from Turso/Prisma)
- ⚠️ Uploaded images (if using external storage)

**How to Backup Database:**
```bash
# Export all data
npx prisma db pull
npx prisma generate
# Use Turso CLI for full backup
```

---

### 12. **Monitoring & Alerts**

**Setup Vercel Alerts:**
- Error tracking
- Performance monitoring
- Deployment notifications

**Check Regularly:**
- Form submissions working
- Database connections healthy
- SSL certificate valid

---

## Quick Reference - Common Tasks

| Task | Difficulty | Where to Do It |
|------|-----------|----------------|
| View registrations | Easy | `/admin/registrations` |
| View Build Right inquiries | Easy | `/admin/contacts` |
| Change event dates | Medium | `lib/content.ts` + redeploy |
| Upload new poster | Easy | Replace file in `/public` |
| Add blog post | Easy | `/admin/blog` |
| Fix broken page | Hard | Developer needed |
| Add new form field | Hard | Developer + database migration |

---

## Emergency Contacts

**Hosting Issues:** Vercel Support
**Database Issues:** Turso Support
**Code Issues:** Your developer

**Always test changes locally before deploying to production!**
