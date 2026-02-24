// navbar.js (FINAL SAFE VERSION)

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const logoutLink = document.getElementById("logoutLink");
  const userNameSpan = document.getElementById("userName");

  if (token) {
    // Logged in
    loginLink && (loginLink.style.display = "none");
    registerLink && (registerLink.style.display = "none");

    logoutLink && (logoutLink.style.display = "inline");
    userNameSpan && (userNameSpan.style.display = "inline");
    if (userNameSpan) userNameSpan.textContent = "Logged In";
  } else {
    // Logged out
    loginLink && (loginLink.style.display = "inline");
    registerLink && (registerLink.style.display = "inline");

    logoutLink && (logoutLink.style.display = "none");
    userNameSpan && (userNameSpan.style.display = "none");
  }

  logoutLink?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../userlogin/login.html";
  });
});
