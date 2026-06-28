import gameSellingImg from '../assets/images/project-img/gameselling.png';
import whatsapp from '../assets/images/project-img/whatapp.png';
import portfolioImg from '../assets/images/project-img/portfolio.png';
import weatherImg from '../assets/images/project-img/weather.png';
import movie from '../assets/images/project-img/movie.png';
import shopping from '../assets/images/project-img/shopping.png';
import game from '../assets/images/project-img/game.png';
import cricketImg from '../assets/images/project-img/cricketImg.png';
import nithishMakeupImg from '../assets/images/project-img/nithishMakeupImg.png';

export const personalInfo = {
  name: 'Gunasekar',
  lastName: 'D',
  title: ' Full Stack Developer || Creative Developer ',
  roles: [
    'Full Stack Developer',
    'Frontend Developer',
    'backend Developer',
    'Web Developer',
    'React Developer',
  ],
  bio: `I'm a passionate Full-Stack Developer specializing in building exceptional digital experiences. With expertise in Python, Django, React, and modern frontend technologies, I craft clean, responsive, and scalable web applications that push the boundaries of what's possible on the web.`,
  location: 'Bengaluru, Karnataka, India',
  email: 'gunasekar0223@gmail.com',
  resumeUrl: '/resume/Gunasekar_Resume.pdf',
  social: {
    github: 'https://github.com/guna0223',
    linkedin: 'https://www.linkedin.com/in/gunasekar0223/',
    whatsapp: 'https://web.whatsapp.com/',
    email: 'mailto:gunasekar0223@gmail.com',
  },
};

export const stats = [
  { label: 'Projects Completed', value: '10+' },
  { label: 'Technologies', value: '12+' },
  { label: 'GitHub Repos', value: '20+' },
  { label: 'Lines of Code', value: '50K+' },
];

export const skills = {
  frontend: [
    { name: 'HTML5', proficiency: 95, color: '#e34c26' },
    { name: 'CSS3', proficiency: 90, color: '#264de4' },
    { name: 'JavaScript', proficiency: 85, color: '#f0db4f' },
    { name: 'React', proficiency: 85, color: '#61dafb' },
    // { name: 'Tailwind CSS', proficiency: 80, color: '#38bdf8' },
  ],
  backend: [
    { name: 'Python', proficiency: 90, color: '#306998' },
    { name: 'Django', proficiency: 85, color: '#092e20' },
    { name: 'REST APIs', proficiency: 80, color: '#00d4ff' },
    { name: 'node.js', proficiency: 60, color: '#f0db4f' },

  ],
  database: [
    { name: 'MySQL', proficiency: 85, color: '#00758f' },
    { name: 'SQL', proficiency: 80, color: '#e48e00' },
    { name: 'mongodb', proficiency: 75, color: '#4ea82c' },
  ],
  tools: [
    { name: 'Git', proficiency: 90, color: '#f05032' },
    { name: 'GitHub', proficiency: 90, color: '#ffffff' },
    { name: 'VS Code', proficiency: 95, color: '#007acc' },
    { name: 'Vite', proficiency: 85, color: '#646cff' },

  ],
  aitools: [
    { name: 'ChatGPT', proficiency: 95, color: '#74aa9c' },
    { name: 'Claude AI', proficiency: 90, color: '#d97757' },
    { name: 'Cursor AI', proficiency: 88, color: '#ffffff' },
    { name: 'gemini', proficiency: 88, color: '#00d4ff' },

  ],
};

export const projects = [
  {
    id: 1,
    title: 'Game Store — Django',
    image: gameSellingImg,
    description:
      'A full-stack game selling web application built with Django framework. Features include secure user authentication, comprehensive product catalog management, shopping cart functionality, order processing, and admin dashboard for inventory management.',
    tech: ['Django', 'Python', 'PostgreSQL', 'HTML/CSS'],
    link: "https://django-game-4ifu.onrender.com/",
    github: 'https://github.com/guna0223/Django-Game',
    featured: false,
  },
  {
    id: 2,
    title: 'VEXO — E-Commerce App',
    image: shopping,
    description:
      'A modern and fully responsive e-commerce web application built with React. Features include dynamic product listings with FakeStore API integration, advanced filtering by category and price, real-time search functionality, persistent wishlist and shopping cart features, and a seamless checkout experience.',
    tech: ['React', 'REST API', 'CSS3', 'Context API'],
    link: 'https://react-ecommerce-fxed.vercel.app/',
    github: 'https://github.com/guna0223/React-Ecommerce',
    featured: false,
  },
  {
    id: 3,
    title: 'Retro Game Vault',
    image: game,
    description:
      'A nostalgic retro arcade gaming platform featuring classic games through EmulatorJS. Includes multiple game ROMs, smooth emulation, save states, and authentic retro aesthetics with a modern cyberpunk interface.',
    tech: ['React', 'EmulatorJS', 'WebAssembly', 'CSS3'],
    link: 'https://retro-game-three.vercel.app/',
    github: 'https://github.com/guna0223/retro-game',
    featured: false,
  },
  {
    id: 4,
    title: 'Movie Explorer',
    image: movie,
    description:
      'A feature-rich movie browsing application built with React and TMDB API. Offers real-time search, detailed movie information pages with cast, crew, trailers and reviews, favorite/wishlist management, trending movies section, and genre-based filtering.',
    tech: ['React', 'Context API', 'TMDB API', 'CSS3'],
    link: 'https://movie-project-omega-tawny.vercel.app/',
    github: 'https://github.com/guna0223/movie-project',
    featured: false,
  },
  {
    id: 5,
    title: 'Portfolio Website',
    image: portfolioImg,
    description:
      'A modern, responsive portfolio built with React focused on performance, accessibility, and clean UI. Features smooth scroll navigation, responsive design for all devices, SEO optimization, interactive animations, and a unique retro arcade-style loading screen.',
    tech: ['React', 'JavaScript', 'CSS3', 'Vite'],
    link: 'https://portfolio-guna.vercel.app/',
    github: 'https://github.com/guna0223/portfolio',
    featured: false,
  },

  {
    id: 6,
    title: 'WhatsApp UI Clone',
    image: whatsapp,
    description:
      'A pixel-perfect responsive WhatsApp UI clone built with React. Features include a complete chat list sidebar with search, message conversations with timestamps, online status indicators, typing indicators, and dynamic data rendering from JSON.',
    tech: ['React', 'JavaScript', 'JSON', 'CSS3'],
    link: 'https://whatsapp-ui-ten.vercel.app/',
    github: 'https://github.com/guna0223/whatsapp-ui',
    featured: false,
  },
  {
    id: 7,
    title: 'Weather Dashboard',
    image: weatherImg,
    description:
      'An interactive and user-friendly weather dashboard featuring location-based forecasts using geolocation API, current weather conditions with detailed metrics, 7-day forecast predictions, interactive weather maps, and historical data visualization charts.',
    tech: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
    link: 'https://weather-dashbord-seven.vercel.app/',
    github: 'https://github.com/guna0223/weather-dashbord',
    featured: false,
  },


];

export const services = [
  {
    id: 1,
    icon: 'Code',
    title: 'Web Development',
    description:
      'Building responsive & modern websites using cutting-edge technologies. From concept to deployment — making digital dreams reality.',
    features: ['Responsive Design', 'Performance Optimized', 'SEO Friendly'],
  },
  {
    id: 2,
    icon: 'Palette',
    title: 'Frontend Development',
    description:
      'Creating clean, interactive & user-friendly interfaces with HTML, CSS, JavaScript & React.',
    features: ['Modern UI', 'Reusable Components', 'Cross-Browser'],
  },
  {
    id: 3,
    icon: 'Database',
    title: 'Backend Development',
    description:
      'Developing secure & scalable backend systems using Python and Django, with authentication & APIs.',
    features: ['Django & REST APIs', 'Authentication', 'Database Design'],
  },
  {
    id: 4,
    icon: 'Layers',
    title: 'Full Stack Solutions',
    description:
      'End-to-end application development combining frontend and backend technologies for complete solutions.',
    features: ['Frontend + Backend', 'API Integration', 'Deployment Ready'],
  },
];

export const experience = [
  {
    id: 1,
    type: 'work',
    title: 'Full Stack Developer Intern',
    organization: 'Draptor Technologies',
    period: '02/03/2026 - 02/06/2026',
    description:
      'Worked as a Full Stack Developer Intern on a property rental-based platform',
    certificateUrl: '/certificate/Gunasekar_intern_certificate.pdf',
    liveUrl: 'https://badigemane.com/',
  },
  {
    id: 2,
    type: 'project',
    title: 'Full-Stack Development',
    organization: 'Self-Directed',
    period: '2025 - Present',
    description: 'Building production-level web applications with React, Django, and modern tooling.',
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Open Source Contributor',
    organization: 'GitHub',
    period: '2025 - Present',
    description: 'Active contributor with 10+ public repositories and growing community engagement.',
  },
];

export const contactInfo = {
  email: 'gunasekar0223@gmail.com',
  location: 'Bengaluru, Karnataka, India',
  mapsUrl: 'https://maps.google.com/?q=Bengaluru,+Karnataka,+India',
  linkedin: 'linkedin.com/in/gunasekar0223',
  whatsapp: '+91 9486436037',
};

export const clientProjects = [
    {
    id: 1,
    title: 'Nithish MakeOver Artistry',
    image: nithishMakeupImg,
    description:
      'A professional portfolio and service showcase website built for a makeup artist. Features include a curated gallery of bridal and party looks, a services section with detailed offerings, client testimonials, and a contact/booking form. Designed with a clean, elegant aesthetic to reflect the artist\'s brand and attract potential clients.',
    tech: ['React.js', 'CSS3', 'Vercel'],
    link: 'https://nithish-makeup.vercel.app/',
    featured: false,
  },
  {
    title: 'Cricket Tournament Manager',
    image: cricketImg,
    description:
      'A full-stack live cricket scoring platform built with the MERN stack. Features include real-time ball-by-ball scoring with Socket.IO, over history tracking, innings and match lifecycle management, dynamic points table, tournament statistics, and a branded PDF generator for sponsor profiles. Admin panel supports no-ball, wicket, and overthrow workflows via modal-driven scoring controls.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'PDFKit'],
    link: 'https://pcc-pungampatti.vercel.app/',
    featured: false,
  },

];
