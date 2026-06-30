const employees =
  JSON.parse(localStorage.getItem("employees")) || [];

let attendance =
  JSON.parse(localStorage.getItem("attendance")) || [];

displayAttendance();

function displayAttendance() {
  const tbody =
    document.getElementById("attendanceTable");

  tbody.innerHTML = "";

  const today =
    new Date().toISOString().split("T")[0];

  employees.forEach((emp) => {
    const todayAttendance = attendance.find(
      (att) =>
        att.employeeId === emp.id &&
        att.date === today
    );

    let statusHTML = `
      <button
        class="present"
        onclick="markAttendance(${emp.id},'Present')"
      >
        Present
      </button>

      <button
        class="absent"
        onclick="markAttendance(${emp.id},'Absent')"
      >
        Absent
      </button>
    `;

    if (todayAttendance) {
      statusHTML = `
        <span class="${
          todayAttendance.status === "Present"
            ? "present-text"
            : "absent-text"
        }">
          ${todayAttendance.status}
        </span>
      `;
    }

    tbody.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.designation}</td>
        <td>${statusHTML}</td>
      </tr>
    `;
  });
}

function markAttendance(id, status) {
  const employee =
    employees.find((emp) => emp.id === id);

  const today =
    new Date().toISOString().split("T")[0];

  const alreadyMarked = attendance.find(
    (att) =>
      att.employeeId === id &&
      att.date === today
  );

  if (alreadyMarked) {
    alert("Attendance already marked.");
    return;
  }

  const attendanceObj = {
    employeeId: employee.id,
    employeeName: employee.name,
    department: employee.department,
    designation: employee.designation,
    date: today,
    status: status,
  };

  attendance.push(attendanceObj);

  localStorage.setItem(
    "attendance",
    JSON.stringify(attendance)
  );

  displayAttendance();
}

function getPresentCount() {
  const today =
    new Date().toISOString().split("T")[0];

  return attendance.filter(
    (att) =>
      att.date === today &&
      att.status === "Present"
  ).length;
}

function getAbsentCount() {
  const today =
    new Date().toISOString().split("T")[0];

  return attendance.filter(
    (att) =>
      att.date === today &&
      att.status === "Absent"
  ).length;
}