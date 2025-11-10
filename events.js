import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment
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
const eventsRef = collection(db, "events");

// Temporary user identifier (replace with Firebase Auth later)
const currentUser = "TWINOMUJUNI";

// Post a new event
window.postEvent = async function() {
  const title = document.getElementById("eventTitle").value;
  const body = document.getElementById("eventBody").value;
  const person = document.getElementById("eventPerson").value;

  if (!title || !body || !person) {
    alert("Please fill all fields.");
    return;
  }

  await addDoc(eventsRef, {
    title,
    body,
    person,
    likes: 0,
    likedBy: [],
    time: new Date().toLocaleString()
  });

  document.getElementById("eventTitle").value = "";
  document.getElementById("eventBody").value = "";
  document.getElementById("eventPerson").value = "";
};

// Render events
onSnapshot(eventsRef, (snapshot) => {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const event = docSnap.data();
    const eventId = docSnap.id;

    const hasLiked = event.likedBy?.includes(currentUser);

    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.body}</p>
      <p class="event-meta">Posted by ${event.person} on ${event.time}</p>
      <p>❤️ ${event.likes} likes</p>
      <button class="like-btn" onclick="toggleLike('${eventId}', ${hasLiked})">
        ${hasLiked ? "💔 Unlike" : "👍 Like"}
      </button>
    `;
    container.appendChild(card);
  });
});

// Toggle like/unlike
window.toggleLike = async function(id, hasLiked) {
  const docRef = doc(db, "events", id);

  if (hasLiked) {
    // Unlike: remove user, decrement likes
    await updateDoc(docRef, {
      likes: increment(-1),
      likedBy: arrayRemove(currentUser)
    });
  } else {
    // Like: add user, increment likes
    await updateDoc(docRef, {
      likes: increment(1),
      likedBy: arrayUnion(currentUser)
    });
  }
};