const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const progress = document.querySelector('.scroll-progress');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.resume-dropdown[open]').forEach(dropdown => {
    if (!dropdown.contains(event.target)) dropdown.removeAttribute('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

const updateProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const value = distance > 0 ? (window.scrollY / distance) * 100 : 0;
  progress.style.width = `${Math.min(value, 100)}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
