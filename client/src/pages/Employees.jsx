import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Employees.css";

function Employees() {
  const [employees, setEmployees] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response =
        await api.get("/employees");

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

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
      });

      setEditingId(null);
    } catch (error) {
      console.log(error);
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
    });

    setEditingId(employee._id);
  };

  const handleDelete = async (id) => {
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
          onSubmit={handleSubmit}
          className="employee-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />

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
                <td>{emp.designation}</td>
                <td>{emp.salary}</td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(emp)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        emp._id
                      )
                    }
                  >
                    Delete
                  </button>
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