/* get-involved.js — Form handling for Get Involved page */

(function () {
  'use strict';

  function handleForm(formId, successId) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic client-side validation
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
        const firstInvalid = form.querySelector('[required]:not([value])') ||
          Array.from(required).find(f => !f.value.trim());
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulate submission (replace with actual API call / Netlify / Formspree etc.)
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending...';
      }

      setTimeout(() => {
        form.classList.add('hidden');
        success.classList.remove('hidden');
        success.focus();
      }, 800);
    });
  }

  /* Forms that submit for real, to Formspree */
  function handleFormspreeForm(formId, successId, sendingLabel, defaultLabel) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form || !success) return;
    const errorMessage = form.querySelector('.form-error-message');

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
        const firstInvalid = Array.from(required).find(f => !f.value.trim());
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      errorMessage && errorMessage.classList.add('hidden');
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = sendingLabel; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            form.classList.add('hidden');
            success.classList.remove('hidden');
            success.focus();
          } else {
            throw new Error('Formspree submission failed');
          }
        })
        .catch(() => {
          errorMessage && errorMessage.classList.remove('hidden');
          if (btn) { btn.disabled = false; btn.textContent = defaultLabel; }
        });
    });
  }

  handleFormspreeForm('signup-form', 'signup-success', 'Sending...', 'Sign Up');
  handleFormspreeForm('volunteer-form', 'volunteer-success', 'Sending...', 'Sign Up to Volunteer');
  handleForm('shift-form', 'shift-success');
  handleForm('lawn-sign-form', 'lawn-sign-success');

  /* Email signup */
  const emailForm = document.getElementById('email-signup-form');
  const emailSuccess = document.getElementById('email-signup-success');
  if (emailForm && emailSuccess) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = emailForm.querySelector('[type="email"]');
      if (!emailInput || !emailInput.value.trim()) {
        emailInput && emailInput.focus();
        return;
      }
      const btn = emailForm.querySelector('button');
      if (btn) { btn.disabled = true; btn.textContent = 'Subscribing...'; }
      setTimeout(() => {
        emailForm.classList.add('hidden');
        emailSuccess.classList.remove('hidden');
      }, 600);
    });
  }

})();
