(function () {
  // Set to false to publish the portfolio without a password screen
  var GATE_ENABLED = true;
  if (!GATE_ENABLED) return;

  var PASSWORD   = 'PortfolioDesignBM2026';
  var SESSION_KEY = 'portfolio-auth';

  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  var ROOT = (function () {
    var src = (document.currentScript && document.currentScript.src) || '';
    return src ? src.replace(/js\/gate\.js(\?.*)?$/, '') : '/';
  })();
  var LIGHT = false;
  try { LIGHT = localStorage.getItem('theme') === 'light'; } catch (e) {}

  var style = document.createElement('style');
  style.textContent = [
    '#gate-overlay{--g-bg:#0C0B12;--g-text:#F6F5FA;--g-muted:rgba(246,245,250,0.55);--g-field:rgba(207,202,236,0.06);--g-border:rgba(207,202,236,0.14);--g-accent:#8277F6;--g-accent2:#53A5E8;--g-btn:#F6F5FA;--g-btn-text:#0C0B12;',
      'position:fixed;inset:0;z-index:9999;background:var(--g-bg);display:flex;align-items:center;justify-content:center;font-family:"Figtree",system-ui,sans-serif;transition:opacity 0.4s ease;overflow:hidden;}',
    '#gate-overlay.is-light{--g-bg:#FBFAFE;--g-text:#14131C;--g-muted:rgba(20,19,28,0.55);--g-field:#FFFFFF;--g-border:rgba(44,39,72,0.16);--g-accent:#5C51A7;--g-accent2:#4A8FE0;--g-btn:#14131C;--g-btn-text:#FFFFFF;}',
    '#gate-overlay::before,#gate-overlay::after{content:"";position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none;}',
    '#gate-overlay::before{width:560px;height:560px;top:-160px;right:-140px;background:radial-gradient(circle,var(--g-accent),transparent 62%);opacity:0.22;}',
    '#gate-overlay::after{width:480px;height:480px;bottom:-160px;left:-140px;background:radial-gradient(circle,var(--g-accent2),transparent 62%);opacity:0.16;}',
    '.gate-box{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;width:100%;max-width:360px;padding:0 24px;box-sizing:border-box;}',
    '.gate-photo{width:104px;height:104px;border-radius:50%;padding:3px;background:linear-gradient(135deg,var(--g-accent2) 0%,var(--g-accent) 55%,rgba(130,119,246,0.15) 100%);box-shadow:0 16px 48px -12px rgba(130,119,246,0.45);margin-bottom:22px;box-sizing:border-box;}',
    '.gate-photo span{display:block;width:100%;height:100%;border-radius:50%;overflow:hidden;border:3px solid var(--g-bg);box-sizing:border-box;background:var(--g-bg);}',
    '.gate-photo img{width:100%;height:100%;object-fit:cover;display:block;transform:translate(-4%,7%) scale(1.2);transform-origin:54% 47%;}',
    '.gate-name{font-family:"Advercase",Georgia,serif;font-size:40px;font-weight:400;line-height:1.05;color:var(--g-text);margin:0 0 8px;text-align:center;}',
    '.gate-label{font-size:14px;color:var(--g-muted);margin:0 0 26px;text-align:center;}',
    '.gate-form{display:flex;flex-direction:column;gap:10px;width:100%;}',
    '.gate-input-wrap{position:relative;width:100%;}',
    '.gate-input{width:100%;padding:14px 48px 14px 20px;background:var(--g-field);border:1px solid var(--g-border);border-radius:100px;color:var(--g-text);font-size:15px;font-family:inherit;outline:none;transition:border-color 0.2s,box-shadow 0.2s;box-sizing:border-box;}',
    '.gate-input::placeholder{color:var(--g-muted);}',
    '.gate-input:focus{border-color:var(--g-accent);box-shadow:0 0 0 4px rgba(130,119,246,0.15);}',
    '.gate-input.gate-shake{animation:gate-shake 0.4s ease;}',
    '.gate-eye{position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;padding:4px;cursor:pointer;color:var(--g-muted);display:flex;align-items:center;justify-content:center;transition:color 0.2s;}',
    '.gate-eye:hover{color:var(--g-text);}',
    '@keyframes gate-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}',
    '.gate-btn{width:100%;padding:14px 28px;background:var(--g-btn);color:var(--g-btn-text);border:none;border-radius:100px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;transition:background 0.2s,color 0.2s;}',
    '.gate-btn:hover{background:var(--g-accent);color:#fff;}',
    '.gate-error{font-size:13px;color:#ff6b6b;margin:14px 0 0;opacity:0;transition:opacity 0.25s;}',
    '#gate-overlay.is-light .gate-error{color:#D23B3B;}'
  ].join('');
  document.head.appendChild(style);

  var EYE_ON  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  var EYE_OFF = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

  var overlay = document.createElement('div');
  overlay.id = 'gate-overlay';
  if (LIGHT) overlay.className = 'is-light';
  overlay.innerHTML =
    '<div class="gate-box">' +
      '<div class="gate-photo"><span><img src="' + ROOT + 'images/' + (LIGHT ? 'bruno-light.png' : 'bruno.png') + '" alt="Bruno Mattera"></span></div>' +
      '<h1 class="gate-name">Bruno Mattera</h1>' +
      '<p class="gate-label">Enter the password to view my portfolio</p>' +
      '<form class="gate-form" id="gateForm">' +
        '<div class="gate-input-wrap">' +
          '<input type="password" id="gateInput" class="gate-input" placeholder="Password" autocomplete="current-password">' +
          '<button type="button" class="gate-eye" id="gateEye" aria-label="Show password">' + EYE_ON + '</button>' +
        '</div>' +
        '<button type="submit" class="gate-btn">Enter ↗</button>' +
      '</form>' +
      '<p class="gate-error" id="gateError">Incorrect password. Try again.</p>' +
    '</div>';

  document.documentElement.style.overflow = 'hidden';
  document.body.appendChild(overlay);

  var input   = document.getElementById('gateInput');
  var eyeBtn  = document.getElementById('gateEye');
  var visible = false;

  input.focus();

  eyeBtn.addEventListener('click', function () {
    visible = !visible;
    input.type = visible ? 'text' : 'password';
    eyeBtn.innerHTML = visible ? EYE_OFF : EYE_ON;
    eyeBtn.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
    input.focus();
  });

  document.getElementById('gateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var val = input.value;
    if (val === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      overlay.style.opacity = '0';
      setTimeout(function () {
        overlay.remove();
        document.documentElement.style.overflow = '';
      }, 400);
    } else {
      document.getElementById('gateError').style.opacity = '1';
      input.value = '';
      input.classList.remove('gate-shake');
      void input.offsetWidth;
      input.classList.add('gate-shake');
      setTimeout(function () { input.classList.remove('gate-shake'); }, 500);
    }
  });
})();
