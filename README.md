

<br />

### ✦ PORTFOLIO ✦

**A cinematic, immersive developer portfolio built with Next.js, Three.js & GSAP**

<br />

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)

<br />

![License](https://img.shields.io/badge/license-MIT-orange?style=flat-square)
![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-welcome-blue?style=flat-square)

<br />

> *"Every animation should demonstrate something. Every pixel should feel intentional."*

<br />

---

</div>

<br />

## 🎬 Overview

This is my personal developer portfolio — designed to feel like a **cinematic film intro** rather than a standard résumé page. It uses a talking-head video hero, a Three.js WebGL particle system, GSAP scroll animations, and a full dark cinematic aesthetic to communicate one thing before a single word is read:

**This person ships things that feel premium.**

The entire design philosophy is built around the **8-second rule** — the average time a recruiter spends on a portfolio before deciding to stay or leave. Every section, every motion, every typographic choice earns that time.

<br />

## ✨ Features

### 🎥 Cinematic Hero Section
- Fullscreen **talking-head video** as the primary visual asset
- Blurred **ambient video duplicate** as a warm background layer
- Layered **cinematic gradient overlays** for depth and text readability
- Smooth **fade-in on load** with staged GSAP entrance animations
- **Play / Pause** and **Mute / Unmute** glassmorphism controls
- Auto-hiding **"Tap for sound"** animated badge
- Animated **scroll indicator** with pulsing line

### 🌌 Three.js Bokeh Particle System (`CinematicLayer`)
- **320 warm-toned particles** — orange, gold, soft white, with cool blue accents
- **Additive blending** for a luminous, practical-lighting feel
- Soft **radial gradient sprite texture** for dreamy bokeh glow
- Per-particle **sine-wave float** with unique phase offsets
- Smooth **mouse parallax** camera movement (lerped at 4% per frame)
- `mix-blend-mode: screen` for seamless video compositing
- Full **resource cleanup** on component unmount (no memory leaks)

### 📖 Full Portfolio Sections
| Section | Description |
|---|---|
| **Hero** | Cinematic video intro with particle overlay |
| **About** | Personal bio, stats, and editorial portrait frame |
| **Skills** | 6-card expertise grid with hover interactions |
| **Experience** | Sticky-sidebar timeline with role cards |
| **Projects** | Filterable mosaic grid (5 projects, 3 layout sizes) |
| **Process** | 4-step work methodology with connecting line |
| **Testimonials** | 3-card testimonial grid with glassmorphism quotes |
| **Contact** | Split layout with social links + functional form |
| **Footer** | Minimal with social links |

### 🎨 Design System
- **Dark cinematic aesthetic** — near-black `#080604` base
- **Warm orange accent** `#ff7a2f` — inspired by practical film lighting
- **Cormorant Garamond** — editorial serif for display headings
- **DM Sans** — clean geometric sans for UI text
- **Glassmorphism** controls with `backdrop-filter` blur
- **CSS custom properties** for consistent theming throughout
- Fully **responsive** down to 320px

### ⚡ Performance
- Dynamic `import('three')` — Three.js loaded only client-side
- `requestAnimationFrame` with proper `cancelAnimationFrame` cleanup
- **Pixel ratio capped at 1.5×** for GPU efficiency
- `IntersectionObserver` for scroll-triggered reveals (no scroll listeners)
- `next/dynamic` with `ssr: false` for the WebGL canvas
- GPU-composited animations via `transform` and `opacity` only
- No layout thrashing — all reads before writes

<br />

## 🗂 Project Structure

```
cinematic-portfolio/
├── public/
│   └── hero.mp4                     # Your talking-head video
│
├── src/
│   ├── app/
│   │   ├── layout.jsx               # Root layout
│   │   ├── page.jsx                 # Home page (assembles sections)
│   │   └── globals.css              # Global reset & scrollbar styles
│   │
│   └── components/
│       ├── VideoIntro/
│       │   ├── VideoIntro.jsx       # Hero section — video, content, controls
│       │   └── VideoIntro.module.css
│       │
│       └── CinematicLayer/
│           ├── CinematicLayer.jsx   # Three.js WebGL particle system
│           └── CinematicLayer.module.css
│
├── next.config.js
├── package.json
└── README.md
```

<br />

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.17+`
- **npm** `v9+` or **yarn** / **pnpm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/cinematic-portfolio.git
cd cinematic-portfolio

# 2. Install dependencies
npm install

# 3. Add your video asset
# Drop your talking-head video into the public folder:
cp /path/to/your-video.mp4 public/hero.mp4

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments on every push.

<br />



### 7. Color Theme (CSS Variables)

```css
/* src/app/globals.css or VideoIntro.module.css */
:root {
  --orange:       #ff7a2f;  /* Primary accent — change to your brand color */
  --orange-light: #ffb06b;  /* Lighter tint for hover states               */
  --warm-white:   #f5ede0;  /* Main text color                             */
  --bg:           #080604;  /* Page background                             */
}
```

### 8. Particle Colors — `CinematicLayer.jsx`

```js
// Lines 46–49 — change to match your palette
const warmOrange = new THREE.Color(0xff7a2f);  // Primary particle color
const softWhite  = new THREE.Color(0xfff0e0);  // Secondary
const goldGlow   = new THREE.Color(0xffb347);  // Accent
const coolBlue   = new THREE.Color(0x8ab4f8);  // Contrast accent
```

<br />

## 📦 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 14.2.3 | React framework, App Router, SSR |
| [React](https://react.dev) | 18.3 | Component architecture, hooks |
| [Three.js](https://threejs.org) | 0.164 | WebGL particle system, 3D rendering |
| [GSAP](https://gsap.com) | 3.12.5 | Hero entrance animations, scroll triggers |
| CSS Modules | — | Scoped component styling |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | — | Display / editorial typography |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | — | UI / body typography |

<br />

## 🧠 Architecture Decisions

**Why dual video layers?**
The blurred background video creates ambient warmth and depth without requiring any actual background art. The foreground video carries the narrative. Two `<video>` elements referencing the same `src` share the same decoded buffer — no double bandwidth.

**Why dynamic import for Three.js?**
Three.js is ~600KB. Loading it synchronously would block the initial paint. `next/dynamic` with `ssr: false` defers it to after hydration, keeping First Contentful Paint fast.

**Why `mix-blend-mode: screen` on the canvas?**
Screen blending makes the dark areas of the particle system transparent, so only the glowing warm particles composite over the video. This avoids any opaque box covering the video while keeping the additive light effect.

**Why `IntersectionObserver` over scroll events?**
Scroll listeners run on the main thread and can cause jank. `IntersectionObserver` is browser-native, runs off-thread, and fires only when elements enter/leave the viewport — perfect for reveal animations.

**Why Cormorant Garamond for the name?**
Editorial serifs signal taste and intentionality at large display sizes. The contrast between the heavy serif display heading and the light geometric sans body text creates the same typographic tension used in high-end print design.

<br />

## 🎯 Sections Roadmap

- [x] Cinematic video hero
- [x] Three.js particle layer
- [x] About section
- [x] Skills / expertise grid
- [x] Work experience timeline
- [x] Projects mosaic with filters
- [x] Process methodology
- [x] Testimonials
- [x] Contact form
- [ ] Blog / writing section
- [ ] Dark / light mode toggle
- [ ] Page transition animations
- [ ] Project detail modal / pages
- [ ] Cursor custom animation

<br />

## 📄 License

This project is open source under the [MIT License](LICENSE). You're free to use this as a template for your own portfolio — just swap in your own content, video, and projects.

If you found this useful, a ⭐ on the repo is always appreciated.

<br />


---

<div align="center">

Designed & built with care. Every detail is intentional.

*"The tech stack doesn't impress anyone. The feeling it creates does."*

</div>
