// ==========================================================================
// Sakshi Harjani — Portfolio interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('done'), 400);
  });

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('sh-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    localStorage.setItem('sh-theme', next);
    themeBtn.textContent = next === 'light' ? '☾' : '☀';
  });
  themeBtn.textContent = root.getAttribute('data-theme') === 'light' ? '☾' : '☀';

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- Scroll progress + active link + back-to-top ---------- */
  const progress = document.getElementById('scroll-progress');
  const toTop = document.getElementById('to-top');
  const sections = document.querySelectorAll('section[id]');
  const navA = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    toTop.classList.toggle('show', h.scrollTop > 500);

    let currentId = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });
    navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + currentId));
  };
  document.addEventListener('scroll', onScroll, { passive: true });

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.num[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = el.dataset.count.includes('.') ? 2 : 0;
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = start + (target - start) * eased;
        el.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = decimals ? target.toFixed(decimals) : target;
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterIO.observe(el));

  /* ---------- Typing role animation ---------- */
  const roles = ['MCA — Artificial Intelligence', 'Full-Stack Django Developer', 'Python Backend Intern'];
  const roleEl = document.getElementById('typing-role');
  let ri = 0, ci = 0, deleting = false;
  function typeLoop() {
    const word = roles[ri];
    if (!deleting) {
      ci++;
      roleEl.firstChild.textContent = word.slice(0, ci);
      if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      ci--;
      roleEl.firstChild.textContent = word.slice(0, ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  roleEl.textContent = '';
  const textNode = document.createTextNode('');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '▍';
  roleEl.appendChild(textNode);
  roleEl.appendChild(cursor);
  typeLoop();

  /* ---------- Ripple effect ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      circle.classList.add('ripple-effect');
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ---------- Contact form (front-end only placeholder) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Message ready ✓';
      form.querySelector('.form-note').textContent =
        'This form is a front-end placeholder — connect it to a form service (e.g. Formspree) or mailto to make it live.';
      setTimeout(() => { btn.textContent = original; }, 2200);
    });
  }

  onScroll();
});
