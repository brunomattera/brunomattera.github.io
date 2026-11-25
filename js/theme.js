/* Shared theme for case pages.
   Load in <head> (blocking) so the saved theme applies before paint.
   Adds a light/dark toggle to the case nav once the DOM is ready. */
(function () {
  var html = document.documentElement;
  try {
    if (localStorage.getItem('theme') === 'light') html.setAttribute('data-theme', 'light');
    else html.removeAttribute('data-theme');
  } catch (e) {}

  var MOON = '<svg class="icon-moon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var SUN = '<svg class="icon-sun" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  function addToggle() {
    var inner = document.querySelector('.nav .nav-inner');
    var back = inner && inner.querySelector('.nav-back');
    if (!inner || !back || document.getElementById('themeToggle')) return;
    var wrap = document.createElement('div');
    wrap.className = 'nav-case-right';
    back.parentNode.insertBefore(wrap, back);
    wrap.appendChild(back);
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.id = 'themeToggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.innerHTML = '<span class="toggle-thumb"></span><span class="toggle-slot">' + MOON + '</span><span class="toggle-slot">' + SUN + '</span>';
    wrap.appendChild(btn);
    btn.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', next); } catch (e) {}
      if (next === 'light') html.setAttribute('data-theme', 'light');
      else html.removeAttribute('data-theme');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addToggle);
  else addToggle();
})();
