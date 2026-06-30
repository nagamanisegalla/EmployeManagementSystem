const employees =
  JSON.parse(localStorage.getItem("employees")) || [];

let leaves =
  JSON.parse(localStorage.getItem("leaves")) || [];

loadEmployees();
displayLeaves();

function loadEmployees() {
  const select =
    document.getElementById("employee");

  employees.forEach((emp) => {
    select.innerHTML += `
      <option value="${emp.id}">
        ${emp.name}
      </option>
    `;
  });
}

function applyLeave() {
  const employeeId =
    Number(document.getElementById("employee").value);

  const fromDate =
    document.getElementById("fromDate").value;

  const toDate =
    document.getElementById("toDate").value;

  const reason =
    document.getElementById("reason").value;

  if (
    !employeeId ||
    !fromDate ||
    !toDate ||
    !reason
  ) {
    alert("Please fill all fields.");
    return;
  }

  const employee =
    employees.find(
      (emp) => emp.id === employeeId
    );

  const leave = {
    id: Date.now(),
    employeeId,
    employeeName: employee.name,
    fromDate,
    toDate,
    reason,
    status: "Pending",
  };

  leaves.push(leave);

  localStorage.setItem(
    "leaves",
    JSON.stringify(leaves)
  );

  displayLeaves();
  clearForm();
}

function displayLeaves() {
  const tbody =
    document.getElementById("leaveTable");

  tbody.innerHTML = "";

  leaves.forEach((leave) => {
    tbody.innerHTML += `
      <tr>
        <td>${leave.employeeName}</td>
        <td>${leave.fromDate}</td>
        <td>${leave.toDate}</td>
        <td>${leave.reason}</td>
        <td>${leave.status}</td>
        <td>
          ${
            leave.status === "Pending"
              ? `
            <button onclick="approveLeave(${leave.id})">
              Approve
            </button>

            <button onclick="rejectLeave(${leave.id})">
              Reject
            </button>
          `
              : "-"
          }
        </td>
      </tr>
    `;
  });
}

function approveLeave(id) {
  leaves = leaves.map((leave) => {
    if (leave.id === id) {
      leave.status = "Approved";
    }
    return leave;
  });

  localStorage.setItem(
    "leaves",
    JSON.stringify(leaves)
  );

  displayLeaves();
}

function rejectLeave(id) {
  leaves = leaves.map((leave) => {
    if (leave.id === id) {
      leave.status = "Rejected";
    }
    return leave;
  });

  localStorage.setItem(
    "leaves",
    JSON.stringify(leaves)
  );

  displayLeaves();
}

function clearForm() {
  document.getElementById("employee").value =
    "";

  document.getElementById("fromDate").value =
    "";

  document.getElementById("toDate").value =
    "";

  document.getElementById("reason").value =
    "";
}