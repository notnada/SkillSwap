document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');

  // Smooth scroll for internal anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // update URL without jumping
          history.pushState(null, '', href);
        }
      }
    });
  });

  // Highlight active nav link while scrolling (simple scrollspy)
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (sections.length === 0) return;

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.55 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
});
