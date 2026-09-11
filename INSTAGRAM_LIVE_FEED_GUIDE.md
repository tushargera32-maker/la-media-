# 📸 INSTAGRAM LIVE FEED SETUP GUIDE

## 🎯 Goal: Show Live Instagram Feed for @designdialect.india

---

## ✅ **EASIEST METHOD: SnapWidget (RECOMMENDED)**

### **Step 1: Create Widget (2 minutes)**

1. **Go to:** https://snapwidget.com
2. **Choose:** Instagram Grid
3. **Enter:** `@designdialect.india`
4. **Customize:**
   - Layout: Grid
   - Number of posts: 8
   - Spacing: Small
   - Show captions: Optional
   - Colors: Match your site (dark theme)

5. **Get Code:** Copy the embed code

---

### **Step 2: Replace Placeholder Code**

**File:** `app/(site)/register/page.tsx`

**Find this line (~line 302):**
```jsx
<iframe 
  src="https://snapwidget.com/embed/1086757"
```

**Replace with YOUR widget URL from SnapWidget**

---

### **Step 3: Deploy**

```bash
git add .
git commit -m "Add live Instagram feed"
git push
```

**✅ Done! Live Instagram feed working!**

---

## 💰 **COST:**

- **Free:** 9 posts, basic features
- **Pro:** $6/month (₹500) - more posts, better design
- **Premium:** $12/month (₹1,000) - all features

**Recommendation:** Start with FREE plan, upgrade later if needed

---

## 🔄 **ALTERNATIVE: Instagram Basic Display API (Advanced)**

### **If You Want 100% Free & No Third-Party:**

1. **Create Facebook Developer Account**
2. **Create App**
3. **Setup Instagram Basic Display**
4. **Get Access Token**
5. **Create API endpoint in Next.js**
6. **Fetch & display posts**

**Time:** 2-3 hours setup
**Maintenance:** Token refresh every 60 days
**Best for:** Developers who want full control

---

## 📋 **COMPARISON:**

| Method | Cost | Setup Time | Updates | Best For |
|--------|------|------------|---------|----------|
| **SnapWidget** | Free-$6/mo | 5 mins | Real-time | You! ✅ |
| **EmbedSocial** | ₹499/mo | 5 mins | Real-time | Enterprise |
| **Instagram API** | Free | 3 hours | Real-time | Developers |
| **Manual Images** | Free | - | Manual | Not recommended |

---

## 🚀 **CURRENT STATUS:**

✅ Code added with SnapWidget placeholder
⏳ Need to create actual widget and replace URL
⏳ Or use Instagram API (advanced)

---

## 🎓 **QUICK START:**

**Want live feed in 5 minutes?**

1. Go to: https://snapwidget.com
2. Create widget for @designdialect.india
3. Copy embed URL
4. Replace in `register/page.tsx` line 302
5. Push to Git
6. ✅ Live!

**Or want me to setup Instagram API?** (will take longer but free forever)

---

## 📸 **BUILD RIGHT FEED (@buildrightadvisors)**

The Build Right page already has an Instagram section with a profile card +
Follow button. To switch on the **live posts grid** inside it:

1. Go to https://snapwidget.com → Instagram Grid → enter `@buildrightadvisors`
2. Copy the embed URL (looks like `https://snapwidget.com/embed/XXXXXXX`)
3. Paste it into `INSTAGRAM_WIDGET_URL` at the top of
   `app/(site)/build-right/page.tsx`
4. Deploy — live posts appear automatically, no code change needed.

---

**Batao kya karna hai - SnapWidget quick setup ya full Instagram API?** 🚀
