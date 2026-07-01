import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Employees.css";

function Employees() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user?.role === "Employee") {
    return <Navigate to="/dashboard" />;
  }

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    password: "",
  });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get(
        "/employees"
      );

      setEmployees(
        response.data.employees
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
      password: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/employees/${editingId}`,
          formData
        );
      } else {
        await api.post(
          "/employees",
          formData
        );
      }

      fetchEmployees();
      clearForm();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message
      );
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department:
        employee.department,
      designation:
        employee.designation,
      salary: employee.salary,
      password: "",
    });

    setEditingId(employee._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this employee?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/employees/${id}`
      );

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="employee-layout">
      <Sidebar />

      <div className="employee-content">
        <h1>Employees</h1>

        <form
          className="employee-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          {!editingId && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">
            {editingId
              ? "Update Employee"
              : "Add Employee"}
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>
                  {emp.designation}
                </td>
                <td>{emp.salary}</td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(emp)
                    }
                  >
                    Edit
                  </button>

                  {user.role ===
                    "Admin" && (
                    <button
                      onClick={() =>
                        handleDelete(
                          emp._id
                        )
                      }
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;