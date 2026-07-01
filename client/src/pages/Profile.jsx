import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await api.get(
        "/users/profile"
      );

      setProfile(response.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <Sidebar />

      <div className="profile-container">
        <h1>My Profile</h1>

        <div className="profile-card">
          <p>
            <strong>Name:</strong>{" "}
            {profile.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {profile.email}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {profile.role}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {profile.phone || "N/A"}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {profile.department || "N/A"}
          </p>

          <p>
            <strong>Designation:</strong>{" "}
            {profile.designation || "N/A"}
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            {profile.salary || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;