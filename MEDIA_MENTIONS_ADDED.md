# 📰 MEDIA MENTIONS / PRESS COVERAGE

## ✅ ADDED TO WEBSITE!

### **Location:**
- Shows on ALL pages
- Position: After Partners section, before Footer
- Component: `components/site/MediaMentions.tsx`

---

## 🎨 FEATURES:

- **6 media outlet slots** (customizable)
- **Grayscale effect** - Color on hover
- **Responsive grid** - 2 cols mobile, 3 tablet, 6 desktop
- **Smooth animations** - Fade in with stagger
- **Professional look** - Clean minimal design

---

## 📂 HOW TO ADD LOGOS:

### **Option 1: Add Logo Images**
1. Place media logos in: `public/media-mentions/`
2. Recommended format: PNG with transparent background
3. Size: Around 120x60px (will auto-resize)

Example logos to add:
- `toi.png` - Times of India
- `ad.png` - Architectural Digest
- `et.png` - Economic Times
- `hbl.png` - Hindu Business Line
- `forbes.png` - Forbes India
- etc.

### **Option 2: Use Text (Current Setup)**
Currently shows text placeholders if logos not found.

---

## 🔧 TO CUSTOMIZE:

Edit: `components/site/MediaMentions.tsx`

```typescript
const DEFAULT_MENTIONS = [
  { id: '1', name: 'The Times of India', logo: '/media-mentions/toi.png' },
  { id: '2', name: 'Architectural Digest', logo: '/media-mentions/ad.png' },
  // Add more...
];
```

---

## 💡 SUGGESTIONS:

Add logos for:
- Times of India
- Architectural Digest
- Economic Times
- Hindu Business Line
- Forbes India
- Architecture + Design
- Elle Decor
- Dezeen
- ArchDaily

---

## 🎯 ORDER OF SECTIONS (Bottom to Top):

1. Main Content
2. Partners Showcase
3. **Media Mentions** ← NEW!
4. Footer

---

**Media mentions section is LIVE! Add logos to make it shine! 🌟**
