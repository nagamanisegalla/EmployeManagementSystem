const role = localStorage.getItem("role");

document.getElementById(
  "welcome"
).innerText = `Welcome ${role}`;

loadDashboard();
loadActivities();

function loadDashboard() {
  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  const leaves =
    JSON.parse(localStorage.getItem("leaves")) || [];

  const today =
    new Date().toISOString().split("T")[0];

  const presentCount = attendance.filter(
    (att) =>
      att.date === today &&
      att.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (att) =>
      att.date === today &&
      att.status === "Absent"
  ).length;

  const pendingLeaves = leaves.filter(
    (leave) =>
      leave.status === "Pending"
  ).length;

  document.getElementById(
    "totalEmployees"
  ).innerText = employees.length;

  document.getElementById(
    "presentToday"
  ).innerText = presentCount;

  document.getElementById(
    "absentToday"
  ).innerText = absentCount;

  document.getElementById(
    "pendingLeaves"
  ).innerText = pendingLeaves;
}

function loadActivities() {
  const activities =
    document.getElementById("activities");

  const attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  activities.innerHTML = "";

  if (attendance.length === 0) {
    activities.innerHTML =
      "<li>No activities found.</li>";
    return;
  }

  const recentActivities =
    attendance.slice(-5).reverse();

  recentActivities.forEach((att) => {
    activities.innerHTML += `
      <li>
        ${att.employeeName}
        marked
        <strong>${att.status}</strong>
        on
        ${att.date}
      </li>
    `;
  });
}

function logout() {
  localStorage.removeItem("role");
  window.location.href = "login.html";
}