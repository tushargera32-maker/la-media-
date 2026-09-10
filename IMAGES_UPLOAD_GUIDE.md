# 📸 IMAGE UPLOAD GUIDE FOR LA MEDIA WEBSITE

## ✅ Changes Made:
1. **Homepage Experience:** Changed from "10+ Years" to "25+ Years" ✅
2. **Build Right Page:** Updated experience badge to "25+ Years" ✅
3. **Content File:** Updated in `lib/content.ts` ✅

---

## 📂 CURRENT FOLDER STRUCTURE

```
public/
├── team/
│   ├── ar-arjun-sharma.jpg          ← Need to upload
│   ├── ar-neeraj-sharma.jpg         ← Need to upload
│   ├── ar-sham-gupta.jpg            ← Need to upload
│   └── projects/
│       ├── arjun-1.jpg to arjun-8.jpg    ← Need 8 photos
│       ├── neeraj-1.jpg to neeraj-8.jpg  ← Need 8 photos
│       └── sham-1.jpg to sham-8.jpg      ← Need 8 photos
│
├── instagram-br-1.jpg to instagram-br-9.jpg  ← Need 9 photos (Build Right IG)
├── past-event-1.jpg                          ← Need 1 photo
└── hero-video.mp4 (optional)                 ← Optional video
```

---

## 🎯 IMAGES TO UPLOAD (Priority Order)

### **PRIORITY 1: Team Photos (Critical)** 🔴

**Upload these 3 architect photos:**

1. **Ar. Arjun Deep's Photo**
   - Path: `public/team/ar-arjun-sharma.jpg`
   - Size: Minimum 800x800px
   - Format: JPG
   - Used on: Build Right page (About Us section)

2. **Ar. Neeraj Sharma's Photo**
   - Path: `public/team/ar-neeraj-sharma.jpg`
   - Size: Minimum 800x800px
   - Format: JPG
   - Used on: Build Right page (About Us section)

3. **Ar. Sham Sunder Gupta's Photo**
   - Path: `public/team/ar-sham-gupta.jpg`
   - Size: Minimum 800x800px
   - Format: JPG
   - Used on: Build Right page (About Us section)

---

### **PRIORITY 2: Project Gallery Photos (Important)** 🟡

**Need 24 total project photos (8 per architect):**

#### **Ar. Arjun Deep Projects (8 photos):**
```
public/team/projects/arjun-1.jpg
public/team/projects/arjun-2.jpg
public/team/projects/arjun-3.jpg
public/team/projects/arjun-4.jpg
public/team/projects/arjun-5.jpg
public/team/projects/arjun-6.jpg
public/team/projects/arjun-7.jpg
public/team/projects/arjun-8.jpg
```

#### **Ar. Neeraj Sharma Projects (8 photos):**
```
public/team/projects/neeraj-1.jpg
public/team/projects/neeraj-2.jpg
public/team/projects/neeraj-3.jpg
public/team/projects/neeraj-4.jpg
public/team/projects/neeraj-5.jpg
public/team/projects/neeraj-6.jpg
public/team/projects/neeraj-7.jpg
public/team/projects/neeraj-8.jpg
```

#### **Ar. Sham Sunder Gupta Projects (8 photos):**
```
public/team/projects/sham-1.jpg
public/team/projects/sham-2.jpg
public/team/projects/sham-3.jpg
public/team/projects/sham-4.jpg
public/team/projects/sham-5.jpg
public/team/projects/sham-6.jpg
public/team/projects/sham-7.jpg
public/team/projects/sham-8.jpg
```

**Specs:**
- Size: Minimum 1200x1200px (square)
- Format: JPG
- Quality: High quality architectural photos
- Content: Their actual completed projects

---

### **PRIORITY 3: Build Right Instagram Gallery (Important)** 🟡

**Need 9 Instagram-style photos for Build Right section:**

```
public/instagram-br-1.jpg
public/instagram-br-2.jpg
public/instagram-br-3.jpg
public/instagram-br-4.jpg
public/instagram-br-5.jpg
public/instagram-br-6.jpg
public/instagram-br-7.jpg
public/instagram-br-8.jpg
public/instagram-br-9.jpg
```

**Specs:**
- Size: Minimum 1080x1080px (square)
- Format: JPG
- Content: Construction projects, vastu consultations, client meetings, completed homes

---

### **PRIORITY 4: Past Events (Optional)** 🟢

**Past event photo:**
```
public/past-event-1.jpg
```

**Specs:**
- Size: Minimum 1920x1080px (16:9)
- Format: JPG
- Content: Design Dialects 1.0 event photo

---

### **PRIORITY 5: Homepage Video (Optional)** 🟢

**Hero video (replaces static image):**
```
public/hero-video.mp4
```

**Specs:**
- Size: Max 10MB
- Format: MP4
- Duration: 5-15 seconds
- Resolution: 1920x1080 minimum
- Content: Professional B-roll of events/office

---

## 📋 COMPLETE CHECKLIST

### **Step 1: Create Missing Folders**
```bash
cd "C:\Users\welcome\Downloads\la-media-nextjs\la-media\public"
mkdir -p team/projects
```

### **Step 2: Upload Files**

**Team Photos (3 files):**
- [ ] ar-arjun-sharma.jpg
- [ ] ar-neeraj-sharma.jpg
- [ ] ar-sham-gupta.jpg

**Project Photos (24 files):**
- [ ] arjun-1.jpg to arjun-8.jpg (8 files)
- [ ] neeraj-1.jpg to neeraj-8.jpg (8 files)
- [ ] sham-1.jpg to sham-8.jpg (8 files)

**Instagram Gallery (9 files):**
- [ ] instagram-br-1.jpg to instagram-br-9.jpg

**Past Events (1 file):**
- [ ] past-event-1.jpg

**Optional:**
- [ ] hero-video.mp4

**TOTAL IMAGES NEEDED:** 37 images + 1 optional video

---

## 🚀 HOW TO UPLOAD

### **Method 1: Manual Upload (Easiest)**

1. Open folder:
   ```
   C:\Users\welcome\Downloads\la-media-nextjs\la-media\public
   ```

2. Create folders if needed:
   - `team/`
   - `team/projects/`

3. Copy your photos to correct locations with exact filenames

4. Verify filenames match exactly (case-sensitive!)

---

### **Method 2: Use Placeholder Images (For Testing)**

If you don't have all images ready, I can create placeholder script to generate dummy images for testing on Vercel.

---

## ⚠️ IMPORTANT NOTES

1. **Filenames must match EXACTLY:**
   - ✅ `ar-arjun-sharma.jpg`
   - ❌ `ar-arjun-sharma.JPG`
   - ❌ `Ar-Arjun-Sharma.jpg`
   - ❌ `ar arjun sharma.jpg`

2. **Image Quality:**
   - Use high-resolution photos
   - Compress for web (use tinypng.com)
   - Target: 200-500KB per image

3. **Square Photos:**
   - Project gallery needs square images (1:1 ratio)
   - Instagram gallery needs square images (1:1 ratio)

4. **Git & Vercel:**
   - After uploading, commit to Git:
     ```bash
     git add public/
     git commit -m "Add team and project photos"
     git push
     ```
   - Vercel will auto-deploy with new images

---

## 🎨 IMAGE OPTIMIZATION (Optional)

**Before uploading, optimize images:**

1. **Resize:**
   - Team photos: 800x800px
   - Project gallery: 1200x1200px
   - Instagram: 1080x1080px

2. **Compress:**
   - Use: https://tinypng.com
   - Target: 200-500KB per image

3. **Format:**
   - Save as JPG (not PNG for photos)
   - Quality: 80-90%

---

## 📊 CURRENT STATUS

✅ **Code Changes:** Done
✅ **Folder Structure:** Ready
⏳ **Images:** Need to upload
⏳ **Deploy to Vercel:** After images uploaded

---

## 🎯 NEXT STEPS

1. **Collect Photos:** Get all 37 images ready
2. **Upload to Public Folder:** Follow exact naming
3. **Test Locally:** `npm run dev` and check
4. **Push to GitHub:** Commit and push
5. **Vercel Auto-Deploy:** Vercel will deploy automatically
6. **Check Live Site:** Visit lamedia.co.in

---

**Batao, photos ready hain? Ya placeholder images se test karein pehle?** 📸
