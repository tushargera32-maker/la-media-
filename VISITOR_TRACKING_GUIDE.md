# Visitor Tracking & Analytics System

## Overview
Automatic visitor tracking system jo har site visitor ko track karta hai, chahe unhone form fill kiya ya nahi.

## Features

### 1. Automatic Visitor Tracking
- Har visitor ko unique session ID milta hai
- Browser, device, OS automatically detect hota hai
- Landing page aur referrer track hota hai
- Return visitors ko count karta hai

### 2. Page View Tracking
- Har page visit automatically track hota hai
- Most viewed pages ka data milta hai
- Real-time tracking with no user action needed

### 3. Analytics Dashboard
- Total visitors count
- Today's visitors
- This week's visitors
- Device breakdown (mobile/tablet/desktop)
- Browser breakdown
- Most viewed pages
- Recent 50 visitors list with details

## How to Access

### View Visitor Analytics
```
URL: http://localhost:3000/admin/visitors
```

Yeh page automatically refresh hota hai har 30 seconds mein.

## Database Models

### SiteVisitor
Tracks unique visitors:
- sessionId (unique identifier)
- ipAddress
- userAgent
- device (mobile/tablet/desktop)
- browser (Chrome/Firefox/Safari/Edge)
- os (Windows/MacOS/Linux/Android/iOS)
- landingPage (first page visited)
- visitCount (number of times returned)
- lastVisitedAt

### PageView
Tracks each page visit:
- sessionId (links to visitor)
- path (URL path visited)
- title (page title)
- timestamp

## API Endpoints

### POST /api/track-visitor
Automatically called on every page view
```json
{
  "sessionId": "session_xxx",
  "path": "/register",
  "title": "Design Dialect 2.0 - Register"
}
```

### GET /api/admin/visitor-stats
Returns complete analytics data
```json
{
  "stats": {
    "total": 150,
    "today": 25,
    "thisWeek": 89
  },
  "recentVisitors": [...],
  "topPages": [...],
  "deviceStats": [...],
  "browserStats": [...]
}
```

## How It Works

1. **User visits site** → VisitorTracker component loads
2. **Session ID generated** → Stored in localStorage
3. **API call to /api/track-visitor** → Visitor data saved
4. **Every page navigation** → New PageView created
5. **Return visits** → visitCount incremented

## Privacy & GDPR Compliance

- No personal data collected without consent
- Only technical data: browser, device, pages visited
- No cookies used (localStorage only for session ID)
- IP address stored for analytics only
- Data used for improving user experience

## Easy Access URLs

### For Admins:
- **Visitor Analytics**: `/admin/visitors`
- **All Registrations**: `/admin/registrations`
- **Form Submissions**: `/admin/contacts`

## Benefits

1. **Track interest** before form submission
2. **See popular pages** to optimize content
3. **Device insights** for responsive design decisions
4. **Browser stats** for compatibility testing
5. **Real-time monitoring** of site traffic

## Notes

- Works automatically - no configuration needed
- Updates in real-time
- Lightweight - minimal performance impact
- SQLite database - easy to backup
- No external dependencies or costs

## Future Enhancements

Possible additions:
- Email notifications for new visitors
- Export analytics to CSV/Excel
- Heatmap of page activity
- Time spent on each page
- Visitor journey flow visualization
- Geographic location tracking (country/city)
