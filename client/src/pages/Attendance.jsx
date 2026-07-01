import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Attendance.css";

function Attendance() {
  const [employees, setEmployees] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
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

  const fetchAttendance =
    async () => {
      try {
        const response =
          await api.get(
            "/attendance"
          );

        setAttendance(
          response.data.attendance
        );
      } catch (error) {
        console.log(error);
      }
    };

  const markAttendance =
    async (
      employeeId,
      status
    ) => {
      try {
        await api.post(
          "/attendance",
          {
            employee:
              employeeId,
            status,
          }
        );

        fetchAttendance();
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <div className="attendance-layout">
      <Sidebar />

      <div className="attendance-content">
        <h1>Attendance</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(
              (emp) => (
                <tr
                  key={
                    emp._id
                  }
                >
                  <td>
                    {emp.name}
                  </td>

                  <td>
                    {
                      emp.department
                    }
                  </td>

                  <td>
                    {
                      emp.designation
                    }
                  </td>

                  <td>
                    <button
                      className="present-btn"
                      onClick={() =>
                        markAttendance(
                          emp._id,
                          "Present"
                        )
                      }
                    >
                      Present
                    </button>

                    <button
                      className="absent-btn"
                      onClick={() =>
                        markAttendance(
                          emp._id,
                          "Absent"
                        )
                      }
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <h2>
          Attendance Records
        </h2>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map(
              (att) => (
                <tr
                  key={
                    att._id
                  }
                >
                  <td>
                    {
                      att
                        .employee
                        ?.name
                    }
                  </td>

                  <td>
                    {
                      att.status
                    }
                  </td>

                  <td>
                    {new Date(
                      att.date
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;