// portfolio.js - Script principal pour le portfolio avec mode sombre

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio chargé avec succès!');
    
    // Initialiser toutes les fonctionnalités
    initNavigation();
    initSmoothScroll();
    initSkillAnimations();
    initProjectFilter();
    initBackToTop();
    initTypewriterEffect();
    initScrollAnimations();
    initDarkMode(); // Mode sombre
    addAnimationStyles();
    
    // NE PAS toucher au formulaire - Flask s'en charge
    console.log('✅ Formulaire géré par Flask');
});

// ==================== MODE SOMBRE SIMPLIFIÉ ====================
function initDarkMode() {
    console.log('Initialisation du mode sombre...');
    
    // Créer le bouton de basculement du mode sombre
    const navbar = document.querySelector('.navbar .container');
    if (!navbar) {
        console.log('Navbar non trouvée');
        return;
    }
    
    // Vérifier si le bouton existe déjà
    let darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) {
        // Créer le bouton avec uniquement l'icône
        darkModeToggle = document.createElement('button');
        darkModeToggle.id = 'darkModeToggle';
        darkModeToggle.className = 'theme-toggle'; // Utilise la classe CSS existante
        darkModeToggle.setAttribute('aria-label', 'Basculer le mode sombre');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        
        // Insérer le bouton dans la navbar
        navbar.appendChild(darkModeToggle);
        console.log('✅ Bouton mode sombre créé');
    }
    
    // Vérifier la préférence enregistrée
    const savedTheme = localStorage.getItem('theme');
    
    // Appliquer le thème initial
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Ajouter l'événement de clic
    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ==================== NAVIGATION MOBILE ====================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        this.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Fermer le menu au clic en dehors
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// ==================== SCROLL DOUX ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#') return;
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== ANIMATIONS DES COMPÉTENCES ====================
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.getAttribute('data-width') || '0%';
                
                setTimeout(() => {
                    skillLevel.style.transition = 'width 1.5s ease-in-out';
                    skillLevel.style.width = width;
                }, 200);
                
                observer.unobserve(skillLevel);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        const width = bar.style.width || window.getComputedStyle(bar).width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// ==================== FILTRE DES PROJETS ====================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category')?.split(' ') || [];
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== BOUTON RETOUR EN HAUT ====================
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== EFFET MACHINE À ÉCRIRE ====================
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title .greeting');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(heroTitle);
        }
    });
    
    observer.observe(heroTitle);
}

// ==================== ANIMATIONS AU SCROLL ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .project-card, .skill-category, .about-content > div, .hero-content, .hero-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== STYLES D'ANIMATION ====================
function addAnimationStyles() {
    if (document.getElementById('animation-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-in {
            animation: fadeInUp 0.5s ease forwards !important;
        }
        
        .nav-toggle span {
            transition: all 0.3s ease;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .back-to-top {
            transition: opacity 0.3s ease, transform 0.3s ease !important;
        }
        
        .back-to-top.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

