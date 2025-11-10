window.addEventListener("load", () => {
  const db = window.db;
  const collection = window.firestoreCollection;
  const doc = window.firestoreDoc;
  const deleteDoc = window.firestoreDeleteDoc;
  const updateDoc = window.firestoreUpdateDoc;
  const onSnapshot = window.firestoreOnSnapshot;

  let members = [];

  function listenToMembers() {
    const membersRef = collection(db, "members");
    onSnapshot(membersRef, (snapshot) => {
      members = [];
      snapshot.forEach((docSnap) => {
        members.push({ id: docSnap.id, ...docSnap.data() });
      });
      renderTable();
    });
  }

  function renderProgress(progress) {
    if (!progress) return "—";
    const completed = Object.entries(progress)
      .filter(([_, done]) => done)
      .map(([cls]) => cls.replace("class", "C"));
    return completed.length ? completed.join(", ") : "None";
  }

  function renderAttendance(attendance) {
    if (!attendance) return "—";
    const summary = Object.entries(attendance)
      .map(([cls, dates]) => `${cls.replace("class", "C")}: ${dates.length}x`)
      .join(" | ");
    return summary || "None";
  }

  function renderTable() {
    const table = document.getElementById("memberTable");
    const search = document.getElementById("searchInput").value.toLowerCase();
    table.innerHTML = "";

    members
      .filter(m =>
        (m.name && m.name.toLowerCase().includes(search)) ||
        (m.location && m.location.toLowerCase().includes(search)) ||
        (m.phone && m.phone.toLowerCase().includes(search)) ||
        (m.email && m.email.toLowerCase().includes(search)) ||
        (m.class && m.class.toLowerCase().includes(search))
      )
      .forEach((member) => {
        const completedAll = member.foundationProgress &&
          Object.keys(member.foundationProgress).length === 7 &&
          Object.values(member.foundationProgress).every(v => v === true);

        const certButton = completedAll
          ? `<button onclick="generateCertificate('${member.id}')">🎓 Certificate</button>`
          : "";

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member.name || ""}</td>
          <td>${member.phone || ""}</td>
          <td>${member.email || ""}</td>
          <td>${member.location || ""}</td>
          <td>${member.class || ""}</td>
          <td>${member.joined || ""}</td>
          <td>${renderProgress(member.foundationProgress)}</td>
          <td>${renderAttendance(member.attendance)}</td>
          <td>
            <button class="edit" onclick="editMember('${member.id}')">Edit</button>
            <button class="delete" onclick="deleteMember('${member.id}')">Delete</button>
            ${certButton}
          </td>
        `;
        table.appendChild(row);
      });
  }

  window.editMember = function(id) {
    const member = members.find(m => m.id === id);
    const newName = prompt("Edit name:", member.name);
    const newClasses = prompt("Enter completed classes (e.g. 1,3,5):", "");
    const newAttendance = prompt("Enter attendance (e.g. C1:2025-11-01,C2:2025-11-15):", "");

    const updates = {};
    if (newName && newName !== member.name) {
      updates.name = newName;
    }

    if (newClasses) {
      const classList = newClasses.split(",").map(c => c.trim());
      const progress = {};
      for (let i = 1; i <= 7; i++) {
        progress[`class${i}`] = classList.includes(i.toString());
      }
      updates.foundationProgress = progress;
    }

    if (newAttendance) {
      const attendance = {};
      const entries = newAttendance.split(",");
      entries.forEach(entry => {
        const [cls, date] = entry.split(":");
        const key = `class${cls.replace("C", "")}`;
        if (!attendance[key]) attendance[key] = [];
        attendance[key].push(date);
      });
      updates.attendance = attendance;
    }

    if (Object.keys(updates).length > 0) {
      const docRef = doc(db, "members", id);
      updateDoc(docRef, updates)
        .then(() => {
          alert("Member updated.");
        })
        .catch((error) => {
          console.error("Error updating member:", error);
          alert("Failed to update member.");
        });
    }
  };

  window.deleteMember = function(id) {
    if (confirm("Are you sure you want to delete this member?")) {
      const docRef = doc(db, "members", id);
      deleteDoc(docRef)
        .then(() => {
          alert("Member deleted.");
        })
        .catch((error) => {
          console.error("Error deleting member:", error);
          alert("Failed to delete member.");
        });
    }
  };

  window.generateCertificate = function(id) {
    window.open(`certificate.html?id=${id}`, "_blank");
  };

  window.exportToExcel = function() {
    let table = document.getElementById("memberDataTable");
    let html = table.outerHTML.replace(/<button.*?<\/button>/g, "");
    let url = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    let link = document.createElement("a");
    link.href = url;
    link.download = "BLW_Member_Database.xls";
    link.click();
  };

  document.getElementById("searchInput").addEventListener("input", renderTable);

  listenToMembers();
});