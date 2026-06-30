import "./Dashboard.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    pendingLeaves: 0,
  });

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardStats();
  }, []);

  const getDashboardStats = async () => {
    try {
      const response = await api.get("/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* Add button here */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Employees</h3>
          <h2>{stats.totalEmployees}</h2>
        </div>

        <div className="card">
          <h3>Present Today</h3>
          <h2>{stats.presentToday}</h2>
        </div>

        <div className="card">
          <h3>Absent Today</h3>
          <h2>{stats.absentToday}</h2>
        </div>

        <div className="card">
          <h3>Pending Leaves</h3>
          <h2>{stats.pendingLeaves}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;