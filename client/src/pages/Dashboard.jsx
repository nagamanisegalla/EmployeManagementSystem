import "./Dashboard.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    pendingLeaves: 0,
  });

  useEffect(() => {
    getDashboardStats();
  }, []);

  const getDashboardStats = async () => {
    try {
      const response = await api.get(
        "/dashboard/stats"
      );

      setStats({
        totalEmployees:
          response.data.totalEmployees,
        presentToday:
          response.data.presentToday,
        absentToday:
          response.data.absentToday,
        pendingLeaves:
          response.data.pendingLeaves,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Total Employees</h3>
            <h2>
              {stats.totalEmployees}
            </h2>
          </div>

          <div className="card">
            <h3>Present Today</h3>
            <h2>
              {stats.presentToday}
            </h2>
          </div>

          <div className="card">
            <h3>Absent Today</h3>
            <h2>
              {stats.absentToday}
            </h2>
          </div>

          <div className="card">
            <h3>Pending Leaves</h3>
            <h2>
              {stats.pendingLeaves}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;