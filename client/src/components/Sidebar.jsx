import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Sidebar.css";

function Sidebar() {
  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>EMS</h2>

      <ul>
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        {/* Admin and HR only */}
        {user?.role !== "Employee" && (
          <li>
            <Link to="/employees">
              Employees
            </Link>
          </li>
        )}

        <li>
          <Link to="/attendance">
            Attendance
          </Link>
        </li>

        <li>
  <Link to="/profile">
    My Profile
  </Link>
</li>

        <li>
          <Link to="/leaves">
            Leaves
          </Link>
        </li>

        <li onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;