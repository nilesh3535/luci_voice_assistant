# Luci - AI Voice Assistant Landing Page

A premium, production-ready "Coming Soon" landing page for Luci, an AI voice assistant built for Windows with native support for Hindi, English, and Hinglish.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Handling**: Next.js Image Component

## Project Structure

```
Luci_Voice_Assistant/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main landing page component
│   └── globals.css          # Global styles and animations
├── public/
│   ├── luci.png            # Logo file
│   └── robots.txt          # SEO robots file
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind configuration with custom theme
├── next.config.ts          # Next.js configuration
└── postcss.config.js       # PostCSS configuration
```

## Features

### 🎨 Design System
- **Color Palette**: Deep midnight backgrounds with electric cyan and violet accents
- **Effects**: Glassmorphism, neon glows, smooth gradients
- **Responsive**: Mobile-first design that works on all devices

### ✨ Animated Components

1. **Animated Orb**: Central AI voice visualization with:
   - Pulsating glow effects
   - Sound wave visualization
   - Rotating rings
   - Floating particles

2. **Terminal Animation**: Simulated terminal showing voice commands with typewriter effect

3. **Feature Cards**: Interactive cards with hover states and staggered animations

4. **Form Section**: Elegant email waitlist form with focus states

### 🎯 Sections

- **Hero**: Bold tagline with animated orb
- **Features**: 6 interactive feature cards highlighting Luci's capabilities
- **Demo**: Terminal animation showing voice commands in action
- **Waitlist**: Email capture form with validation
- **Header**: Sticky navigation with Instagram link
- **Footer**: Copyright information

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the landing page.

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Customization

### Colors
Edit the color palette in `tailwind.config.ts`:
```typescript
colors: {
  'cyan': '#00D9FF',
  'violet': '#9D00FF',
  // ... more colors
}
```

### Animations
Modify animation durations and timing in:
- `tailwind.config.ts` (keyframes)
- `app/page.tsx` (Framer Motion animations)

### Content
Update text, headings, and descriptions directly in `app/page.tsx`

## Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ CSS-in-JS with Tailwind (tree-shaking)
- ✅ Lazy-loaded animations with Framer Motion
- ✅ Smooth scrollbar and transitions
- ✅ Mobile-first responsive design

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## SEO Features

- ✅ Metadata optimization
- ✅ Open Graph tags
- ✅ Structured semantic HTML
- ✅ Mobile-friendly design
- ✅ Fast Core Web Vitals

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub then deploy to Vercel
# https://vercel.com/new
```

### Docker

Create a `Dockerfile` if deploying to custom infrastructure.

## License

All rights reserved. Luci is a proprietary product.

---

**Website**: Coming Soon  
**Instagram**: [@luci_voice_assistant](https://www.instagram.com/luci_voice_assistant)  
**Email**: contact@luci.voice

---

Built with ❤️ using Next.js, React, and Framer Motion
"# luci_voice_assistant" 
"# luci_voice_assistant" 
