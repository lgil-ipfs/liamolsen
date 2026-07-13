/* index.js — Homepage interactions */

(function () {
  'use strict';

  /* Animate hero text on load */
  const heroHeading = document.querySelector('.hero-heading');
  const heroSub = document.querySelector('.hero-sub');
  const heroActions = document.querySelector('.hero-actions');
  const heroEyebrow = document.querySelector('.hero-eyebrow');

  [heroEyebrow, heroHeading, heroSub, heroActions].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '';
        el.style.transform = '';
      }, 50);
    });
  });

  /* Volunteer sign-up form — submits to Formspree, shows on-page confirmation */
  const signupForm = document.getElementById('home-signup-form');
  const signupSuccess = document.getElementById('home-signup-success');
  if (signupForm && signupSuccess) {
    const errorMessage = signupForm.querySelector('.form-error-message');

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const required = signupForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--salmon)';
          valid = false;
        }
      });
      if (!valid) {
        const firstInvalid = Array.from(required).find(f => !f.value.trim());
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      errorMessage && errorMessage.classList.add('hidden');
      const btn = signupForm.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

      fetch(signupForm.action, {
        method: 'POST',
        body: new FormData(signupForm),
        headers: { Accept: 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            signupForm.classList.add('hidden');
            signupSuccess.classList.remove('hidden');
            signupSuccess.focus();
          } else {
            throw new Error('Formspree submission failed');
          }
        })
        .catch(() => {
          errorMessage && errorMessage.classList.remove('hidden');
          if (btn) { btn.disabled = false; btn.textContent = 'Sign Up'; }
        });
    });
  }

})();
