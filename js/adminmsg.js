const API_BASE = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://veltron-backend.onrender.com";

async function loadMessages() {
  try {
    const response = await fetch(`${API_BASE}/messages`);
    const messages = await response.json();

    const container = document.getElementById("messages");
    container.innerHTML = "";

    if (!messages.length) {
      container.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    messages.forEach(msg => {
      const div = document.createElement("div");
      div.classList.add("message");

      div.innerHTML = `
        <p><strong>${msg.name}</strong> (${msg.email})</p>
        <p>${msg.message}</p>
        <small>Sent: ${new Date(msg.timestamp).toLocaleString()}</small><br>
        <button class="archive-btn" onclick="archiveMessage(${msg.id})">✅ Archive</button>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("⚠️ Could not load messages:", err);
    document.getElementById("messages").innerHTML =
      "<p style='color:red;'>⚠️ Could not connect to backend.</p>";
  }
}

async function archiveMessage(id) {
  try {
    const response = await fetch(`${API_BASE}/archive/${id}`, { method: "POST" });
    const data = await response.json();

    if (data.success) {
      alert("Message archived!");
      loadMessages();
    } else {
      alert("Error archiving message: " + data.error);
    }
  } catch (err) {
    console.error("⚠️ Could not archive message:", err);
    alert("Could not connect to server.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("isAdmin") !== "true") {
    window.location.replace("adminlogin.html");
  } else {
    loadMessages();
  }
});
