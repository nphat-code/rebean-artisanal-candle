/**
 * Re:Bean — Eco-Artisanal Luxury Experience Engine
 * Xây dựng từng phần theo lựa chọn thiết kế
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndDrawer();
});

/* ==========================================================================
   Phần 1: Header Scroll State & Mobile Drawer
   ========================================================================== */
function initHeaderAndDrawer() {
  const header = document.getElementById('header');
  const btnHamburger = document.getElementById('btn-hamburger');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn-cta');

  // Sticky header glass effect on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open drawer
  if (btnHamburger) {
    btnHamburger.addEventListener('click', () => {
      if (drawer) drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close drawer helper
  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnCloseDrawer) {
    btnCloseDrawer.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}
