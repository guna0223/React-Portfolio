# ⚡ Gunasekar D — Full Stack Developer

A **Naruto-inspired** personal portfolio featuring the Akatsuki/Sharingan/Rinnegan aesthetic with cinematic animations and chakra-powered interactions.

![Portfolio Preview](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)

## 🌌 Overview

A cinematic portfolio experience inspired by the **Naruto universe**, featuring:

- **Genjutsu Start Screen** — Interactive Sharingan/Rinnegan eye activation
- **Mangekyō Intro** — Cinematic eyelid reveal with authentic sound
- **Chakra Trail Cursor** — Custom cursor with particle effects
- **Rinnegan Portal** — Animated profile picture frame with rotating rings
- **Rasengan & Chidori** — Timed chakra aura effects around profile
- **Akatsuki Cloud Background** — Subtle animated cloud patterns
- **Holographic Cards** — Glowing project/contact cards with backdrop blur
- **Fully Responsive** — Optimized for all devices

## 🛠 Tech Stack

- **Frontend**: React 18+ with hooks
- **Build Tool**: Vite (fast HMR & builds)
- **Animations**: Framer Motion, GSAP
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React
- **Email**: EmailJS (contact form integration)
- **Fonts**: Cinzel, Rajdhani, JetBrains Mono, Exo 2

## 📋 Features

### Sections
- **Genjutsu Start Screen** — Interactive opening with animated Sharingan (left) and Rinnegan (right) eyes, chakra beam, and floating particles. Click to activate.
- **Mangekyō Intro** — Cinematic black screen with a single eye slowly opening, accompanied by authentic sound effect. Sets the tone for the experience.
- **Hero Section** — Dynamic profile with rotating **RinneSharingan** frame, timed **Rasengan** (blue spiral) and **Chidori** (blue lightning) aura effects, glitch text name, and typewriter roles.
- **About Section** — Profile framed by a rotating **Sharingan Ring** with stats cards and skill tags.
- **Skills Section** — Interactive category tabs (Frontend, Backend, Database, Tools, AI Tools) with circular progress indicators and Sharingan overlay on hover.
- **Experience Section** — Timeline of work experience and achievements.
- **Projects Section** — Holographic project cards with **Kunai Slash** hover effect, featuring modal preview with detailed info.
- **Services Section** — Service offerings with futuristic card design.
- **Contact Section** — Holographic contact form with EmailJS integration, featuring a decorative rotating **Rinnegan** ring.
- **Custom 404 Page** — Playable Super Mario-style endless runner game (optional, currently disabled by default).

### UI/UX Features
- **Custom Cursors** — Chakra trail cursor following mouse movement
- **Scroll Progress Indicator** — Visual progress bar at top
- **Smooth Scrolling** — Native smooth scroll between sections
- **Responsive Design** — Mobile, tablet, and desktop optimized
- **Audio Integration** — Background music and sound effects (with user interaction required)
- **Framer Motion Animations** — Smooth transitions and micro-interactions
- **GSAP Timelines** — Complex cinematic sequences
- **Backdrop Blur & Glow Effects** — Modern glassmorphism with Naruto-themed colors

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd portfolio

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── public/
│   │   ├── audio/
│   │   │   ├── home-page.mp3          # Hero background music
│   │   │   └── Mangekyou-Sharingan.mp3 # Intro sound effect
│   │   ├── images/
│   │   │   └── gameimage/             # 404 game assets
│   │   ├── resume/
│   │   │   └── Gunasekar_Resume.pdf
│   │   └── assets/
│   │       ├── AboutImage/            # Profile photos
│   │       └── images/
│   │           └── project-img/       # Project screenshots
│   ├── src/
│   │   ├── components/
│   │   │   ├── css/                   # Global styles
│   │   │   ├── effects/               # Aurora, GlowOrb, NoiseTexture
│   │   │   ├── layout/                # Navbar, Footer, CustomCursor
│   │   │   ├── sections/              # Page sections
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── AboutSection.jsx
│   │   │   │   ├── SkillsSection.jsx
│   │   │   │   ├── ExperienceSection.jsx
│   │   │   │   ├── ProjectsSection.jsx
│   │   │   │   ├── ServicesSection.jsx
│   │   │   │   ├── ContactSection.jsx
│   │   │   │   └── IntroSequence.jsx  # Loading screen (disabled)
│   │   │   └── ui/                    # Reusable UI components
│   │   │       ├── GenjutsuStartScreen.jsx  # Opening eye animation
│   │   │       ├── MangekyoIntro.jsx        # Single eye reveal
│   │   │       ├── SharinganHover.jsx
│   │   │       ├── RinneSharingan.jsx
│   │   │       ├── ChakraParticles.jsx
│   │   │       ├── RasenganPulse.jsx
│   │   │       ├── ChidoriFlash.jsx
│   │   │       ├── AkatsukiBackground.jsx
│   │   │       ├── HoloCard.jsx
│   │   │       └── ... (more)
│   │   ├── data/
│   │   │   └── portfolio.js           # All content data
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── styles/
│   │   │   └── index.css              # Tailwind + theme
│   │   ├── App.jsx                    # Main app with intro flow
│   │   └── main.jsx                   # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json                    # SPA routing config
├── README.md
└── vercel.json                        # Root deployment config
```

## 🎨 Customization

### Color Scheme
Edit CSS variables in [`frontend/src/styles/index.css`](frontend/src/styles/index.css:10):

```css
@theme {
  /* Naruto / Akatsuki Dark Palette */
  --color-bg-primary: #05020a;
  --color-bg-secondary: #0a0412;
  --color-bg-tertiary: #120618;

  /* Sharingan Red (Primary) */
  --color-accent-primary: #cc2222;
  --color-accent-secondary: #e63333;
  --color-accent-tertiary: #990000;

  /* Rinnegan Purple (Secondary) */
  --color-accent-purple: #7b2fff;
  --color-accent-purple-light: #9f5fff;

  /* Chakra Gold */
  --color-accent-gold: #f5a623;
}
```

### Fonts
The portfolio uses Google Fonts imported in [`index.html`](frontend/index.html:15):
- **Cinzel** — Display/headings (serif, elegant)
- **Rajdhani** — Body text (sans-serif, technical)
- **JetBrains Mono** — Monospace (code, terminal)
- **Exo 2** — Alternative sans-serif

### Content
All text content, project data, skills, and contact info is centralized in [`frontend/src/data/portfolio.js`](frontend/src/data/portfolio.js:1). Edit this file to update:
- Personal information
- Skills & proficiency levels
- Projects (title, description, tech stack, links)
- Services
- Experience timeline
- Contact details

## 📧 Contact Form

The contact form uses **EmailJS**. To configure:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Replace the credentials in [`frontend/src/components/sections/ContactSection.jsx`](frontend/src/components/sections/ContactSection.jsx:29):
   - `service_portfolio` — your EmailJS service ID
   - `template_portfolio` — your EmailJS template ID
   - `user_emailjs_id` — your EmailJS user ID (public key)

## 🎮 404 Page — Retro Mini Game (Optional)

The portfolio includes a custom **Super Mario-style endless runner** game for the 404 page, featuring:

- 🦀 Crab enemies (fast, small)
- 🐢 Turtle enemies (slow, larger)
- ☁️ Animated clouds & scrolling ground
- 💯 Score tracking system
- 🎵 Retro sound effects
- 🔄 Works offline

**Note:** The 404 game is currently **disabled by default** in [`App.jsx`](frontend/src/App.jsx:18). To enable:
1. Uncomment the `NotFound` import
2. Uncomment the `<NotFound />` component in the return
3. The game will be accessible at any undefined route

### How to Play
- **SPACE** or **Click** — Jump to avoid enemies
- **SPACE / Click Restart** — Restart after game over

### Customization
Game assets are located in [`frontend/public/images/gameimage/`](frontend/public/images/gameimage/):
- `super.png` — Player sprite
- `crab.png` — Crab enemy
- `turtle.png` — Turtle enemy
- `bg.png` — Background

For full customization guide, see [`frontend/README-404-GAME.md`](frontend/README-404-GAME.md) (if available).

## 🚀 Deploy to Vercel

### Quick Deploy

1. **Push to GitHub** — Ensure your code is in a GitHub repository
2. **Import to Vercel** — Go to [vercel.com](https://vercel.com) and import your project
3. **Configure Settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy** — Vercel will automatically build and deploy

### Vercel Configuration

The project includes two `vercel.json` files:

- **Root [`vercel.json`](vercel.json)** — Redirects all routes to `/frontend` for SPA routing
- **Frontend [`frontend/vercel.json`](frontend/vercel.json)** — Handles SPA fallback to `index.html` for client-side routing

This ensures the 404 page (when enabled) and all routes work correctly.

### Environment Variables

No environment variables required for basic deployment. If using EmailJS, the credentials are already in the code (consider using Vercel environment variables for production).

## 🎬 Intro Sequence & Audio

The portfolio features a two-part cinematic intro (both optional, can be disabled):

### 1. Genjutsu Start Screen ([`GenjutsuStartScreen.jsx`](frontend/src/components/ui/GenjutsuStartScreen.jsx:1))
- Black screen with floating red/purple particles and smoke wisps
- Animated **Sharingan** (left) and **Rinnegan** (right) eyes
- Chakra beam connecting both eyes
- "Awaken your Dōjutsu" subtitle
- Pulsing button with black flame accents
- On click: screen shake → transition to Mangekyō intro

### 2. Mangekyō Intro ([`MangekyoIntro.jsx`](frontend/src/components/ui/MangekyoIntro.jsx:1))
- Pure black screen with subtle red ambient glow
- Cinematic eyelid opening animation (GSAP)
- Reveals a single Mangekyō Sharingan eye
- Authentic *Mangekyō Sharingan* sound effect
- Smooth fade-out transition to main portfolio

### Optional: Loading Screen ([`LoadingScreen.jsx`](frontend/src/LoadingScreen.jsx:1))
- Cinematic Sharingan loading screen with progress bar
- Eyelid opening animation
- Rotating tomoe patterns
- Red warp flash exit
- **Currently disabled** in [`App.jsx`](frontend/src/App.jsx:19)

### Audio Files
- [`frontend/public/audio/home-page.mp3`](frontend/public/audio/home-page.mp3) — Hero section background music (loops)
- [`frontend/public/audio/Mangekyou-Sharingan.mp3`](frontend/public/audio/Mangekyou-Sharingan.mp3) — Mangekyō intro sound effect

> **Note:** Audio requires user interaction (click) to autoplay due to browser policies. Volume fades in/out smoothly.

## 🤝 Customization Tips

- **Colors**: Modify Sharingan red (`#cc2222`) and Rinnegan purple (`#7b2fff`) in the CSS theme
- **Fonts**: Add/change Google Fonts in [`index.html`](frontend/index.html:15)
- **Intro**: Disable intro sequences by commenting out components in [`App.jsx`](frontend/src/App.jsx:55)
- **Audio**: Replace audio files in `frontend/public/audio/` with your own (same filenames)
- **Cursor**: Adjust `ChakraTrailCursor` particle count in its component file

## 📄 License

This project is for personal use and educational purposes.

## 👤 Author

**Gunasekar D** — Full Stack Developer
- 📍 BTM, Bengaluru, Karnataka, India
- 📧 [gunasekar0223@gmail.com](mailto:gunasekar0223@gmail.com)
- 🐙 [GitHub](https://github.com/guna0223)
- 💼 [LinkedIn](https://www.linkedin.com/in/gunasekar0223/)
- 🕸️ [Portfolio](https://portfolio-guna.vercel.app/)

---

⭐ **Star this repo if you found it helpful!**

Built with ⚡ chakra energy and Naruto nostalgia
