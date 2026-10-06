document.getElementById('year').textContent = new Date().getFullYear();

// Resalta en el menú la sección que se está viendo
const links = document.querySelectorAll('nav a');
const obs = new IntersectionObserver(function (items) {
  items.forEach(function (it) {
    if (it.isIntersecting) {
      links.forEach(function (a) {
        a.classList.toggle('on', a.getAttribute('href') === '#' + it.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section').forEach(function (s) { obs.observe(s); });

// Formulario: abre la app de correo con el mensaje ya escrito
const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const d = new FormData(form);
  const cuerpo = encodeURIComponent(d.get('mensaje') + '\n\n— ' + d.get('nombre') + ' (' + d.get('correo') + ')');
  document.getElementById('msg').textContent = 'Abriendo tu app de correo…';
  window.location.href = 'mailto:TU_CORREO@ejemplo.com?subject=Contacto desde tu portafolio&body=' + cuerpo;
});
