import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
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

const membersRef = collection(db, "members");

onSnapshot(membersRef, (snapshot) => {
  const members = [];
  snapshot.forEach(doc => members.push(doc.data()));
  renderCharts(members);
});

function renderCharts(members) {
  const classCounts = Array(7).fill(0);
  let completedAll = 0;
  let incomplete = 0;
  const attendanceByWeek = {};

  members.forEach(member => {
    const progress = member.foundationProgress || {};
    const attendance = member.attendance || {};

    let allCompleted = true;
    for (let i = 1; i <= 7; i++) {
      if (progress[`class${i}`]) classCounts[i - 1]++;
      else allCompleted = false;
    }
    allCompleted ? completedAll++ : incomplete++;

    Object.values(attendance).flat().forEach(date => {
      const week = date.slice(0, 7); // "YYYY-MM"
      attendanceByWeek[week] = (attendanceByWeek[week] || 0) + 1;
    });
  });

  new Chart(document.getElementById("classCompletionChart"), {
    type: "bar",
    data: {
      labels: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7"],
      datasets: [{
        label: "Members Completed",
        data: classCounts,
        backgroundColor: "#0077cc"
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: "Class Completion Overview" } }
    }
  });

  new Chart(document.getElementById("completionStatusChart"), {
    type: "pie",
    data: {
      labels: ["Completed All", "Still In Progress"],
      datasets: [{
        data: [completedAll, incomplete],
        backgroundColor: ["#28a745", "#dc3545"]
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: "Overall Completion Status" } }
    }
  });

  const weeks = Object.keys(attendanceByWeek).sort();
  const counts = weeks.map(w => attendanceByWeek[w]);

  new Chart(document.getElementById("attendanceTrendChart"), {
    type: "line",
    data: {
      labels: weeks,
      datasets: [{
        label: "Attendance Entries",
        data: counts,
        borderColor: "#17a2b8",
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: "Weekly Attendance Trend" } }
    }
  });
}