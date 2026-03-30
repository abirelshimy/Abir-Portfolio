/* ========================================
   ABIR ELSHIMY — PORTFOLIO JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Scroll Reveal (IntersectionObserver) --- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* --- Sticky Nav Background --- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile Menu Toggle --- */
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Marquee: On mobile merge rows into swipeable list; on desktop duplicate for infinite loop --- */
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const row1Track = document.querySelector('.marquee--left .marquee__track');
  const row2Track = document.querySelector('.marquee--right .marquee__track');

  if (isMobile) {
    if (row1Track && row2Track) {
      row1Track.innerHTML += row2Track.innerHTML;
    }
  } else {
    document.querySelectorAll('.marquee__track').forEach(track => {
      const cards = track.innerHTML;
      track.innerHTML = cards + cards;
    });
  }

  /* --- Back to Top --- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --- Contact Form Handler --- */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.contact__submit span');
    const originalText = btn.textContent;
    btn.textContent = 'Sent!';
    setTimeout(() => {
      btn.textContent = originalText;
      form.reset();
    }, 2500);
  });

});
