// Redirects to the password gate before paint if not authenticated.
// Saves the intended URL so the gate can return here after login.
(function () {
  if (sessionStorage.getItem('portfolio-auth') !== '1') {
    sessionStorage.setItem('portfolio-dest', location.pathname + location.search + location.hash);
    location.replace('/');
  }
})();
