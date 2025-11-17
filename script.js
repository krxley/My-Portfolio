// Group-2 Portfolio Main Script
// -------------------------------------------------------------
// This JavaScript file adds interactivity, animations, and dynamic behavior
// to the Group-2 Portfolio website. It enhances user experience with smooth
// scrolling, fade-in effects, theme toggles, form validation, and responsive
// navigation.
// -------------------------------------------------------------

// ============================ GLOBAL VARIABLES ============================
const navbar = document.querySelector('header.site-header');
const fadeElements = document.querySelectorAll('[data-animate]');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('.contact-form');

let darkMode = true;

// ============================ HELPER FUNCTIONS ============================

// Throttle function for scroll performance
function throttle(fn, wait) {
  let time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

// Check if an element is visible in viewport
function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
  );
}

// ============================ NAVIGATION ============================

window.addEventListener('scroll', throttle(() => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, 200));

// Mobile Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ============================ SCROLL ANIMATIONS ============================

function handleScrollAnimations() {
  fadeElements.forEach(el => {
    if (isInView(el)) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', throttle(handleScrollAnimations, 200));
window.addEventListener('load', handleScrollAnimations);

// ============================ THEME TOGGLE ============================

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('light-mode', !darkMode);
    themeToggle.innerHTML = darkMode ? '🌙' : '☀️';
  });
}

// ============================ CONTACT FORM ============================

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        valid = false;
      } else {
        input.style.borderColor = 'var(--accent)';
      }
    });

    if (valid) {
      alert('Message sent successfully!');
      this.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// ============================ PARALLAX EFFECT ============================

window.addEventListener('scroll', throttle(() => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = el.getAttribute('data-speed') || 0.3;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
}, 10));

// ============================ BACK TO TOP BUTTON ============================

const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '⬆';
document.body.appendChild(backToTop);

window.addEventListener('scroll', throttle(() => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}, 150));

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================ TYPING EFFECT ============================

const typingText = document.querySelector('.typing');
if (typingText) {
  const text = typingText.getAttribute('data-text') || 'Welcome to our Portfolio';
  let i = 0;
  function type() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  type();
}

// ============================ STAGGER ANIMATION ============================

function staggerAnimation() {
  const sections = document.querySelectorAll('.stagger');
  sections.forEach(section => {
    const children = section.querySelectorAll('.card');
    children.forEach((child, index) => {
      setTimeout(() => {
        if (isInView(child)) child.classList.add('visible');
      }, index * 150);
    });
  });
}

window.addEventListener('scroll', throttle(staggerAnimation, 200));
window.addEventListener('load', staggerAnimation);

// ============================ RANDOM COLOR HOVER ============================

const skillBadges = document.querySelectorAll('.skill-badge');
skillBadges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.background = 'var(--glass)';
  });
});

// ============================ INTERSECTION OBSERVER ============================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
});

document.querySelectorAll('.observe').forEach(el => observer.observe(el));

// ============================ RANDOM QUOTE GENERATOR ============================

const quotes = [
  'Design is intelligence made visible. – Alina Wheeler',
  'The details are not the details. They make the design. – Charles Eames',
  'Good design is obvious. Great design is transparent. – Joe Sparano',
  'Simplicity is the ultimate sophistication. – Leonardo da Vinci',
  'People ignore design that ignores people. – Frank Chimero'
];

const quoteBox = document.querySelector('.quote-box');
if (quoteBox) {
  function newQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = quotes[random];
  }
  newQuote();
  setInterval(newQuote, 8000);
}

// ============================ LOCAL STORAGE ============================

if (themeToggle) {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    darkMode = false;
  }
  themeToggle.addEventListener('click', () => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  });
}

// ============================ DYNAMIC YEAR ============================

const yearEl = document.querySelector('.year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================ CURSOR EFFECT ============================

const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ============================ RANDOM BACKGROUND COLOR ============================

const colorBtn = document.getElementById('color-btn');
if (colorBtn) {
  colorBtn.addEventListener('click', () => {
    document.body.style.background = `linear-gradient(180deg, hsl(${Math.random()*360}, 40%, 15%), hsl(${Math.random()*360}, 40%, 10%) 120%)`;
  });
}

// This extended JavaScript file adds more interactivity, transitions, and
// dynamic visual effects for an engaging and professional portfolio website.
// ---------------------------------------------------------------------------

// ============================ GLOBAL SELECTORS ============================
const header = document.querySelector('header.site-header');
const sections = document.querySelectorAll('section');
const progressBars = document.querySelectorAll('.progress-bar');
const observerTargets = document.querySelectorAll('.observe');
const counters = document.querySelectorAll('.counter');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// ============================ UTILITIES ============================
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function scrollToSection(id) {
  const target = document.querySelector(id);
  if (target) {
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  }
}

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
}

// ============================ NAVIGATION SCROLL ============================
window.addEventListener('scroll', debounce(() => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}, 100));

// Active link highlight
function setActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  document.querySelectorAll('.nav-links a')[index].classList.add('active');
}
window.addEventListener('scroll', setActiveLink);

// ============================ PROGRESS BAR ANIMATION ============================
function animateProgressBars() {
  progressBars.forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight) {
      const value = bar.dataset.value;
      bar.style.width = value + '%';
    }
  });
}
window.addEventListener('scroll', debounce(animateProgressBars, 100));

// ============================ COUNTER ANIMATION ============================
function animateCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = 100;
      const increment = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    if (isInView(counter)) updateCount();
  });
}
window.addEventListener('scroll', debounce(animateCounters, 100));

// ============================ MODAL FUNCTIONALITY ============================
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      overlay.classList.add('show');
    }
  });
});

overlay.addEventListener('click', () => {
  modals.forEach(m => m.classList.remove('show'));
  overlay.classList.remove('show');
});

// ============================ TOOLTIP EFFECT ============================
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(item => {
  const tooltip = document.createElement('span');
  tooltip.className = 'tooltip';
  tooltip.textContent = item.getAttribute('data-tooltip');
  item.appendChild(tooltip);
});

// ============================ RANDOM BACKGROUND ANIMATION ============================
const bgCanvas = document.createElement('canvas');
bgCanvas.className = 'bg-animation';
const ctx = bgCanvas.getContext('2d');
document.body.appendChild(bgCanvas);
let particles = [];

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      color: randomColor()
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > window.innerWidth) p.speedX *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.speedY *= -1;
  });
  requestAnimationFrame(drawParticles);
}

function resizeCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  initParticles();
}

resizeCanvas();
drawParticles();
window.addEventListener('resize', resizeCanvas);

// ============================ SCROLL REVEAL ============================
const scrollElements = document.querySelectorAll('.scroll-reveal');
const revealOnScroll = () => {
  scrollElements.forEach(el => {
    if (isInView(el)) el.classList.add('revealed');
  });
};
window.addEventListener('scroll', debounce(revealOnScroll, 100));
window.addEventListener('load', revealOnScroll);

// ============================ INTERACTIVE CURSOR ============================
const cursor = document.createElement('div');
cursor.className = 'interactive-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Ripple effect
const buttons = document.querySelectorAll('button, .btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = e.offsetX + 'px';
    ripple.style.top = e.offsetY + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================ IMAGE SLIDER ============================
const sliders = document.querySelectorAll('.slider');
sliders.forEach(slider => {
  const slides = slider.querySelectorAll('img');
  let index = 0;
  setInterval(() => {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    index = (index + 1) % slides.length;
  }, 4000);
});

// ============================ RANDOM QUOTE REFRESH ============================
const quoteBox = document.querySelector('.quote-box');
const quotes = [
  'Code is like humor. When you have to explain it, it’s bad.',
  'Programs must be written for people to read.',
  'Simplicity is the soul of efficiency.',
  'Innovation distinguishes between a leader and a follower.',
  'First, solve the problem. Then, write the code.'
];

if (quoteBox) {
  function showQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = q;
  }
  showQuote();
  setInterval(showQuote, 10000);
}

// ============================ NOTIFICATION TOAST ============================
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Example trigger
setTimeout(() => showToast('Welcome to Group-2 Portfolio!'), 1500);

// ============================ INTERACTIVE TABS ============================
const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabTarget = btn.dataset.tab;
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tabTarget).classList.add('active');
  });
});

/* ============================ GLOBAL SELECTORS ============================ */
const header = document.querySelector('header.site-header');
const sections = document.querySelectorAll('section');
const progressBars = document.querySelectorAll('.progress-bar');
const observerTargets = document.querySelectorAll('.observe');
const counters = document.querySelectorAll('.counter');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);
const projectList = document.querySelector('.portfolio-grid');
const projectSearch = document.getElementById('project-search');

/* ============================ UTILITY HELPERS ============================ */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, wait) {
  let time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function isInView(el, offset = 0.9) {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * offset;
}

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
}

function supportsServiceWorker() {
  return 'serviceWorker' in navigator;
}

/* ============================ NAVBAR / SCROLL ============================ */
window.addEventListener('scroll', debounce(() => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}, 100));

function setActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 120 < sections[index].offsetTop) {}
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  const links = document.querySelectorAll('.nav-links a');
  if (links[index]) links[index].classList.add('active');
}
window.addEventListener('scroll', throttle(setActiveLink, 150));

/* ============================ PROGRESS BARS ============================ */
function animateProgressBars() {
  progressBars.forEach(bar => {
    if (isInView(bar)) {
      const value = bar.dataset.value || 0;
      bar.style.width = value + '%';
      bar.setAttribute('aria-valuenow', value);
    }
  });
}
window.addEventListener('scroll', debounce(animateProgressBars, 120));
window.addEventListener('load', animateProgressBars);

/* ============================ COUNTERS / STATS ============================ */
function animateCounters() {
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    if (!isInView(counter)) return;
    const target = +counter.getAttribute('data-target') || 0;
    const duration = +counter.getAttribute('data-duration') || 1200; // ms
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      counter.innerText = Math.floor(progress * (target - start) + start);
      if (progress < 1) requestAnimationFrame(update);
      else counter.dataset.animated = 'true';
    }
    requestAnimationFrame(update);
  });
}
window.addEventListener('scroll', throttle(animateCounters, 120));
window.addEventListener('load', animateCounters);

/* ============================ MODALS + FOCUS TRAP ============================ */
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = trigger.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) openModal(modal);
  });
});

function openModal(modal) {
  modal.classList.add('show');
  overlay.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  const focusable = modal.querySelectorAll('a,button,input,textarea,select');
  if (focusable.length) focusable[0].focus();
  trapFocus(modal);
}

function closeModal(modal) {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  releaseFocus();
}

overlay.addEventListener('click', () => {
  document.querySelectorAll('.modal.show').forEach(m => closeModal(m));
});

let lastFocusedElement = null;
function trapFocus(modal) {
  lastFocusedElement = document.activeElement;
  const focusable = Array.from(modal.querySelectorAll('a,button,input,textarea,select')).filter(Boolean);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function handleKey(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  }
  modal.addEventListener('keydown', handleKey);
  modal.dataset.keyListener = 'true';
}

function releaseFocus() {
  if (lastFocusedElement) lastFocusedElement.focus();
  document.querySelectorAll('.modal').forEach(m => {
    if (m.dataset.keyListener) {
      m.removeEventListener('keydown', () => {});
      delete m.dataset.keyListener;
    }
  });
}

/* ============================ TOOLTIP SETUP ============================ */
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(item => {
  const tooltip = document.createElement('span');
  tooltip.className = 'tooltip';
  tooltip.textContent = item.getAttribute('data-tooltip');
  tooltip.setAttribute('role', 'tooltip');
  item.appendChild(tooltip);
  item.addEventListener('mouseenter', () => tooltip.classList.add('visible'));
  item.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
});

/* ============================ BACKGROUND PARTICLES (CANVAS) ============================ */
const bgCanvas = document.createElement('canvas');
bgCanvas.className = 'bg-animation';
const ctx = bgCanvas.getContext && bgCanvas.getContext('2d');
if (ctx) {
  document.body.appendChild(bgCanvas);
  let particles = [];
  function initParticles() {
    particles = [];
    const count = Math.round((window.innerWidth * window.innerHeight) / 9000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        color: `rgba(255,255,255,${Math.random() * 0.08 + 0.02})`
      });
    }
  }
  function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < -10) p.x = window.innerWidth + 10;
      if (p.x > window.innerWidth + 10) p.x = -10;
      if (p.y < -10) p.y = window.innerHeight + 10;
      if (p.y > window.innerHeight + 10) p.y = -10;
    });
    requestAnimationFrame(drawParticles);
  }
  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    initParticles();
  }
  resizeCanvas();
  drawParticles();
  window.addEventListener('resize', debounce(resizeCanvas, 250));
}

/* ============================ SCROLL REVEAL / STAGGER ============================ */
const scrollElements = document.querySelectorAll('[data-animate]');
function revealOnScroll() {
  scrollElements.forEach((el, idx) => {
    if (isInView(el, 0.85) && !el.classList.contains('visible')) {
      setTimeout(() => el.classList.add('visible'), idx * 80);
    }
  });
}
window.addEventListener('scroll', throttle(revealOnScroll, 150));
window.addEventListener('load', revealOnScroll);

/* ============================ CURSOR + INTERACTIONS ============================ */
const cursor = document.createElement('div');
cursor.className = 'interactive-cursor';
cursor.setAttribute('aria-hidden', 'true');
document.body.appendChild(cursor);
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* Ripple click effect */
const buttons = document.querySelectorAll('button, .btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* ============================ IMAGE LAZY LOADING ============================ */
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '50px 0px', threshold: 0.01 });
  lazyImages.forEach(img => imgObserver.observe(img));
} else {
  // Fallback
  lazyImages.forEach(img => (img.src = img.dataset.src));
}

/* ============================ PROJECT LOADING + SEARCH FILTER ============================ */
// Example local dataset (could be fetched from an API)
const projectsData = [
  { id: 1, title: 'Portfolio Website', tags: ['Frontend', 'Design'], img: 'https://picsum.photos/seed/1/600/400' },
  { id: 2, title: 'E-commerce App', tags: ['Fullstack'], img: 'https://picsum.photos/seed/2/600/400' },
  { id: 3, title: 'Dashboard UI', tags: ['Frontend', 'UI'], img: 'https://picsum.photos/seed/3/600/400' },
  { id: 4, title: 'API Service', tags: ['Backend'], img: 'https://picsum.photos/seed/4/600/400' },
  { id: 5, title: 'Mobile App', tags: ['Mobile', 'Flutter'], img: 'https://picsum.photos/seed/5/600/400' }
];

function renderProjects(list = projectsData) {
  if (!projectList) return;
  projectList.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-animate', 'left');
    card.innerHTML = `
      <img data-src="${p.img}" alt="${p.title}" class="lazy">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p class="text-muted">${p.tags.join(' • ')}</p>
        <a href="#" class="btn" data-modal="modal-${p.id}">View</a>
      </div>
    `;
    projectList.appendChild(card);
  });
  // Re-init lazy images and reveal
  const imgs = projectList.querySelectorAll('img[data-src]');
  imgs.forEach(img => imgObserver && imgObserver.observe(img));
  revealOnScroll();
}

renderProjects();

if (projectSearch) {
  projectSearch.addEventListener('input', debounce((e) => {
    const q = e.target.value.toLowerCase();
    const filtered = projectsData.filter(p => p.title.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q));
    renderProjects(filtered);
  }, 250));
}

/* ============================ CONTACT FORM + HONEYPOT + SAVE ============================ */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const honeypot = contactForm.querySelector('input[name="hp"]');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // spam protection
    if (honeypot && honeypot.value) {
      showToast('Spam detected — form aborted.');
      return;
    }
    const data = new FormData(contactForm);
    const obj = {};
    for (const [k, v] of data.entries()) obj[k] = v;
    // Save to local storage as a fallback
    localStorage.setItem('contactDraft', JSON.stringify(obj));
    showToast('Message queued (demo).');
    contactForm.reset();
  });
}

/* ============================ SERVICE WORKER (PWA) REGISTRATION ============================ */
if (supportsServiceWorker()) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('SW registered', reg);
  }).catch(err => {
    console.warn('SW registration failed:', err);
  });
}

/* ============================ ACCESSIBILITY: KEYBOARD SHORTCUTS ============================ */
window.addEventListener('keydown', (e) => {
  if (e.key === 't') {
    // toggle theme
    document.body.classList.toggle('light-mode');
    showToast('Theme toggled');
  }
  if (e.key === '/' && projectSearch) {
    e.preventDefault();
    projectSearch.focus();
  }
  if (e.key === 'k' && document.activeElement !== projectSearch) {
    // quick focus on first nav link
    const firstLink = document.querySelector('.nav-links a');
    if (firstLink) firstLink.focus();
  }
});

/* ============================ DOWNLOAD RESUME (GENERATED PDF) ============================ */
function downloadResume() {
  const resumeContent = `Name: Group 2\nRole: Developers & Designers\nGenerated: ${new Date().toLocaleString()}`;
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Resume_Group2.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('Resume downloaded (sample).');
}

const resumeBtn = document.getElementById('download-resume');
if (resumeBtn) resumeBtn.addEventListener('click', downloadResume);

/* ============================ SAVING DRAFTS + AUTO-RESTORE ============================ */
(function restoreDrafts() {
  const draft = localStorage.getItem('contactDraft');
  if (!draft) return;
  const data = JSON.parse(draft);
  const form = document.querySelector('.contact-form');
  if (!form) return;
  Object.keys(data).forEach(k => {
    const field = form.querySelector(`[name="${k}"]`);
    if (field) field.value = data[k];
  });
  showToast('Restored unsent message draft');
})();

/* ============================ PREFERS-REDUCED-MOTION HANDLING ============================ */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReduced.matches) {
  // disable particle animation and transitions
  const p = document.querySelector('.bg-animation');
  if (p) p.style.display = 'none';
  document.body.classList.add('reduced-motion');
}

/* ============================ ANALYTICS STUB (NO TRACKING) ============================ */
function analytics(event, details = {}) {
  // Placeholder — push to dataLayer or external analytics endpoint
  console.log('ANALYTICS', event, details);
}

/* ============================ LAZY INIT FOR NON-CRITICAL SCRIPTS ============================ */
setTimeout(() => {
  // initialize optional modules
  analytics('site_loaded');
  // re-run reveal to ensure dynamic content is animated
  revealOnScroll();
  animateProgressBars();
  animateCounters();
}, 900);

/* ============================ CLEANUP ON UNLOAD ============================ */
window.addEventListener('beforeunload', () => {
  // save any important state
  try {
    const active = document.querySelector('.stagger .card.visible');
    if (active) localStorage.setItem('lastActiveCard', active.querySelector('h3')?.innerText || '');
  } catch (err) {
    // ignore
  }
});

/* ============================ EXPORT: small API for site to call ============================ */
window.G2 = {
  openModalById: (id) => {
    const m = document.getElementById(id);
    if (m) openModal(m);
  },
  downloadResume,
  showToast,
  analytics
};

/* ============================ FINAL NOTES ============================ */
// This file is intentionally feature-rich to demonstrate many UI patterns.
// Remove or disable components you don't need to keep the footprint small.
// All functions avoid throwing errors silently — use console logs to debug.

// End of file — Group-2 Portfolio Extended JS
// ---------------------------------------------------------------------------

