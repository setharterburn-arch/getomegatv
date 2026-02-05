# Omega TV Website Redesign Spec

## Design Direction
**Minimalist Cyberpunk** — Clean white space meets sharp futuristic edges. Think: Linear.app meets N-O-D-E.net meets brutalist typography.

## Color Palette
- **Background**: `#FFFFFF` (pure white)
- **Primary Text**: `#000000` (pure black)
- **Secondary Text**: `#6B7280` (grey-500)
- **Accent/Shadows**: `#E5E7EB` (grey-200) to `#9CA3AF` (grey-400)
- **Buttons**: Black fill, white text
- **Hover States**: Grey backgrounds, subtle transitions

## Typography
- **Font**: Inter or Space Grotesk (geometric, clean)
- **Headings**: 
  - Bold/Black weight (700-900)
  - Tight letter-spacing (`-0.02em` to `-0.04em`)
  - Large sizes (48-72px for hero)
- **Body**: Regular weight, generous line-height (1.6-1.8)
- **Style**: ALL CAPS for nav/buttons, sentence case for body

## Layout Patterns
- **Hero**: Centered, minimal — just headline + CTA
- **Sections**: Generous whitespace (120-160px vertical padding)
- **Grid**: Max-width 1200px, asymmetric layouts OK
- **Cards**: Sharp corners (no rounded), subtle box-shadows

## Animation/Micro-interactions
- **Hovers**: Scale 1.02, shadow lift
- **Page Load**: Staggered fade-in (opacity + translateY)
- **Buttons**: Fill transition on hover
- **Smooth scroll** behavior

## Components

### Header
- Logo left (Ω symbol)
- Nav links right, uppercase, letter-spaced
- Minimal — no background, just border-bottom on scroll

### Hero
```
[centered]
STREAM EVERYTHING.
ONE SUBSCRIPTION.

10,000+ channels. Movies. Sports. Live TV.
Works on any device.

[BLACK BUTTON: GET STARTED]
```

### Pricing Section
- 3 columns, clean cards
- Sharp borders, no rounded corners
- Price prominent, features minimal
- Best value has subtle grey background

### Features
- Icon + text, 3-column grid
- Icons: Simple line icons or emoji
- Short punchy descriptions

### Footer
- Minimal: Logo, copyright, essential links
- Grey border-top

## CSS Approach
```css
/* Base */
* { box-sizing: border-box; }
body { 
  font-family: 'Inter', system-ui, sans-serif;
  background: #fff;
  color: #000;
  line-height: 1.6;
}

/* Typography */
h1, h2, h3 { 
  font-weight: 700; 
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Buttons */
.btn {
  background: #000;
  color: #fff;
  padding: 14px 32px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Cards */
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 32px;
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeInUp 0.6s ease forwards;
}
```

## Reference Sites
- **Linear.app** — Clean sections, sharp typography, subtle animations
- **N-O-D-E.net** — Brutalist minimal, text-focused
- **Stripe.com** — Professional, clear hierarchy
- **Apple.com** — Whitespace, product focus

## Implementation Priority
1. Landing page (page.tsx)
2. Global styles (globals.css)
3. Login/Signup pages
4. Dashboard
5. Support chat
