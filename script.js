function openSection(section) {
  switch (section) {
    case "database":
      window.location.href = "database.html";
      break;
    case "foundation":
      window.location.href = "school.html";
      break;
    case "events":
      window.location.href = "events.html";
      break;
    case "soultracker":
      window.location.href = "soul.html"; // ✅ renamed
      break;
    default:
      alert("Section not found.");
  }
}

function goHome() {
  window.location.href = "index.html";
}

function openSettings() {
  window.location.href = "settings.html";
}

function addNew() {
  window.location.href = "register.html";
}

function openProfile() {
  window.location.href = "profile.html";
}
function goHome() {
  window.location.href = "index.html";
}

function openSettings() {
  window.location.href = "settings.html"; // Optional future page
}

function addNew() {
  window.location.href = "register.html"; // Optional: member registration form
}

function openProfile() {
  window.location.href = "profile.html"; // Optional: admin profile or login
}