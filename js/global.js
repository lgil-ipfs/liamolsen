/* global.js — Liam Olsen for North Van City Council
   Handles: sticky nav, mobile menu, scroll animations */

(function () {
  'use strict';

  /* ── Nav scroll behavior ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = y;
    }, { passive: true });
  }

  /* ── Mobile menu toggle ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const body = document.body;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      body.classList.toggle('menu-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll-triggered fade-in animations ── */
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });
  });

})();
