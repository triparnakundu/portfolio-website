# portfolio-website

# Triparna Kundu - Portfolio Website

A modern, professional portfolio website showcasing expertise in Data Analytics, Business Analytics, Machine Learning, and Consulting.

## Features

- **Beautiful Hero Section** with professional photo
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - Elegant transitions and scroll effects
- **Professional Styling** - Tailored for consulting firms (BCG, JP Morgan, etc.)
- **Comprehensive Sections**:
  - About & Education
  - Professional Experience
  - Research Experience
  - Publications & Pre-Prints
  - Technical Skills
  - Honors & Achievements
  - Contact Information

## Getting Started

### Viewing the Website

Simply open `index.html` in your web browser. No build process or server required!

### Local Development

For the best experience, you can use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive features and animations
├── assets/
│   └── profile-photo.png  # Your professional photo
└── README.md           # This file
```

## Customization

### Updating Content

Edit `index.html` to update:
- Personal information
- Experience details
- Publications
- Skills
- Contact information

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #16213e;
    --accent-color: #0f3460;
    --highlight-color: #e94560;
    /* ... */
}
```

### Updating Photo

Replace `assets/profile-photo.png` with your own photo (recommended size: 400x400px or larger, square format).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to Settings > Pages
4. Select the main branch and save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Drag and drop the portfolio folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be live instantly!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the portfolio directory
3. Follow the prompts

## Contact

For questions or updates, contact:
- Email: triparna178@gmail.com
- Phone: +1 (617) 870-9404

---

Built with ❤️ for showcasing professional expertise in Analytics and Consulting.
