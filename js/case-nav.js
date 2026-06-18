// Floating "Next case" pill — clones the real footer Next button,
// shows once you scroll past the hero, hides again once the real
// footer nav comes into view so there's never a duplicate on screen.
(function () {
  var realNav  = document.querySelector('.project-nav-section');
  var realNext = realNav ? realNav.querySelector('.btn-primary') : null;
  var hero     = document.querySelector('.project-hero, .gd-hero');
  if (!realNav || !realNext || !hero) return;

  var floatWrap = document.createElement('div');
  floatWrap.className = 'project-nav-section next-case-float';
  floatWrap.appendChild(realNext.cloneNode(true));
  document.body.appendChild(floatWrap);

  function update() {
    var heroBottom  = hero.getBoundingClientRect().bottom;
    var realNavTop  = realNav.getBoundingClientRect().top;
    var viewportH   = window.innerHeight;
    var pastHero    = heroBottom < 0;
    var reachedFoot = realNavTop < viewportH;
    floatWrap.classList.toggle('visible', pastHero && !reachedFoot);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
