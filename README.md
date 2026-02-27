# 🚀 Gunasekar's Portfolio

A retro gaming-themed personal portfolio website built with React and Vite.

![Portfolio Preview](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)

## 🎮 Overview

A unique portfolio with a retro 8-bit/16-bit gaming aesthetic featuring:
- Pixel fonts and terminal-style UI
- Game-inspired sections (Player Profile, Status Screen, Comm Terminal)
- Retro color palette inspired by classic consoles
- Fully responsive design for all devices

## 🛠 Tech Stack

- **Frontend**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **Icons**: Bootstrap Icons & Font Awesome
- **Email**: Web3Forms (Contact Form)

## 📋 Features

### Pages/Sections
- **Home** - Hero section with retro gaming welcome
- **About** - Player profile card with skills and stats
- **Skills** - Status screen with pixel-based skill bars
- **Projects** - Game-style project showcase
- **Services** - Service offerings in terminal style
- **Contact** - Comm terminal with working contact form
- **404 Page** - Custom error page with playable Mario-style mini game

### UI/UX Features
- Responsive design (Mobile, Tablet, Desktop)
- Retro cursor styling
- Pixel-art aesthetic
- Smooth transitions
- SEO-friendly markup

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
│   │   └── resume/
│   │       └── Gunasekar_Resume.pdf
│   ├── src/
│   │   ├── assets/
│   │   │   ├── AboutImage/
│   │   │   ├── images/
│   │   │   └── resume/
│   │   ├── components/
│   │   │   ├── css/
│   │   │   ├── Footer/
│   │   │   └── Navbar/
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Service.jsx
│   │   │   └── Skills.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── (other root files)
```

## 🎨 Customization

### Color Scheme
Edit CSS variables in `frontend/src/components/css/App.css`:

```css
:root {
    --retro-bg: #0a0a1a;
    --retro-blue: #4a90d9;
    --retro-green: #38b764;
    --retro-yellow: #f8d828;
    /* ... more colors */
}
```

### Fonts
The portfolio uses:
- **Press Start 2P** (Pixel font)
- **VT323** (Terminal font)

## 📧 Contact Form

The contact form uses Web3Forms. To configure:
1. Get a free access key from [web3forms.com](https://web3forms.com)
2. Replace the access key in `frontend/src/pages/Contact.jsx`

## 🎮 404 Page - Mini Game

The portfolio features a custom 404 error page with a playable Super Mario-style endless runner game!

### How to Play
- **SPACE** - Jump to avoid enemies
- **SPACE** (after game over) - Restart game
- **Click Restart** - Restart game

### Game Features
- 🦀 Crab enemies (fast, small)
- 🐢 Turtle enemies (slow, larger)
- ☁️ Animated clouds
- 🌊 Scrolling ground
- 💯 Score system (+1 for each enemy jumped over)
- 🔄 Works offline

### Adding Custom Images

To replace default graphics with your own sprites, add images to:
```
frontend/public/images/gameimage/
```

Required files:
| File | Description |
|------|-------------|
| `super.png` | Player character |
| `crab.png` | Crab enemy |
| `turtle.png` | Turtle enemy |
| `bg.png` | Background |
| `ground.png` | Ground texture |

Then update paths in `frontend/src/pages/NotFound.jsx`.

For detailed customization, see [README-404-GAME.md](frontend/README-404-GAME.md).

## 🚀 Deploy to Vercel

To deploy to Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. Or connect your GitHub repository to Vercel
3. Make sure `vercel.json` is in the root of your deployed project

The `vercel.json` file in `frontend/` handles SPA routing - it redirects all requests to `index.html` so the 404 page works correctly.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

This project is for personal use. 

## 👤 Author

**Gunasekar D**
- Location: BTM, Bengaluru, Karnataka, India
- Email: gunasekar0223@gmail.com

---

⭐ Star this repo if you found it helpful!

Built with ❤️ and retro gaming nostalgia
