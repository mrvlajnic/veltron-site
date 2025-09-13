const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Contact form logic
const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('formStatus');

contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    statusMsg.textContent = "Please fill in all fields.";
    statusMsg.style.color = "tomato";
    return;
  }

  const existing = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  existing.push({ name, email, message, timestamp: new Date().toISOString() });
  localStorage.setItem('contactMessages', JSON.stringify(existing));

  statusMsg.textContent = "Message sent! We'll get back to you shortly.";
  statusMsg.style.color = "lightgreen";
  contactForm.reset();
});
