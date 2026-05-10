````markdown name=README.md
# 🎉 Nubian Wedding Invitation

A beautifully designed wedding invitation website featuring traditional Nubian aesthetics and modern web technologies.

![Wedding Date](https://img.shields.io/badge/Wedding%20Date-2026--08--20-gold?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![Language](https://img.shields.io/badge/Language-Arabic-blue?style=flat-square)

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Traditional Nubian Aesthetics**: Authentic cultural design with geometric patterns and symbolic elements
- **Interactive Countdown**: Live countdown timer to the wedding date
- **Smooth Animations**: Beautiful transitions and animated elements (birds, boats, water waves)
- **RSVP System**: Guest confirmation form with dietary preferences
- **Interactive Map**: Google Maps integration for venue location
- **Multi-language Support**: Designed for Arabic (RTL) with English compatibility
- **Dark Mode Friendly**: Carefully chosen color palette for accessibility

## 🎨 Design Elements

### Color Palette
- **Parchment**: `#F5E6CA` - Main background
- **Nile Blue**: `#1E4A6E` - Water and accents
- **Terracotta**: `#D35400` - Primary accent
- **Gold**: `#C8860A` - Details and dividers
- **Green**: `#27AE60` - Flora (palm trees, crocodiles)
- **Sun Yellow**: `#F1C40F` - Highlights

### Cultural Symbols
- 🌴 **Palm Trees**: Representing the Nile landscape
- 🐊 **Crocodiles**: Nubian fauna element
- ⛵ **Feluccas**: Traditional Nile boats
- 🕊️ **Swallows**: Birds in flight
- 🪘 **Geometric Patterns**: Traditional Nubian designs
- 🐚 **Cowrie Shells**: Decorative and cultural element

## 🚀 Quick Start

### View the Site
Simply open `index.html` in your browser:
```bash
open index.html
```

### Or access via GitHub Pages
Visit: `https://abdelwahab-adel.github.io/nubian-wedding/`

## 📁 Project Structure

```
nubian-wedding/
├── index.html          # Main HTML file with embedded styles
├── styles.css          # Separate stylesheet (organized)
├── script.js           # JavaScript for interactions
├── README.md           # This file
└── images/             # (Optional) Image assets
```

## 🔧 Configuration

### Update Wedding Details
Edit the following in `index.html`:

1. **Couple Names**:
   ```html
   <div class="couple-names">
     الأستاذ أحمد
     <span class="couple-amp">✦ &amp; ✦</span>
     الآنسة D
   </div>
   ```

2. **Wedding Date** (in `script.js`):
   ```javascript
   const WEDDING_DATE = new Date('2026-08-20T18:00:00').getTime();
   ```

3. **Family Names**:
   ```html
   <div class="family-names-list">
     عائلة الأستاذ ناصر ركابي
   </div>
   ```

4. **Location & Map**:
   Update the Google Maps iframe URL with your venue coordinates.

### Customize Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --parchment: #F5E6CA;
  --nile: #1E4A6E;
  --terracotta: #D35400;
  /* ... more colors ... */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with side-by-side families section
- **Tablet**: Optimized spacing and font sizes
- **Mobile** (max-width: 560px):
  - Single column for families
  - Simplified navigation
  - Compact date boxes

## 🎬 Animations

### Entrance Animations
- **heroFade**: Fade-in with upward movement (0.3s delay)
- **fadeSlide**: Fade-in with slide-up effect

### Continuous Animations
- **fly**: Swallows flying in figure-8 patterns (17-25s duration)
- **sailFloat**: Boats bobbing up and down (6-8s duration)
- **wave**: Water waves moving left (8-12s duration)
- **pulse**: Subtle opacity pulse

## 🔗 Integration

### RSVP Form Backend
The RSVP form is ready to integrate with:
- Email service (SendGrid, Mailgun)
- Backend API
- Google Sheets
- GitHub Issues

Currently shows confirmation alert. Uncomment backend code in `script.js` to enable.

### Analytics
Ready to integrate with:
- Google Analytics
- Mixpanel
- Custom tracking

## 📐 Typography

**Fonts Used**:
- **Scheherazade New**: Arabic decorative text (titles, verses)
- **Amiri**: Body text and form inputs (elegant serif)

Loaded from Google Fonts CDN for optimal performance.

## ♿ Accessibility

- ✅ Proper heading hierarchy
- ✅ Color contrast ratios meet WCAG standards
- ✅ Semantic HTML structure
- ✅ Form labels properly associated
- ✅ Keyboard navigation support
- ✅ Mobile-friendly viewport settings

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues & TODO

- [ ] Add photo gallery section
- [ ] Integrate real RSVP backend
- [ ] Add music/audio background
- [ ] Create print-friendly version
- [ ] Add gift registry link
- [ ] Implement email confirmations

## 📧 Contact & Support

For questions or customization requests, contact the website owner.

## 📄 License

This project is provided as-is for personal use. Feel free to customize for your own wedding!

---

**Made with ❤️ for a beautiful celebration of Nubian culture** 🎊
````
