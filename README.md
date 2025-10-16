# Design in Motion 2025 - Landing Page

An aesthetic and functional landing page for the DIO Architects Event 2025.

## Features Implemented

### Visual Enhancements
- Smooth scroll animations and transitions
- Beautiful timeline component for agenda
- Partner logos with hover effects (grayscale to color)
- Floating registration CTA button (appears after scrolling)
- Custom animations (fade-in, slide-in, pulse)
- Fully responsive design for all devices

### Content Management
- **Easy Content Editing**: All editable content is centralized in `app/content.js`
- **Admin Panel**: Password-protected admin interface at `/admin`
- **No Database Required**: Simple file-based content management

### SEO & Performance
- Complete SEO meta tags
- Open Graph tags for social media sharing
- Twitter Card support
- Optimized images with Next.js Image component
- Fast loading and smooth animations

## How to Edit Content

### Option 1: Edit Content File Directly (Simplest)
Edit the file `app/content.js` to update:
- Event date and time
- Venue information
- Partners (name, logo, link, description)
- Agenda/schedule
- Registration form URL
- Gallery images

### Option 2: Use Admin Panel (Easier for Non-Developers)
1. Navigate to `http://localhost:3000/admin` (or your domain + `/admin`)
2. Login with password: `dio2025admin` (change this in `app/admin/page.js`)
3. Edit content through the visual interface
4. Click "Export Changes" to download the updated `content.js`
5. Replace `app/content.js` with the downloaded file
6. Restart the dev server or rebuild the site

**IMPORTANT**: Change the admin password in `app/admin/page.js` line 6:
```javascript
const ADMIN_PASSWORD = "your-new-secure-password";
```

## Quick Edits Guide

### Update Event Date
Edit `app/content.js`:
```javascript
event: {
  date: "2025-11-20T11:00:00", // Change this
  ...
}
```

### Add/Remove Partners
Edit the `partners` array in `app/content.js`:
```javascript
partners: [
  {
    name: "Partner Name",
    logo: "/path-to-logo.png", // Put logo in public folder
    link: "https://partner-website.com",
    description: {
      en: "English description",
      ka: "Georgian description"
    }
  },
  // Add more partners here
]
```

### Update Agenda/Schedule
Edit the `agenda` array in `app/content.js`:
```javascript
agenda: [
  {
    time: "11:00 - 11:30",
    title: {
      en: "Session Title",
      ka: "სესიის სათაური"
    },
    speaker: { // Optional
      en: "Speaker Name",
      ka: "სპიკერის სახელი"
    },
    description: {
      en: "Session description",
      ka: "სესიის აღწერა"
    }
  },
  // Add more sessions
]
```

### Change Registration Form Link
Edit `app/content.js`:
```javascript
registration: {
  formUrl: "https://docs.google.com/forms/d/YOUR_FORM_ID",
  isFree: true
}
```

### Add Gallery Images
1. Put images in the `public` folder
2. Edit `app/content.js`:
```javascript
gallery: [
  "/club-event-1.jpg",
  "/club-event-2.jpg",
  "/your-new-image.jpg", // Add here
]
```

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## File Structure

```
app/
├── content.js          # Edit this for content changes
├── translations.js     # UI text translations (English/Georgian)
├── page.js            # Main landing page
├── layout.js          # Layout with SEO meta tags
├── globals.css        # Custom animations and styles
└── admin/
    └── page.js        # Admin panel for content editing
```

## Key Sections

1. **Hero Section** - Full-screen banner with title and language switcher
2. **Countdown Timer** - Live countdown to event date
3. **About Section** - Event information with image
4. **Architects Club** - Club information with image gallery
5. **Partners** - Partner logos with hover effects
6. **Venue** - Location details with Google Maps embed
7. **Agenda** - Beautiful timeline showing event schedule
8. **Registration** - Call-to-action with form link
9. **Floating Button** - Sticky registration button (appears on scroll)

## Customization Tips

### Change Color Scheme
Edit `app/globals.css` and search/replace colors:
- Primary blue: `#21263A`, `blue-600`, `blue-700`
- Accent colors in Tailwind classes

### Update Fonts
Edit `app/layout.js` to change Google Fonts

### Modify Animations
Edit `app/globals.css` keyframes section

## Deployment

This is a Next.js app. Deploy to:
- **Vercel** (Recommended): Connect GitHub repo, auto-deploy
- **Netlify**: Similar to Vercel
- **Any Node.js host**: Run `npm run build && npm start`

## Support

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React: https://react.dev

## Security Note

**Remember to change the admin password** before deploying to production!

Edit `app/admin/page.js`:
```javascript
const ADMIN_PASSWORD = "your-secure-password-here";
```

For production, consider implementing proper authentication with database-backed user management.
