# a11y Motion Primitives

A collection of **accessible, performant micro-interactions** built with [Framer Motion](https://www.framer.com/motion/), [Next.js](https://nextjs.org/), and [Tailwind CSS**.

This project demonstrates best practices for combining smooth animations with robust accessibility standards (WCAG 2.1, ARIA patterns, keyboard navigation).

## 🎯 Project Goals

- **Accessibility First**: Full WCAG 2.1 compliance with ARIA patterns
- **Smooth Animations**: Delightful micro-interactions using Framer Motion
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Developer Experience**: Well-documented, reusable components
- **Performance**: Optimized animations respecting `prefers-reduced-motion`

## 📦 Components

### AccessibleModal
A fully accessible modal dialog component with:
- ARIA `role="dialog"` and `aria-modal` attributes
- Keyboard navigation (ESC to close)
- Focus trap and management
- Smooth scale/fade animations
- Screen reader support

### AdaptiveMegaMenu
A responsive navigation menu featuring:
- Arrow key navigation (←/→)
- Mobile-friendly touch support
- ARIA menu patterns
- Nested submenu support
- Keyboard accessibility

### ScreenReaderBridge
Utility components for accessibility:
- Live regions (`aria-live`) for dynamic announcements
- Skip links for keyboard navigation
- `useScreenReaderAnnouncement` hook
- Polite and assertive announcement priorities

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gabrielle-is-away/the-micro-interaction-labyrinth.git
cd the-micro-interaction-labyrinth

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
a11y-motion-primitives/
├── .github/workflows/        # CI/CD deployment
├── components/               # Reusable React components
│   ├── AccessibleModal.jsx
│   ├── AdaptiveMegaMenu.jsx
│   └── ScreenReaderBridge.jsx
├── pages/                    # Next.js pages
│   └── index.jsx            # Sandbox gallery
├── styles/                   # Global styles
│   └── globals.css
├── public/                   # Static assets
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS plugins
├── next.config.js           # Next.js configuration
└── README.md                # This file
```

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static site
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and export for deployment

## ♿ Accessibility Features

- ✅ Full keyboard navigation
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Reduced motion support (`prefers-reduced-motion`)
- ✅ Color contrast compliance (WCAG AA)
- ✅ Skip navigation links

## 🎨 Customization

### Tailwind Configuration
Modify `tailwind.config.js` to customize:
- Color schemes
- Typography
- Breakpoints
- Custom utilities

### Animation Preferences
All Framer Motion animations respect the `prefers-reduced-motion` media query automatically.

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Web Content Accessibility Guidelines (WCAG 2.1)](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)

## 🤝 Contributing

Contributions are welcome! Please ensure:
1. Components meet WCAG 2.1 Level AA standards
2. Keyboard navigation is fully functional
3. Code follows the existing style patterns
4. Animations respect `prefers-reduced-motion`

## 📄 License

MIT License - see LICENSE file for details

## 👋 Author

**Gabrielle** - [@gabrielle-is-away](https://github.com/gabrielle-is-away)

---

**Last Updated**: June 6, 2026
