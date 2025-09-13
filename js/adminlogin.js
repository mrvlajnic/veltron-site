document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username === "CEO" && password === "v-admin23") {
      sessionStorage.setItem("isAdmin", "true");
      window.location.replace("adminmsg.html");
    } else {
      alert("Invalid credentials");
    }
  });
});
