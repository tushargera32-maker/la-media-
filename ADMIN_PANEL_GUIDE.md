# Admin Panel Guide - LA Media Website

## 🔐 Admin Login Credentials

**URL:** `http://localhost:3000/admin/login` (Local)  
**URL:** `https://yourdomain.com/admin/login` (Production)

**Default Credentials:**
- **Email:** `admin@lamedia.com`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Change the password immediately after first login in production!

---

## 🚀 First Time Setup

### 1. **Run Database Migrations**
```bash
npx prisma migrate dev
```

### 2. **Create Admin User**
```bash
npx prisma db seed
```

This creates the default admin user with credentials above.

### 3. **Access Admin Panel**
Navigate to `/admin/login` and use the credentials.

---

## 📊 Admin Panel Overview

Once logged in, you'll see the admin dashboard at `/admin` with:

### **Quick Stats:**
- Unread enquiries
- Pending collaborations  
- New registrations
- Recent newsletter signups

### **Navigation Menu:**
- Blog Posts
- Events
- Gallery
- Partners
- Registrations
- Contacts/Enquiries
- Collaborations
- Newsletter

---

## 📝 Managing Blog Posts

### **Create New Blog Post:**

1. Go to `/admin/blog`
2. Click **"New Post"** button
3. Fill in the form:
   - **Title:** SEO-optimized title
   - **Slug:** URL-friendly (auto-generated from title)
   - **Category:** Choose from dropdown
   - **Excerpt:** Short summary (150-200 chars)
   - **Content:** Full article (supports markdown)
   - **Featured Image:** Upload image
   - **Featured:** Toggle for homepage display
   - **Published:** Toggle to make live

4. Click **"Save"** or **"Publish"**

### **Edit Existing Post:**

1. Go to `/admin/blog`
2. Click on post title
3. Make changes
4. Click **"Update"**

### **Delete Post:**

1. Go to `/admin/blog`
2. Click delete icon (trash)
3. Confirm deletion

---

## 🖼️ Managing Gallery

### **Upload New Images:**

1. Go to `/admin/gallery`
2. Click **"Upload Images"**
3. Select multiple images (Ctrl+Click or drag-drop)
4. Add details:
   - **Title:** Image description
   - **Event:** Associated event name
   - **Category:** Event photos, behind-the-scenes, etc.
5. Click **"Upload"**

### **Organize Gallery:**

1. Drag and drop to reorder
2. Edit captions inline
3. Delete unwanted images

### **Image Requirements:**
- **Format:** JPG, PNG, WebP
- **Max size:** 5MB per image
- **Recommended:** 1920x1080px (16:9 ratio)
- **Compress before upload:** Use TinyPNG.com

---

## 🎪 Managing Events

### **Create New Event:**

1. Go to `/admin/events`
2. Click **"New Event"**
3. Fill details:
   - **Event Name:** Design Dialects 3.0
   - **Date:** Start and end date
   - **Venue:** Location details
   - **Description:** Full event details
   - **Registration Link:** Link to registration page
   - **Featured Image:** Event poster
   - **Status:** Upcoming, Ongoing, Completed

4. Click **"Publish"**

### **Update Event:**

1. Go to `/admin/events`
2. Click event name
3. Update details (date, venue, status)
4. Save changes

---

## 🤝 Managing Partners/Sponsors

### **Add New Partner:**

1. Go to `/admin/partners`
2. Click **"Add Partner"**
3. Upload:
   - **Logo:** Transparent PNG preferred
   - **Company Name:** Full name
   - **Website:** URL (optional)
   - **Category:** Sponsor, Material Partner, etc.
   - **Published:** Toggle visibility

4. Click **"Save"**

### **Reorder Partners:**

1. Drag and drop to reorder
2. Changes save automatically

### **Logo Requirements:**
- **Format:** PNG with transparent background
- **Size:** 200x100px recommended
- **Max file size:** 500KB
- **Color:** Dark logo on light background

---

## 📋 Managing Registrations

### **View Architect Registrations:**

1. Go to `/admin/registrations`
2. Click **"Architects"** tab
3. See all registrations with:
   - Name, Email, Phone
   - Firm Name, Designation
   - COA Number
   - Registration Date

### **View Sponsor Registrations:**

1. Go to `/admin/registrations`
2. Click **"Sponsors"** tab
3. See all bookings with:
   - Company Name, Contact Person
   - GST Number, Address
   - Stall Size, Requirements
   - Registration Date

### **Actions:**

- **Mark as Handled:** Toggle checkbox when contacted
- **Export:** Download CSV of all registrations
- **Filter:** By date, handled status
- **Search:** Find specific registration

### **Export Registrations:**

1. Click **"Export"** button at top
2. Choose format: CSV or Excel
3. Downloads all data for offline use

---

## 💬 Managing Enquiries (Build Right & Contact)

### **View All Enquiries:**

1. Go to `/admin/contacts`
2. See all submissions:
   - Name, Email, Phone
   - Company (Build Right shows "Build Right - Location")
   - Message/Query
   - Status (New, Read, Replied, Archived)
   - Date

### **Update Status:**

1. Click on enquiry
2. Change status dropdown:
   - **New:** Just received (red badge)
   - **Read:** Acknowledged (yellow)
   - **Replied:** Response sent (green)
   - **Archived:** Resolved/closed (gray)

3. Status updates automatically

### **Reply to Enquiry:**

1. Click on enquiry
2. Copy email address
3. Reply via your email client
4. Mark as "Replied" in admin panel

### **Delete Enquiry:**

1. Click delete icon (trash)
2. Confirm deletion
3. **Note:** This is permanent, no undo

---

## 📧 Managing Newsletter Subscribers

### **View Subscribers:**

1. Go to `/admin/newsletter`
2. See all subscribers with:
   - Email
   - Subscription date
   - Status (Active/Unsubscribed)

### **Export Email List:**

1. Click **"Export"** button
2. Downloads CSV with all active emails
3. Use for email marketing campaigns

### **Remove Subscriber:**

1. Click delete icon
2. Confirm removal
3. They won't receive future emails

---

## 🤝 Managing Collaboration Requests

### **View Partnership Requests:**

1. Go to `/admin/collaborations`
2. See all requests with:
   - Name, Company
   - Email, Phone
   - Collaboration Type
   - Message
   - Status

### **Update Status:**

1. Click on request
2. Change status:
   - **Pending:** New request (default)
   - **Reviewing:** Under consideration
   - **Accepted:** Partnership approved
   - **Declined:** Not proceeding

3. Status updates and saves

---

## 🔒 Security & User Management

### **Change Admin Password:**

Currently requires database update. Production deployment should include password change feature.

**Manual Method (Development):**

```bash
# Run Node.js script
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-new-password', 10));"

# Copy the hash output
# Update in database:
npx prisma studio
# Navigate to User table → Edit admin user → Paste new hash in password field
```

### **Add New Admin User:**

1. Go to database (Prisma Studio):
```bash
npx prisma studio
```

2. Navigate to **User** table
3. Click **"Add record"**
4. Fill:
   - **email:** newadmin@lamedia.com
   - **password:** (use bcrypt hash - see above)
   - **name:** New Admin Name
   - **role:** admin

5. Save

### **Security Best Practices:**

- ✅ Change default password immediately
- ✅ Use strong passwords (12+ characters)
- ✅ Don't share admin credentials
- ✅ Log out after each session
- ✅ Use HTTPS in production
- ✅ Enable 2FA (if available in future)

---

## 📱 Media Upload Guidelines

### **Image Optimization:**

Before uploading ANY image:

1. **Resize:** Match required dimensions
2. **Compress:** Use [TinyPNG.com](https://tinypng.com) or [Squoosh.app](https://squoosh.app)
3. **Format:** 
   - Photos: JPG (80-85% quality)
   - Graphics/Logos: PNG
   - Modern browsers: WebP

### **Naming Convention:**

Good:
- `design-dialects-2-poster.jpg`
- `speaker-john-doe-headshot.jpg`
- `event-venue-ludhiana.jpg`

Bad:
- `IMG_1234.jpg`
- `screenshot.png`
- `untitled.jpg`

### **File Size Limits:**

- **Blog images:** < 200KB
- **Event posters:** < 500KB
- **Gallery photos:** < 300KB each
- **Partner logos:** < 100KB

### **Alt Text (Accessibility):**

Always add descriptive alt text:
- Good: "Architects networking at Design Dialects 2.0 in Ludhiana"
- Bad: "Image 1" or "Photo"

---

## 🔍 SEO Best Practices for Blog Posts

### **Title Optimization:**

- Include primary keyword
- Add location (Ludhiana, Punjab)
- Keep under 60 characters
- Example: "Architecture Events in Ludhiana 2027 | LA Media"

### **Meta Description:**

- Write compelling 150-160 character summary
- Include keyword and location
- Add call-to-action
- Example: "Discover why architecture events in Ludhiana matter. Join Design Dialects 2.0 for networking, insights, and innovation. Register now!"

### **Content Guidelines:**

- **Length:** 1000-2000 words (long-form ranks better)
- **Keywords:** Use naturally, don't stuff
- **Headings:** Use H2, H3 for structure
- **Links:** Internal (to other pages) and external (to authority sites)
- **Images:** Include 2-3 relevant images with alt text
- **CTA:** End with clear call-to-action

### **URL Structure:**

- Keep URLs clean and readable
- Include keyword: `/insights/architecture-events-ludhiana`
- Avoid: `/insights/post-12345` or `/insights/a`

---

## 📊 Analytics & Reporting

### **Track Key Metrics:**

1. **Registration Count:**
   - Architects: Check daily
   - Sponsors: Monitor stall bookings
   - Goal: Track against event capacity

2. **Enquiry Response Time:**
   - Aim: Respond within 24 hours
   - Track "New" enquiries daily
   - Move to "Replied" promptly

3. **Newsletter Growth:**
   - Weekly subscriber count
   - Unsubscribe rate (should be <2%)

4. **Popular Blog Posts:**
   - Check page views (requires Google Analytics)
   - Update popular posts regularly
   - Create follow-up content

---

## 🐛 Troubleshooting

### **Can't Login:**

1. Check email spelling
2. Reset password (requires database access currently)
3. Clear browser cache and cookies
4. Try different browser
5. Check console for errors (F12)

### **Image Won't Upload:**

1. Check file size (<5MB)
2. Check file format (JPG, PNG, WebP only)
3. Try different image
4. Check browser console for errors
5. Compress image and retry

### **Changes Not Showing on Website:**

1. **Hard refresh:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear cache:** Browser settings → Clear browsing data
3. **Incognito mode:** Test in private window
4. **Server cache:** May take 5-10 minutes to update

### **Admin Panel Slow:**

1. Close unused browser tabs
2. Clear browser cache
3. Check internet connection
4. Optimize uploaded images
5. Check database size (if very large)

---

## 📞 Support & Help

### **Technical Issues:**

Contact your developer with:
- Screenshot of error
- Steps to reproduce
- Browser and OS version
- Time when issue occurred

### **Content Questions:**

- Check this guide first
- Test changes on staging environment
- Keep backups of important content
- Document custom workflows

### **Emergency Contacts:**

- **Hosting Issues:** Vercel Support
- **Database Issues:** Check error logs
- **Security Concerns:** Change passwords immediately

---

## ✅ Daily Admin Checklist

**Every Morning:**
- [ ] Check new registrations (Architects & Sponsors)
- [ ] Review new enquiries (Build Right & Contact)
- [ ] Respond to pending enquiries
- [ ] Check newsletter signups
- [ ] Review collaboration requests

**Weekly:**
- [ ] Export registration data (backup)
- [ ] Review and approve blog posts
- [ ] Update event details if needed
- [ ] Check gallery for new uploads
- [ ] Monitor website performance

**Monthly:**
- [ ] Audit all content for accuracy
- [ ] Update event dates/information
- [ ] Review partner logos and links
- [ ] Check for broken links
- [ ] Backup database

---

## 🎯 Quick Reference

| Task | Go To | Action |
|------|-------|--------|
| View registrations | `/admin/registrations` | Click tab (Architects/Sponsors) |
| Reply to Build Right inquiry | `/admin/contacts` | Filter by company name |
| Upload event poster | `/admin/gallery` | Upload → Select file |
| Create blog post | `/admin/blog` | New Post button |
| Export emails | `/admin/newsletter` | Export button |
| Add partner logo | `/admin/partners` | Add Partner button |
| Update event details | `/admin/events` | Click event name |
| Change enquiry status | `/admin/contacts` | Status dropdown |

---

## 🔐 Production Deployment Notes

**Before Going Live:**

1. ✅ Change admin password from `admin123`
2. ✅ Update `NEXTAUTH_SECRET` in production env
3. ✅ Set `NEXTAUTH_URL` to production domain
4. ✅ Test all forms (registration, contact, newsletter)
5. ✅ Verify email notifications work
6. ✅ Check admin panel on mobile devices
7. ✅ Backup database before launch
8. ✅ Set up automated backups

**Environment Variables Needed:**

```bash
DATABASE_URL="your-production-database-url"
DATABASE_AUTH_TOKEN="your-turso-auth-token"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-new-secret-key"
```

Generate new secret:
```bash
openssl rand -base64 32
```

---

**Need help? Keep this guide handy and refer to specific sections as needed!**
