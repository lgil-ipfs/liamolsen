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

})();
