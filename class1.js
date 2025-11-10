const students = [
  { name: "John Doe", lessons: [false, false, false] },
  { name: "Grace Namutebi", lessons: [true, false, true] }
];

function renderTable() {
  const table = document.getElementById("attendanceTable");
  table.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    student.lessons.forEach((attended, lessonIndex) => {
      const cell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = attended;
      checkbox.addEventListener("change", () => {
        students[index].lessons[lessonIndex] = checkbox.checked;
      });
      cell.appendChild(checkbox);
      row.appendChild(cell);
    });

    table.appendChild(row);
  });
}

function addStudent() {
  const name = prompt("Enter student name:");
  if (name) {
    students.push({ name, lessons: [false, false, false] });
    renderTable();
  }
}

renderTable();