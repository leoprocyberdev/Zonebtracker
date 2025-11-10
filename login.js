const adminCredentials = {
  username: "admin",
  password: "blwzoneb2025"
};

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === adminCredentials.username && password === adminCredentials.password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html"; // Redirect to main dashboard
  } else {
    document.getElementById("loginMessage").textContent = "Invalid credentials. Please try again.";
  }
});