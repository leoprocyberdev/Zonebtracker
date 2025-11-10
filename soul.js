import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5FhfzWFLpzQh_fHUOy2WgvPWfysLrFpA",
  authDomain: "dig4beta.firebaseapp.com",
  projectId: "dig4beta",
  storageBucket: "dig4beta.firebasestorage.app",
  messagingSenderId: "443536119611",
  appId: "1:443536119611:web:ecfb7377451c440271491e",
  measurementId: "G-YR062QNT4S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const soulsRef = collection(db, "souls");

// Add new soul
window.addSoul = async function() {
  const name = document.getElementById("soulName").value;
  const contact = document.getElementById("soulContact").value;
  const inviter = document.getElementById("soulInviter").value;

  if (!name || !contact || !inviter) {
    alert("Please fill all fields.");
    return;
  }

  await addDoc(soulsRef, {
    name,
    contact,
    inviter,
    dateAdded: new Date().toLocaleString()
  });

  document.getElementById("soulName").value = "";
  document.getElementById("soulContact").value = "";
  document.getElementById("soulInviter").value = "";
};

// Render souls
onSnapshot(soulsRef, (snapshot) => {
  const container = document.getElementById("soulsContainer");
  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const soul = docSnap.data();
    const card = document.createElement("div");
    card.className = "soul-card";
    card.innerHTML = `
      <h3>${soul.name}</h3>
      <p class="soul-meta">Contact: ${soul.contact}</p>
      <p class="soul-meta">Invited by: ${soul.inviter}</p>
      <p class="soul-meta">Added on: ${soul.dateAdded}</p>
    `;
    container.appendChild(card);
  });
});