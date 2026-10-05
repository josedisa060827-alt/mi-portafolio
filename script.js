'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Año en el pie de página
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menú móvil
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Filtro de proyectos
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');
  const empty = document.querySelector('.empty');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle('is-active', c === chip));
      let visible = 0;
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.tech.split(' ').includes(filter);
        card.hidden = !show;
        if (show) visible++;
      });
      if (empty) empty.hidden = visible > 0;
    });
  });

  // Formulario de contacto
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const rules = {
      nombre: (v) => (v.trim().length >= 2 ? '' : 'Escribe tu nombre.'),
      email: (v) => (emailOk(v.trim()) ? '' : 'Escribe un correo válido, por ejemplo nombre@dominio.com.'),
      mensaje: (v) => (v.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'),
    };

    const validate = (field) => {
      const msg = rules[field.name](field.value);
      form.querySelector(`.error[data-for="${field.name}"]`).textContent = msg;
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    };

    form.querySelectorAll('input, textarea').forEach((f) => {
      f.addEventListener('blur', () => validate(f));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('input, textarea')];
      const valid = fields.map(validate).every(Boolean);
      if (!valid) {
        status.textContent = 'Revisa los campos marcados.';
        fields.find((f) => f.getAttribute('aria-invalid') === 'true').focus();
        return;
      }
      // Abre el cliente de correo. Cambia el destinatario por el tuyo.
      const to = 'tucorreo@ejemplo.com';
      const subject = encodeURIComponent(`Mensaje de ${form.nombre.value.trim()} desde tu portafolio`);
      const body = encodeURIComponent(`${form.mensaje.value.trim()}\n\n${form.nombre.value.trim()}\n${form.email.value.trim()}`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      status.textContent = 'Se abrió tu aplicación de correo para enviar el mensaje.';
      form.reset();
      fields.forEach((f) => f.removeAttribute('aria-invalid'));
    });
  }
});
