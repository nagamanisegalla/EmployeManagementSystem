let employees =
  JSON.parse(localStorage.getItem("employees")) || [];

let editId = null;

displayEmployees();

function addEmployee() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const department = document.getElementById("department").value;
  const designation =
    document.getElementById("designation").value;
  const salary =
    document.getElementById("salary").value;

  if (
    !name ||
    !email ||
    !phone ||
    !department ||
    !designation ||
    !salary
  ) {
    alert("Please fill all fields");
    return;
  }

  if (editId === null) {
    const employee = {
      id: Date.now(),
      name,
      email,
      phone,
      department,
      designation,
      salary,
    };

    employees.push(employee);
  } else {
    employees = employees.map((emp) => {
      if (emp.id === editId) {
        return {
          ...emp,
          name,
          email,
          phone,
          department,
          designation,
          salary,
        };
      }
      return emp;
    });

    editId = null;

    document.getElementById(
      "submitBtn"
    ).innerText = "Add Employee";
  }

  localStorage.setItem(
    "employees",
    JSON.stringify(employees)
  );

  displayEmployees();
  clearForm();
}

function displayEmployees(data = employees) {
  const tbody =
    document.getElementById("employeeTable");

  tbody.innerHTML = "";

  data.forEach((emp) => {
    tbody.innerHTML += `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
        <td>${emp.designation}</td>
        <td>₹${emp.salary}</td>
        <td>
          <button
            class="action-btn"
            onclick="editEmployee(${emp.id})"
          >
            Edit
          </button>

          <button
            class="action-btn"
            onclick="deleteEmployee(${emp.id})"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

function deleteEmployee(id) {
  employees = employees.filter(
    (emp) => emp.id !== id
  );

  localStorage.setItem(
    "employees",
    JSON.stringify(employees)
  );

  displayEmployees();
}

function editEmployee(id) {
  const employee = employees.find(
    (emp) => emp.id === id
  );

  document.getElementById("name").value =
    employee.name;

  document.getElementById("email").value =
    employee.email;

  document.getElementById("phone").value =
    employee.phone;

  document.getElementById("department").value =
    employee.department;

  document.getElementById("designation").value =
    employee.designation;

  document.getElementById("salary").value =
    employee.salary;

  editId = id;

  document.getElementById(
    "submitBtn"
  ).innerText = "Update Employee";
}

function searchEmployee() {
  const text = document
    .getElementById("search")
    .value
    .toLowerCase();

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(text) ||
      emp.email.toLowerCase().includes(text) ||
      emp.department.toLowerCase().includes(text)
  );

  displayEmployees(filtered);
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("department").value = "";
  document.getElementById("designation").value = "";
  document.getElementById("salary").value = "";
}