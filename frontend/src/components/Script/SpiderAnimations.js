/**
 * Spider-Man PS1/Arcade Style Animations
 * Retro web-swing inspired interactions
 */

(function() {
    'use strict';

    // ============================================
    // WEB SNAP UNDERLINE FOR NAVIGATION
    // ============================================
    function initWebSnapNav() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Create web line element
            const webLine = document.createElement('span');
            webLine.classList.add('web-line');
            link.appendChild(webLine);
            
            link.addEventListener('mouseenter', () => {
                webLine.style.width = '100%';
            });
            
            link.addEventListener('mouseleave', () => {
                webLine.style.width = '0%';
            });
        });
    }

    // ============================================
    // ELASTIC STRETCH HOVER EFFECT
    // ============================================
    function initElasticHover() {
        const interactiveElements = document.querySelectorAll(
            '.hire-btn, .cta-btn, .about-btn, .dialog-btn, .submit-btn, .pixel-btn, .restart-btn, .social-icon, .tech-item'
        );
        
        interactiveElements.forEach(el => {
            el.classList.add('spider-hover');
        });
    }

    // ============================================
    // WEB SWING MOTION FOR ICONS
    // ============================================
    function initWebSwing() {
        const icons = document.querySelectorAll(
            '.service-icon i, .category-header i, .contact-icon, .brand-symbol, .project-selector'
        );
        
        icons.forEach(icon => {
            icon.classList.add('web-swing');
        });
    }

    // ============================================
    // BUTTON PRESS + RECOIL ANIMATION
    // ============================================
    function initButtonPress() {
        const buttons = document.querySelectorAll(
            '.hire-btn, .cta-btn, .about-btn, .dialog-btn, .submit-btn, .pixel-btn, .restart-btn'
        );
        
        buttons.forEach(btn => {
            btn.classList.add('spider-btn');
        });
    }

    // ============================================
    // CARD LIFT + TILT HOVER
    // ============================================
    function initCardTilt() {
        const cards = document.querySelectorAll(
            '.project-card, .service-card, .skill-category, .stat-box'
        );
        
        cards.forEach((card, index) => {
            card.classList.add('spider-card');
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    function initScrollReveal() {
        const sections = document.querySelectorAll('.section, .home, .about, .skills, .services, .projects, .contact');
        
        // Add initial state
        sections.forEach(section => {
            section.classList.add('spider-section');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('spider-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ============================================
    // CURSOR WEB TRAIL EFFECT
    // ============================================
    function initCursorWeb() {
        // Create web trail element
        const webTrail = document.createElement('div');
        webTrail.classList.add('web-trail');
        document.body.appendChild(webTrail);

        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            webTrail.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            webTrail.style.opacity = '0';
        });

        // Smooth follow with delay
        function animate() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            
            webTrail.style.left = trailX + 'px';
            webTrail.style.top = trailY + 'px';
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // ============================================
    // RETRO GLOW PULSE
    // ============================================
    function initRetroPulse() {
        const importantElements = document.querySelectorAll(
            '.cta-btn, .hero-title .name, .about-title, .section-title'
        );
        
        importantElements.forEach(el => {
            el.classList.add('retro-pulse');
        });
    }

    // ============================================
    // PROJECT SELECTOR BOUNCE
    // ============================================
    function initSelectorBounce() {
        const selectors = document.querySelectorAll('.project-selector');
        
        selectors.forEach(sel => {
            sel.classList.add('selector-bounce');
        });
    }

    // ============================================
    // STAGGERED ENTRY ANIMATION
    // ============================================
    function initStaggeredItems() {
        // For tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.05}s`;
            item.classList.add('stagger-item');
        });
        
        // For stat boxes
        const statBoxes = document.querySelectorAll('.stat-box');
        statBoxes.forEach((box, index) => {
            box.style.animationDelay = `${index * 0.1}s`;
            box.classList.add('stagger-item');
        });
        
        // For project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('stagger-item');
        });
    }

    // ============================================
    // INITIALIZE ALL
    // ============================================
    function init() {
        initWebSnapNav();
        initElasticHover();
        initWebSwing();
        initButtonPress();
        initCardTilt();
        initScrollReveal();
        initRetroPulse();
        initSelectorBounce();
        initStaggeredItems();
        
        // Optional: Uncomment to enable cursor web effect
        // initCursorWeb();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
