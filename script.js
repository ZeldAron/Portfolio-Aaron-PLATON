const storageKey = 'portfolio-theme';
const themeToggles = Array.from(document.querySelectorAll('.theme-toggle'));
const settingsButton = document.querySelector('.settings-button');
const settingsPanel = document.querySelector('.settings-panel');
const settingsClose = document.querySelector('.settings-close');

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem(storageKey, theme);

  themeToggles.forEach((toggle) => {
    const icon = toggle.querySelector('.theme-icon');
    const label = toggle.querySelector('.theme-label');
    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    if (label) {
      label.textContent = theme === 'dark' ? 'Mode sombre' : 'Mode clair';
    }
  });
};

const initTheme = () => {
  const saved = localStorage.getItem(storageKey);
  const initialTheme = saved === 'light' ? 'light' : 'dark';
  setTheme(initialTheme);
};

const toggleSettings = () => {
  if (!settingsPanel) return;
  const isOpen = settingsPanel.classList.toggle('open');
  settingsPanel.setAttribute('aria-hidden', String(!isOpen));
};

settingsButton?.addEventListener('click', () => {
  toggleSettings();
});

settingsClose?.addEventListener('click', () => {
  toggleSettings();
});

settingsPanel?.addEventListener('click', (event) => {
  event.stopPropagation();
});

document.addEventListener('click', (event) => {
  if (!settingsPanel || !settingsButton) return;
  if (!settingsPanel.classList.contains('open')) return;
  if (settingsPanel.contains(event.target) || settingsButton.contains(event.target)) return;
  settingsPanel.classList.remove('open');
  settingsPanel.setAttribute('aria-hidden', 'true');
});

themeToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
});

const customCursor = document.createElement('div');
customCursor.className = 'cursor';
document.body.appendChild(customCursor);

document.addEventListener('mousemove', (event) => {
  customCursor.style.left = `${event.clientX}px`;
  customCursor.style.top = `${event.clientY}px`;
});

document.addEventListener('mousedown', () => {
  customCursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
  customCursor.classList.remove('active');
});

initTheme();

// Auto-hide header on scroll
const header = document.querySelector('.site-header');
let lastScrollTop = 0;
let isHeaderVisible = true;

const handleHeaderScroll = () => {
  const scrollTop = window.scrollY;
  
  // Si on scroll vers le bas
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Masquer le header
    if (isHeaderVisible) {
      header.classList.add('hidden');
      isHeaderVisible = false;
    }
  } 
  // Si on scroll vers le haut
  else {
    // Afficher le header
    if (!isHeaderVisible) {
      header.classList.remove('hidden');
      isHeaderVisible = true;
    }
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

window.addEventListener('scroll', handleHeaderScroll, false);

// Générer les particules animées sur la page d'accueil
const particlesContainer = document.querySelector('.particles');
if (particlesContainer) {
  const createParticles = () => {
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      const duration = 12 + Math.random() * 18;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      particle.style.animation = `particle-float ${duration}s linear infinite`;
      particle.style.animationDelay = Math.random() * -30 + 's';
      
      particlesContainer.appendChild(particle);
    }
  };
  
  createParticles();
}

// Animation du texte du hero au scroll
const observeHeroText = () => {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  
  if (heroTitle && heroSubtitle) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(heroTitle);
    observer.observe(heroSubtitle);
  }
};

observeHeroText();

// Animation au scroll pour les cartes de compétences
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Observer les cartes de compétences et autres
document.querySelectorAll('.skill-card, .about-card, .project-card, .hobby-card').forEach(card => {
  observer.observe(card);
});
