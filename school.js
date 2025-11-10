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

window.openClass = async function(classNumber) {
  const classId = `class${classNumber}`;
  const docRef = doc(db, "foundationClasses", classId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    alert(`Class ${classNumber}\nTopic: ${data.topic}\nInstructor: ${data.instructor}\nSchedule: ${data.schedule}`);
  } else {
    alert(`No data found for Class ${classNumber}`);
  }
};