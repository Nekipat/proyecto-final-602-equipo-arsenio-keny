(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Reloj simple en el header
  const clockChip = document.getElementById('clock-chip');
  if (clockChip) {
    const pad = (n) => String(n).padStart(2, '0');
    const render = () => {
      const d = new Date();
      clockChip.textContent = `Hoy: ${pad(d.getDate())}/${pad(d.getMonth() + 1)} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };
    render();
    setInterval(render, 30_000);
  }

  // Marcar enlace activo según la ruta
  const links = Array.from(document.querySelectorAll('a.nav-link, a.nav-logo'));
  const path = (window.location.pathname || '').split('/').filter(Boolean);
  const file = path[path.length - 1] || 'index.html';

  links.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const normalized = href.replace('./', '');
    const normalizedFile = normalized.split('/').pop();
    const isActive = normalizedFile === file;
    if (isActive) a.setAttribute('aria-current', 'page');
  });

  // Menú responsive
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('main-menu');
  if (toggle && menu) {
    const setExpanded = (val) => toggle.setAttribute('aria-expanded', String(val));

    const closeMenu = () => {
      menu.classList.remove('show');
      setExpanded(false);
    };

    const openMenu = () => {
      menu.classList.add('show');
      setExpanded(true);
    };

    // Estado inicial
    closeMenu();

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('show');
      isOpen ? closeMenu() : openMenu();
    });

    // Cerrar al navegar
    menu.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A') closeMenu();
    });

    // Cerrar al redimensionar a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  // Validación ligera del formulario (sin backend)
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = form.elements['nombre']?.value?.trim();
      const email = form.elements['email']?.value?.trim();
      const mensaje = form.elements['mensaje']?.value?.trim();

      if (!nombre || !email || !mensaje) {
        note.textContent = 'Completa todos los campos antes de enviar.';
        note.style.color = 'rgba(255, 200, 120, .95)';
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        note.textContent = 'Ingresa un correo válido.';
        note.style.color = 'rgba(255, 200, 120, .95)';
        return;
      }

      note.textContent = 'Mensaje enviado (simulación). Gracias por contactarnos.';
      note.style.color = 'rgba(46, 233, 166, .95)';
      form.reset();
    });

    form.addEventListener('reset', () => {
      note.textContent = '';
    });
  }
})();
// ===== CARRUSEL (solo si existe en la página) =====

let slideIndex = 1;

function moveSlide(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slides");
  if (!slides || slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

const anySlides = document.getElementsByClassName('slides');
if (anySlides && anySlides.length > 0) {
  showSlides(slideIndex);
  setInterval(() => {
    moveSlide(1);
  }, 4000);
}


