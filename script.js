// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('is-open');
  mobileMenu.classList.toggle('is-open', !isOpen);
  hamburger.setAttribute('aria-expanded', String(!isOpen));
});

// Close mobile menu when a link is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== SMOOTH SCROLL OFFSET (for sticky navbar) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

// ===== ORDER FORM – WhatsApp redirect =====
const orderForm = document.querySelector('.order-form');
orderForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const area = document.getElementById('area').value;
  const perfume = document.getElementById('perfume').value;

  if (!name || !phone || !area) {
    alert('Mohon lengkapi nama, nomor WhatsApp, dan area penjemputan.');
    return;
  }

  const message = encodeURIComponent(
    `Halo FreshLux! 👋\n\nSaya ingin memesan laundry:\n\n` +
    `👤 Nama: ${name}\n` +
    `📍 Area: ${area}\n` +
    `🌸 Parfum: ${perfume || 'Belum dipilih'}\n\n` +
    `Mohon info lebih lanjut. Terima kasih!`
  );

  // Replace with actual WhatsApp business number
  const waNumber = '6281234567890';
  window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
});

// ===== INTERSECTION OBSERVER – fade-in on scroll =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
const animatables = document.querySelectorAll(
  '.feature-card, .step-card, .testimonial-card, .pricing-card, .problem-list li'
);

animatables.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});

// Visible state
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);
