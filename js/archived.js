const API_BASE = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://veltron-backend.onrender.com";

async function loadArchived() {
  try {
    const response = await fetch(`${API_BASE}/archived`);
    const archived = await response.json();

    const container = document.getElementById("archived");
    container.innerHTML = "";

    if (!archived.length) {
      container.innerHTML = "<p>No archived messages yet.</p>";
      return;
    }

    archived.forEach(msg => {
      const div = document.createElement("div");
      div.classList.add("archived-msg");

      div.innerHTML = `
        <p><strong>${msg.name}</strong> (${msg.email})</p>
        <p>${msg.message}</p>
        <small>Sent: ${new Date(msg.timestamp).toLocaleString()}</small><br>
        <small style="color:gray;">Archived: ${new Date(msg.archivedAt).toLocaleString()}</small>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("⚠️ Could not load archived messages:", err);
    document.getElementById("archived").innerHTML =
      "<p style='color:red;'>⚠️ Could not connect to backend.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("isAdmin") !== "true") {
    window.location.replace("adminlogin.html");
  } else {
    loadArchived();
  }
});
