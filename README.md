# Silvicious - Digital Fashion Portfolio

A modern, responsive portfolio website showcasing digital fashion design, 3D modeling, and virtual fashion experiences.

## 🎨 Features

- **Modern Design**: Sleek, contemporary aesthetic with gradient accents and smooth animations
- **Portfolio Section**: Filterable gallery with categories for 3D models, virtual fashion, and web design
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging scroll animations and hover effects
- **Service Showcase**: Display of specialized services including 3D design, virtual fashion, and NFT creation
- **Contact Form**: Easy-to-use contact form for client inquiries
- **Social Integration**: Links to social media profiles and professional networks

## 📁 Project Structure

```
silvicious.github.io/
├── index.html        # Main HTML file with page structure
├── styles.css        # CSS styling and responsive design
├── script.js         # JavaScript for interactivity
└── README.md         # Project documentation
```

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/silvicious/silvicious.github.io.git
cd silvicious.github.io
```

2. Open in a local server (recommended for better performance):
```bash
# Using Python 3
python -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js with http-server
npx http-server
```

3. Open your browser and navigate to `http://localhost:8000`

### Direct File Opening

You can also simply open `index.html` directly in your browser, though some features may work better with a local server.

## 🎯 Customization

### Update Personal Information

Edit `index.html` to add your:
- Portfolio projects and images
- Service descriptions
- Contact information
- Social media links

### Modify Colors

The design uses CSS variables for easy customization. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #1a1a2e;      /* Dark blue */
    --secondary-color: #e91e63;    /* Pink */
    --accent-color: #00f0ff;       /* Cyan */
    --text-light: #f0f0f0;
    --text-dark: #0a0a0a;
    --bg-light: #f5f5f5;
    --border-color: #e0e0e0;
}
```

### Replace Placeholder Images

Update the portfolio section with your actual work:
- Replace `https://via.placeholder.com/...` URLs with your own image URLs
- Update project titles and categories
- Adjust the portfolio-item data-categories to match your filter buttons

## 🔧 Functionality

### Portfolio Filtering
- Click filter buttons to show/hide portfolio items by category
- Smooth transitions and animations between filter states

### Smooth Navigation
- Internal links smoothly scroll to sections
- Mobile hamburger menu for better usability on smaller screens

### Contact Form
- Add form handling by integrating with a backend service (Formspree, EmailJS, etc.)
- Currently shows an alert on submission; extend with actual email sending

## 📱 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE 11 requires polyfills for CSS Grid and CSS Variables

## 🚀 Deployment

### GitHub Pages
The site is configured for GitHub Pages deployment:

1. Push your changes to the main branch:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

2. Your site will be live at `https://silvicious.github.io`

### Other Hosting Options
- Netlify
- Vercel
- Firebase Hosting
- Traditional web hosting

## 🎨 Design Highlights

- **Gradient Color Scheme**: Pink (#e91e63) and Cyan (#00f0ff) gradients for visual impact
- **Responsive Grid Layout**: Adapts seamlessly from mobile to large screens
- **Interactive Elements**: Hover effects, smooth transitions, and animation on scroll
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Accessibility**: Semantic HTML and ARIA labels for better screen reader support

## 📝 Sections

1. **Navigation Bar**: Sticky navigation with smooth scrolling links
2. **Hero Section**: Eye-catching headline with call-to-action button
3. **About Section**: Personal introduction and statistics
4. **Portfolio Section**: Filterable gallery of your work
5. **Services Section**: Showcase of your expertise and offerings
6. **Contact Section**: Form for potential clients to reach out
7. **Footer**: Links and social media connections

## 💡 Tips for Best Results

- Use high-quality portfolio images (optimize for web)
- Keep portfolio descriptions concise and engaging
- Test the site on multiple devices and browsers
- Update portfolio regularly with new work
- Consider adding client testimonials
- Monitor contact form submissions

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to customize and improve this portfolio template for your needs!

---

**Last Updated**: February 2026
**Version**: 1.0