(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;
  var light = document.querySelector('.cursor-light');
  if (!light) return;
  var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  var cx = tx, cy = ty;
  document.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    document.body.classList.add('cursor-active');
  }, { passive: true });
  document.addEventListener('mouseleave', function () {
    document.body.classList.remove('cursor-active');
  });
  (function tick() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    light.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
    requestAnimationFrame(tick);
  })();
})();
