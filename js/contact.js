const API_BASE = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://veltron-backend.onrender.com"; // replace with your Render URL

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();
        if (data.success) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Error: " + data.error);
        }
      } catch (err) {
        console.error("⚠️ Could not connect to backend:", err);
        alert("Could not connect to server. Try again later.");
      }
    });
  }
});
