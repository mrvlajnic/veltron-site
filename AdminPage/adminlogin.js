const form = document.getElementById('loginForm');
const errorText = document.getElementById('loginError');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usr = document.getElementById('username').value;
  const pw = document.getElementById('password').value;

  if (usr === 'CEO' && pw === 'v-admin23') {
    sessionStorage.setItem('isAdmin', 'true');
    window.location.replace('adminmsg.html');
  } else {
    errorText.textContent = 'Invalid credentials.';
  }
});
