# Image Requirements for LA Media Website

Drop all your images in this `images-needed` folder and I'll integrate them into the website.

---

## **MAIN WEBSITE PAGES**

### **1. HOME PAGE (app/(site)/page.tsx)**
- **Hero Image** - 16:9 ratio
  - Label: "HERO — ARCHITECTURAL INTERIOR, LIT — 16:9"
  - Usage: Main hero background image
  - Needs: High-quality architectural interior photo with good lighting
  - Priority: HIGH (appears first on load)

- **Insights Cards (3 images)** - 16:9 ratio each
  - For each category: News, Events, Industry
  - Usage: Blog/article preview cards
  - Needs: 3 images representing different content categories

### **2. ABOUT PAGE (app/(site)/about/page.tsx)**
- **Header Image** - 4:3 ratio
  - Label: "ABOUT — CURVED ARCHITECTURAL FORM — 4:3"
  - Usage: Page header background
  - Needs: Curved architectural form or building

- **Leadership Photos (3 portraits)** - 4:3 ratio each
  - Labels: "PORTRAIT — [PERSON NAME] — 4:3"
  - Usage: Team member cards
  - Needs: 3 professional headshots/portraits for leadership team

### **3. WORK PAGE (app/(site)/work/page.tsx)**
- **Header Image** - 4:3 ratio
  - Label: "WORK — EVENT STAGE, AUDIENCE — 4:3"
  - Usage: Page header background
  - Needs: Event photo showing stage and audience

- **Featured Event Image** - 16:9 ratio
  - Label: "[EVENT NAME] [CITY] — 16:9"
  - Usage: Main event showcase card
  - Needs: Photo from your event

- **Capability Cards (4 images)** - 16:9 ratio each
  - One for each strand: Events & Experiences, Media & Content, Community & Networks, Brand & Partnerships
  - Usage: Work category cards

### **4. WHAT WE DO PAGE (app/(site)/what-we-do/page.tsx)**
- **Header Image** - 4:3 ratio
  - Label: "WHAT WE DO — STAIRCASE, LIT EDGE — 4:3"
  - Usage: Page header background
  - Needs: Architectural staircase with dramatic lighting

- **Capability Cards (4 images)** - 16:9 ratio each
  - Same as Work page - for the 4 capability categories

### **5. INSIGHTS PAGE (app/(site)/insights/page.tsx)**
- **Header Image** - 4:3 ratio
  - Label: "INSIGHTS — ANGULAR FORM, BLUE LIGHT — 4:3"
  - Usage: Page header background
  - Needs: Angular architectural form with blue lighting

- **Article Thumbnails** - 16:9 ratio
  - Multiple images for blog posts
  - Categories: News, Events, Industry, Insights, Updates

### **6. CONTACT PAGE (app/(site)/contact/page.tsx)**
- **Side Image** - 3:4 ratio (portrait orientation)
  - Label: "CONTACT — LIT COLONNADE AT NIGHT — 3:4"
  - Usage: Side decoration on contact page
  - Needs: Architectural colonnade/columns lit at night

### **7. PARTNER PAGE (app/(site)/partner/page.tsx)**
- **Header Image** - 4:3 ratio
  - Label: "PARTNER — ARCHITECTURAL SPACE — 4:3"
  - Usage: Page header
  - Needs: Modern architectural space

### **8. REGISTER PAGE (app/register/page.tsx)**
- **Venue Photo** - 1:1 ratio (square)
  - Label: "VENUE — 1:1"
  - Usage: Small venue preview card
  - Needs: Square crop of event venue

---

## **OUR FIRMS SECTION (components/site/OurFirms.tsx)**
- **LA Media & Communications Logo/Image** - 16:9 ratio
  - Label: "LA MEDIA & COMMUNICATIONS — 16:9"
  - Usage: Parent firm card

- **Build Right Advisors Logo/Image** - 16:9 ratio
  - Label: "BUILD RIGHT ADVISORS — 16:9"
  - Usage: Group firm card

---

## **ADMIN PANEL**

### **Events (app/admin/events)**
- Event images are uploaded through the admin form
- Field: "Image URL"
- Optional: "Video URL"
- No specific requirements - you'll upload these individually per event

### **Partners (app/admin/partners)**
- Partner logos uploaded through the form
- Field: "Logo URL"
- Recommended: Transparent PNG logos on white/dark background

### **Gallery (app/admin/gallery)**
- Gallery images uploaded individually
- Upload interface supports: PNG, JPG, WebP, GIF (max 5MB)
- No preset aspect ratio - flexible

### **Blog Posts (app/admin/blog)**
- Featured images for blog posts
- Field: "Featured Image URL"
- Recommended: 16:9 ratio for consistency

---

## **SUMMARY BY ASPECT RATIO**

### **16:9 (Landscape)**
- Home hero (1)
- Insights cards on home (3)
- Featured event on Work page (1)
- Capability cards (4 unique images)
- Blog post thumbnails (multiple)
- Firm cards (2)
**Total minimum: ~13 unique images**

### **4:3 (Landscape)**
- About header (1)
- Leadership portraits (3)
- Work header (1)
- What We Do header (1)
- Insights header (1)
- Partner header (1)
**Total: 9 images**

### **3:4 (Portrait)**
- Contact page side image (1)
**Total: 1 image**

### **1:1 (Square)**
- Venue preview on register page (1)
**Total: 1 image**

---

## **TOTAL IMAGE COUNT NEEDED**

**Minimum Required: ~24 unique images**

**Breakdown:**
- Hero/Header images: 7
- Leadership portraits: 3
- Work/Capability cards: 4
- Insights/Blog thumbnails: 3-6
- Event images: 1-2
- Firm cards: 2
- Venue photo: 1
- Contact side image: 1

---

## **NAMING CONVENTION (Suggested)**

When you drop images, name them clearly:
- `hero-home.jpg`
- `about-header.jpg`
- `portrait-person1.jpg`, `portrait-person2.jpg`, `portrait-person3.jpg`
- `work-header.jpg`
- `event-featured.jpg`
- `capability-events.jpg`, `capability-media.jpg`, etc.
- `insights-header.jpg`
- `insight-card-1.jpg`, `insight-card-2.jpg`, `insight-card-3.jpg`
- `contact-colonnade.jpg`
- `partner-header.jpg`
- `venue-square.jpg`
- `firm-lamedia.jpg`
- `firm-buildright.jpg`
- `whatwedo-header.jpg`

---

## **NOTES**

1. All images currently show placeholder labels in the UI
2. The `Media` component (components/ui/Primitives.tsx) handles the display
3. Images need to be added to component props as `src` parameter
4. Gallery, Events, Partners, and Blog images are managed through admin panel upload
5. Static page images need to be hardcoded in the respective page files

Once you drop the images here, let me know and I'll integrate them into all the pages!
