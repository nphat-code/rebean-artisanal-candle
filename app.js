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

/* ==========================================================================
   Phần 3: Interactive Exploded Jar Anatomy
   ========================================================================== */
window.setJarViewMode = function(mode) {
  const stage = document.getElementById('jar-stage');
  const btnExplode = document.getElementById('btn-explode');
  const btnCollapse = document.getElementById('btn-collapse');

  if (!stage) return;

  if (mode === 'exploded') {
    stage.classList.add('exploded');
    stage.classList.remove('closed');
    if (btnExplode) btnExplode.classList.add('active');
    if (btnCollapse) btnCollapse.classList.remove('active');
  } else {
    stage.classList.remove('exploded');
    stage.classList.add('closed');
    if (btnCollapse) btnCollapse.classList.add('active');
    if (btnExplode) btnExplode.classList.remove('active');
  }
};

window.selectLayer = function(layerId) {
  if (!layerId) return;

  // 1. Update slices & strata in jar stage
  const slices = document.querySelectorAll('.jar-slice');
  slices.forEach(slice => {
    if (slice.getAttribute('data-layer') === layerId) {
      slice.classList.add('active');
    } else {
      slice.classList.remove('active');
    }
  });

  // 2. Update alternating callout items
  const callouts = document.querySelectorAll('.callout-item');
  callouts.forEach(callout => {
    if (callout.getAttribute('data-layer') === layerId) {
      callout.classList.add('active');
    } else {
      callout.classList.remove('active');
    }
  });

  // 3. Update detail cards (map 'strata' to card 04 'wax')
  const targetCardLayer = (layerId === 'strata') ? 'wax' : layerId;
  const cards = document.querySelectorAll('.detail-card');
  cards.forEach(card => {
    if (card.getAttribute('data-layer') === targetCardLayer) {
      card.classList.add('active');
      // On tablet/mobile devices, smoothly scroll active card into view
      if (window.innerWidth <= 1024) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      card.classList.remove('active');
    }
  });
};

