import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>

      {/* Employees */}
      <Route
        path="/employees"
        element={
          <PrivateRoute>
            <RoleProtectedRoute
              allowedRoles={[
                "Admin",
                "HR Manager",
              ]}
            >
              <Employees />
            </RoleProtectedRoute>
          </PrivateRoute>
        }
      />

      {/* Attendance */}
      <Route
        path="/attendance"
        element={
          <PrivateRoute>
            <Attendance />
          </PrivateRoute>
        }
      />

      {/* Leaves */}
      <Route
        path="/leaves"
        element={
          <PrivateRoute>
            <Leaves />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;