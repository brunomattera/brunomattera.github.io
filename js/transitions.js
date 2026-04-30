/* ─────────────────────────────────────────────
   Page fade transitions — fail-safe version
   If this file doesn't load, the page stays
   fully visible (no CSS fallback dependency).
   ───────────────────────────────────────────── */
(function () {
  var html = document.documentElement;

  /* Apply transition style + start invisible */
  html.style.transition = 'opacity 0.38s ease';
  html.style.opacity    = '0';

  /* Fade in — works whether DOM is ready or not */
  function fadeIn() {
    requestAnimationFrame(function () { html.style.opacity = '1'; });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fadeIn);
  } else {
    fadeIn();
  }

  /* Fade out on internal link click */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (
      !href ||
      href.charAt(0) === '#' ||
      href.indexOf('://') !== -1 ||
      href.indexOf('mailto:') === 0 ||
      link.getAttribute('download') !== null ||
      link.getAttribute('target') === '_blank'
    ) return;

    e.preventDefault();
    html.style.opacity = '0';
    setTimeout(function () { window.location.href = href; }, 380);
  });

  /* Restore on back/forward (bfcache) */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) html.style.opacity = '1';
  });
})();
