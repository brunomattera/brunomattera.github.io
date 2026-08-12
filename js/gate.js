(function () {
  var PASSWORD   = 'PortfolioDesignBM2026';
  var SESSION_KEY = 'portfolio-auth';

  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  var style = document.createElement('style');
  style.textContent = [
    '#gate-overlay{position:fixed;inset:0;z-index:9999;background:#0A0A0A;display:flex;align-items:center;justify-content:center;font-family:"Figtree",system-ui,sans-serif;transition:opacity 0.4s ease;}',
    '.gate-box{display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:340px;padding:0 24px;}',
    '.gate-logo{font-size:28px;font-weight:700;color:#C2FF4F;letter-spacing:-0.03em;margin:0;}',
    '.gate-label{font-size:14px;color:rgba(255,255,255,0.4);margin:0;text-align:center;}',
    '.gate-form{display:flex;flex-direction:column;gap:10px;width:100%;}',
    '.gate-input-wrap{position:relative;width:100%;}',
    '.gate-input{width:100%;padding:13px 48px 13px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:100px;color:#fff;font-size:15px;font-family:inherit;outline:none;transition:border-color 0.2s;box-sizing:border-box;}',
    '.gate-input:focus{border-color:rgba(194,255,79,0.45);}',
    '.gate-input.gate-shake{animation:gate-shake 0.4s ease;}',
    '.gate-eye{position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;padding:4px;cursor:pointer;color:rgba(255,255,255,0.35);display:flex;align-items:center;justify-content:center;transition:color 0.2s;}',
    '.gate-eye:hover{color:rgba(255,255,255,0.75);}',
    '@keyframes gate-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}',
    '.gate-btn{width:100%;padding:13px 28px;background:#fff;color:#0A0A0A;border:none;border-radius:100px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;transition:background 0.2s;}',
    '.gate-btn:hover{background:#C2FF4F;}',
    '.gate-error{font-size:13px;color:#ff6b6b;margin:0;opacity:0;transition:opacity 0.25s;}'
  ].join('');
  document.head.appendChild(style);

  var EYE_ON  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  var EYE_OFF = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

  var overlay = document.createElement('div');
  overlay.id = 'gate-overlay';
  overlay.innerHTML =
    '<div class="gate-box">' +
      '<p class="gate-logo">BM</p>' +
      '<p class="gate-label">Enter password to view portfolio</p>' +
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
