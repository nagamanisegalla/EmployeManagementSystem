import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Leaves.css";

function Leaves() {
  const [employees, setEmployees] =
    useState([]);

  const [leaves, setLeaves] =
    useState([]);

  const [formData, setFormData] =
    useState({
      employee: "",
      leaveType: "Casual Leave",
      fromDate: "",
      toDate: "",
      reason: "",
    });

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchEmployees();
    fetchLeaves();
  }, []);

  const fetchEmployees =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/employees",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setEmployees(
          res.data.employees
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchLeaves = async () => {
    try {
      const res =
        await axios.get(
          "http://localhost:5000/api/leaves",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setLeaves(res.data.leaves);
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

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/leaves",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        employee: "",
        leaveType:
          "Casual Leave",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate =
    async (id, status) => {
      try {
        await axios.put(
          `http://localhost:5000/api/leaves/${id}`,
          {
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchLeaves();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="leaves-container">
      <Sidebar />

      <div className="leaves-content">
        <h1>
          Leave Management
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="leave-form"
        >
          <select
            name="employee"
            value={
              formData.employee
            }
            onChange={
              handleChange
            }
            required
          >
            <option value="">
              Select Employee
            </option>

            {employees.map(
              (emp) => (
                <option
                  key={emp._id}
                  value={
                    emp._id
                  }
                >
                  {emp.name}
                </option>
              )
            )}
          </select>

          <input
            type="date"
            name="fromDate"
            value={
              formData.fromDate
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="date"
            name="toDate"
            value={
              formData.toDate
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={
              formData.reason
            }
            onChange={
              handleChange
            }
            required
          />

          <button
            type="submit"
          >
            Apply Leave
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>
                Employee
              </th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>

              {(user.role ===
                "Admin" ||
                user.role ===
                  "HR Manager") && (
                <th>
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {leaves.map(
              (leave) => (
                <tr
                  key={
                    leave._id
                  }
                >
                  <td>
                    {
                      leave
                        .employee
                        ?.name
                    }
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

                  <td>
                    {
                      leave.reason
                    }
                  </td>

                  <td>
                    {
                      leave.status
                    }
                  </td>

                  {(user.role ===
                    "Admin" ||
                    user.role ===
                      "HR Manager") && (
                    <td>
                      {leave.status ===
                        "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(
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
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaves;