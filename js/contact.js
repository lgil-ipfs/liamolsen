/* contact.js — Contact form handling */

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = 'var(--salmon)';
        valid = false;
      }
    });
    if (!valid) {
      const first = Array.from(required).find(f => !f.value.trim());
      if (first) first.focus();
      return;
    }

    const btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending...';
    }

    // Replace this timeout with a real fetch/POST to your backend, Netlify Forms, Formspree, etc.
    setTimeout(() => {
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

})();
