/* =====================================================
   NOOK CAFÉ — script.js
   Handles:
   1. Navbar scroll effect
   2. Mobile hamburger menu
   3. Menu category filter tabs
   4. Active nav link on scroll
   5. Footer year auto-update
   ===================================================== */


/* =====================================================
   1. NAVBAR SCROLL EFFECT
   Adds a background to the nav when user scrolls down
   ===================================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Add 'scrolled' class after 50px — CSS gives it a background
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* =====================================================
   2. MOBILE HAMBURGER MENU
   Toggles the nav links open/closed on small screens
   ===================================================== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  // Toggle open state on both button and links list
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close the menu when any nav link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* =====================================================
   3. MENU CATEGORY FILTER
   Shows/hides menu cards based on selected category tab
   ===================================================== */
const tabButtons = document.querySelectorAll('.tab-btn');
const menuCards  = document.querySelectorAll('.menu-card');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {

    // Mark this tab as active, remove from others
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.category; // 'all', 'coffee', 'tea', etc.

    menuCards.forEach(card => {
      const cardCategory = card.dataset.category;

      if (selected === 'all' || cardCategory === selected) {
        // Show card: remove 'hidden', add 'visible' for fade-in animation
        card.classList.remove('hidden');
        // Small timeout so the animation replays each time
        setTimeout(() => card.classList.add('visible'), 10);
      } else {
        // Hide card
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });

  });
});

// Set all cards as visible on first load
menuCards.forEach(card => card.classList.add('visible'));


/* =====================================================
   4. ACTIVE NAV LINK ON SCROLL
   Highlights the correct nav link as the user scrolls
   ===================================================== */
const sections  = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px', // trigger when section is near middle of screen
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      // Remove active from all, add to matching link
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


/* =====================================================
   5. FOOTER YEAR
   Keeps the copyright year always up to date
   ===================================================== */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
