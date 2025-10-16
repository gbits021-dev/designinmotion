# Admin Panel Guide

## 🎉 Admin Panel Complete!

You can now edit **everything** from the admin panel!

## Access the Admin Panel

1. Go to: **http://localhost:3001/admin**
2. Password: **dio2025admin**
3. Login and start editing!

## Available Tabs

### 1. **Event** Tab
Edit basic event information:
- Event date & time
- Date display (EN/KA)
- Venue name (EN/KA)

### 2. **About** Tab ✨ NEW!
Edit the "About the Event" section:
- **Headline** - Main heading (EN/KA)
- **Cover Image** - Side poster image URL
- **Paragraphs** - 3 text paragraphs with:
  - English & Georgian text
  - Highlight checkbox (makes text bold & blue)
- **Footer Text** - Bottom disclaimer (EN/KA)

### 3. **Architects Club** Tab ✨ NEW!
Edit the DIO's Architects Club section:
- **Title** - Section title (EN/KA)
- **Club Logo** - Logo image path
- **Section Title** - Subsection heading (EN/KA)
- **Paragraphs** - 3 text paragraphs (EN/KA)

### 4. **Gallery** Tab ✨ NEW!
Manage gallery images:
- Add new images
- Edit image paths
- Delete images
- Reorder images (used in Architects Club slideshow)

**Note:** Upload images to the `public` folder first, then reference them as `/image.jpg`

### 5. **Partners** Tab
Manage partner companies:
- Partner name
- Logo path
- Website link
- Short description (EN/KA)
- Detailed information (EN/KA) - Shows when "More Info" clicked

### 6. **Agenda** Tab
Manage event schedule:
- **Add Session** - Create new time slots
- **Delete Session** - Remove sessions
- **Move Up/Down** - Reorder sessions
- Edit for each session:
  - Time slot
  - Title (EN/KA)
  - Speaker name (EN/KA) - Optional
  - Description (EN/KA)

### 7. **Registration** Tab
Edit registration details:
- Google Form URL
- Free event checkbox

## How to Save Changes

1. Edit content in any tab
2. Click **"Export Changes"** button (top right)
3. A file `content.js` will download
4. Replace `app/content.js` with the downloaded file
5. Refresh the website to see changes!

## Tips

### Adding Images
1. Put your image in the `public` folder
2. Reference it as `/your-image.jpg` (with leading slash)
3. Or use full URLs like `https://...`

### Text Editing
- Use the textareas for longer content
- Highlight checkbox makes paragraphs stand out
- Edit both EN and KA versions side-by-side

### Gallery Management
- Images appear in the Architects Club slideshow
- Add 3-6 images for best results
- Use high-quality images (1920x1080 or similar)

## What You Can Edit

✅ Event date, time, and venue
✅ About section headline and all text
✅ About section cover image
✅ Architects Club title and content
✅ Gallery images for slideshow
✅ All partner information and detailed descriptions
✅ Complete event agenda/schedule
✅ Registration form link

## Yes, you can upload screenshots!

Feel free to paste screenshots here if you want to show me what you're working on or if you need help with something specific!

Just drag and drop or paste (Ctrl+V / Cmd+V) any images directly into the chat.

## Need Help?

The dev server is running at: **http://localhost:3001**

- Main site: http://localhost:3001
- Admin panel: http://localhost:3001/admin

All your changes are immediately visible when you replace the `content.js` file!
