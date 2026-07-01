import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Leaves.css";

function Leaves() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [formData, setFormData] = useState({
    employee: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchLeaves();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leaves");
      setLeaves(response.data.leaves);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const applyLeave = async (e) => {
    e.preventDefault();

    try {
      await api.post("/leaves", formData);

      setFormData({
        employee: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/leaves/${id}`, {
        status,
      });

      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="leave-layout">
      <Sidebar />

      <div className="leave-content">
        <h1>Leave Management</h1>

        <form
          className="leave-form"
          onSubmit={applyLeave}
        >
          <select
            name="employee"
            value={formData.employee}
            onChange={handleChange}
          >
            <option value="">
              Select Employee
            </option>

            {employees.map((emp) => (
              <option
                key={emp._id}
                value={emp._id}
              >
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
          />

          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
          />

          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
          />

          <button type="submit">
            Apply Leave
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>
                  {leave.employee?.name}
                </td>

                <td>
                  {new Date(
                    leave.fromDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {new Date(
                    leave.toDate
                  ).toLocaleDateString()}
                </td>

                <td>{leave.reason}</td>

                <td>{leave.status}</td>

                <td>
                  {leave.status ===
                    "Pending" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateStatus(
                            leave._id,
                            "Approved"
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateStatus(
                            leave._id,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
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

export default Leaves;