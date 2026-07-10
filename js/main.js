/* Plau am See · Interaktionen */

// ── Header: transparent → solide beim Scrollen ──
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile Navigation ──
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.main-nav a').forEach(link =>
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  })
);

// ── Scroll-Reveal ──
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Statistik-Zähler ──
const formatDE = n => n.toLocaleString('de-DE');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const plain = el.dataset.plain === 'true';
    const duration = 1600;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = (plain ? String(val) : formatDE(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat strong').forEach(el => countObserver.observe(el));

// ── Kulinarik-Scroller ──
const scroller = document.getElementById('foodScroller');
document.querySelectorAll('.scroll-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    const card = scroller.querySelector('.food-card');
    const step = card ? card.offsetWidth + 24 : 380;
    scroller.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
  })
);
