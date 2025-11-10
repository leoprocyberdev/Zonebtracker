function setTheme(mode) {
  if (mode === "dark") {
    document.body.style.background = "#222";
    document.body.style.color = "#fff";
  } else {
    document.body.style.background = "#f0f4f8";
    document.body.style.color = "#000";
  }
}

function changeLanguage() {
  const lang = document.getElementById("languageSelect").value;
  alert("Language changed to: " + lang);
}