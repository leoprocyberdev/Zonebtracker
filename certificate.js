import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

const urlParams = new URLSearchParams(window.location.search);
const memberId = urlParams.get("id");

async function loadCertificate() {
  if (!memberId) return;
  const docRef = doc(db, "members", memberId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const name = data.name;
    const date = new Date().toLocaleDateString();
    document.getElementById("name").textContent = name;
    document.getElementById("date").textContent = date;
  } else {
    document.body.innerHTML = "<h2>Member not found</h2>";
  }
}

loadCertificate();