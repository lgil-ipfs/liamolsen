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

  /* Donate amount selector */
  const amountBtns = document.querySelectorAll('.donate-amount-btn');
  const customField = document.getElementById('donate-custom-field');
  const customInput = document.getElementById('donate-custom-amount');
  const recurringCheck = document.getElementById('donate-recurring');
  const submitBtn = document.getElementById('donate-submit');

  function currentAmount() {
    const active = document.querySelector('.donate-amount-btn.is-active');
    if (!active) return null;
    if (active.dataset.amount === 'custom') {
      const val = parseFloat(customInput && customInput.value);
      return val > 0 ? val : null;
    }
    return parseFloat(active.dataset.amount);
  }

  function updateSubmit() {
    if (!submitBtn) return;
    const amount = currentAmount();
    const recurring = recurringCheck && recurringCheck.checked;
    const label = amount
      ? `Donate Now — $${amount}${recurring ? '/mo' : ''}`
      : 'Donate Now';
    submitBtn.textContent = label;
    // Payment processor not yet connected — this mailto is a placeholder.
    // Replace with a real donation link (CanadaHelps, NationBuilder, Stripe, etc).
    const subject = encodeURIComponent(
      `Donation — $${amount || ''}${recurring ? '/mo' : ''}`.trim()
    );
    submitBtn.href = `mailto:hello@liamolsen.ca?subject=${subject}`;
  }

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (btn.dataset.amount === 'custom') {
        customField && customField.classList.remove('hidden');
        customInput && customInput.focus();
      } else {
        customField && customField.classList.add('hidden');
      }
      updateSubmit();
    });
  });

  customInput && customInput.addEventListener('input', updateSubmit);
  recurringCheck && recurringCheck.addEventListener('change', updateSubmit);

  if (amountBtns.length) updateSubmit();

})();
