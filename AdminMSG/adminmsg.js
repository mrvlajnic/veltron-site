// Redirect if not logged in
if (sessionStorage.getItem('isAdmin') !== 'true') {
  window.location.replace('adminlogin.html');
}

// Load messages from localStorage
const messagesList = document.getElementById('messagesList');
const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

if (messages.length === 0) {
  messagesList.innerHTML = '<li>No messages yet.</li>';
} else {
  messages.forEach(msg => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${msg.name} (<span class="email">${msg.email}</span>)</strong>
      <p>${msg.message}</p>
    `;
    messagesList.appendChild(li);
  });
}

// Logout logic
document.getElementById('logout').addEventListener('click', () => {
  sessionStorage.removeItem('isAdmin');
  window.location.replace('adminlogin.html');
});
