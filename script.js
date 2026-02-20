/* ==========================================
   script.js – JIT Computer Engineering Site
   ========================================== */

// ---- CAROUSEL ----
const slides      = document.querySelectorAll('.slide');
const dotsWrapper = document.getElementById('carouselDots');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');
let current  = 0;
let autoPlay = null;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsWrapper.appendChild(dot);
});

const dots = dotsWrapper.querySelectorAll('.dot');

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });
prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });

function startAutoPlay() {
  autoPlay = setInterval(next, 4000);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}

startAutoPlay();

// Pause autoplay on hover
const carouselWrapper = document.querySelector('.carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
carouselWrapper.addEventListener('mouseleave', startAutoPlay);


// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked (mobile)
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});


// ---- ACTIVE NAV ON SCROLL ----
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 90;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });


// ---- NAVBAR SCROLL SHADOW ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(0,0,0,0.35)'
    : 'none';
}, { passive: true });


// ---- SCROLL REVEAL (Intersection Observer) ----
const revealTargets = document.querySelectorAll(
  '.staff-card, .comp-card, .winner-card, .showcase-card, .mission-card, .stat-box, .strength-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', 'translateY(0)');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = (el.style.transform || '') + ' translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-bottom-color 0.3s ease, border-left-color 0.3s ease, background 0.3s ease, color 0.3s ease';
  observer.observe(el);
});
