window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  window.signInWithEmailAndPassword(window.auth, email, password)
    .then(() => {
      window.location.href = "database.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};