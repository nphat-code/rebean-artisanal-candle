/**
 * Re:Bean — Eco-Artisanal Luxury Experience Engine
 * Xây dựng từng phần theo lựa chọn thiết kế
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndDrawer();
  initWorkshopTimelineObserver();
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
  const stateBadge = document.getElementById('jar-state-badge');

  if (!stage) return;

  if (mode === 'exploded') {
    stage.classList.add('exploded');
    stage.classList.remove('closed');
    if (btnExplode) btnExplode.classList.add('active');
    if (btnCollapse) btnCollapse.classList.remove('active');
    if (stateBadge) {
      stateBadge.className = 'jar-state-badge mode-light';
      stateBadge.innerHTML = '<span class="badge-icon">✨</span><span class="badge-text">Đang mở nắp: Tỏa hương êm dịu, ấm cúng</span>';
    }
  } else {
    stage.classList.remove('exploded');
    stage.classList.add('closed');
    if (btnCollapse) btnCollapse.classList.add('active');
    if (btnExplode) btnExplode.classList.remove('active');
    if (stateBadge) {
      stateBadge.className = 'jar-state-badge mode-deodorize';
      stateBadge.innerHTML = '<span class="badge-icon">🌱</span><span class="badge-text">Đang đậy nắp: Túi bã tự nhiên hút ẩm &amp; khử mùi</span>';
    }
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

  // 2. Update interactive hotspot pins
  const hotspots = document.querySelectorAll('.jar-hotspot');
  hotspots.forEach(hotspot => {
    if (hotspot.getAttribute('data-layer') === layerId) {
      hotspot.classList.add('active');
    } else {
      hotspot.classList.remove('active');
    }
  });

  // 3. Update detail cards (map 'strata' to card 04 'wax')
  const targetCardLayer = (layerId === 'strata') ? 'wax' : layerId;
  const cards = document.querySelectorAll('.detail-card');
  cards.forEach(card => {
    if (card.getAttribute('data-layer') === targetCardLayer) {
      card.classList.add('active');
      // Smoothly scroll active card into view
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      card.classList.remove('active');
    }
  });
};

/* ==========================================================================
   Phần 3: Ghé Thăm Xưởng Nến Thủ Công (Vertical Craft Timeline)
   ========================================================================== */
function initWorkshopTimelineObserver() {
  const stations = document.querySelectorAll('.timeline-station');
  if (!stations.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    rootMargin: '0px 0px -25% 0px',
    threshold: 0.15
  });

  stations.forEach(station => observer.observe(station));
}

/* ==========================================================================
   Accordion Đóng / Mở Dòng Thời Gian Dọc (Hướng 2 - Mobile-First)
   ========================================================================== */
window.toggleTimelineStation = function(headerEl) {
  const card = headerEl.closest('.station-card');
  if (!card) return;

  // On mobile (or screen <= 768px), act as accordion
  if (window.innerWidth <= 768) {
    const isExpanded = card.classList.contains('expanded');
    const allCards = document.querySelectorAll('.timeline-tour-container .station-card');

    // Close all other stations for clean mobile height
    allCards.forEach(c => {
      if (c !== card) {
        c.classList.remove('expanded');
        const trigger = c.querySelector('.station-header');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });

    if (isExpanded) {
      card.classList.remove('expanded');
      headerEl.setAttribute('aria-expanded', 'false');
    } else {
      card.classList.add('expanded');
      headerEl.setAttribute('aria-expanded', 'true');

      // Smooth scroll if top went off-screen
      setTimeout(() => {
        const rect = card.getBoundingClientRect();
        if (rect.top < 70) {
          window.scrollBy({ top: rect.top - 80, behavior: 'smooth' });
        }
      }, 220);
    }
  }
};

window.toggleTimelineStationFromNode = function(nodeEl) {
  if (window.innerWidth <= 768) {
    const station = nodeEl.closest('.timeline-station');
    if (!station) return;
    const header = station.querySelector('.station-header');
    if (header) {
      toggleTimelineStation(header);
    }
  }
};

/* ==========================================================================
   Phần 3: Dòng Thời Gian Xưởng Nến Thủ Công (Timeline Tour & Accordion)
   ========================================================================== */
window.toggleTimelineStation = function(headerElem) {
  const card = headerElem.closest('.station-card');
  const station = headerElem.closest('.timeline-station');
  if (!card) return;

  const isExpanded = card.classList.contains('expanded');

  // Toggle current card
  if (isExpanded) {
    card.classList.remove('expanded');
    headerElem.setAttribute('aria-expanded', 'false');
  } else {
    card.classList.add('expanded');
    headerElem.setAttribute('aria-expanded', 'true');
    if (station) station.classList.add('in-view');
  }
};

window.toggleTimelineStationFromNode = function(nodeElem) {
  const station = nodeElem.closest('.timeline-station');
  if (!station) return;
  const header = station.querySelector('.station-header');
  if (header) {
    window.toggleTimelineStation(header);
  }
};

function initWorkshopTimelineObserver() {
  const stations = document.querySelectorAll('.timeline-station');
  if (!stations.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      root: null,
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px'
    });

    stations.forEach(station => observer.observe(station));
  } else {
    stations.forEach(station => station.classList.add('in-view'));
  }
}

/* ==========================================================================
   Phần 4: Lành Cho Tổ Ấm & Bản Phối Hương (Scent Selector)
   ========================================================================== */
window.currentSelectedScent = 'cam';

window.selectScentOption = function(scentKey) {
  window.currentSelectedScent = scentKey;
  
  const cards = document.querySelectorAll('.scent-card');
  cards.forEach(c => {
    if (c.getAttribute('data-scent') === scentKey) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });
};

document.addEventListener('DOMContentLoaded', function() {
  initWorkshopTimelineObserver();
});
