import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/Dashboard.css";
import {
  FaTint,
  FaHandHoldingHeart,
  FaUsers,
  FaBoxes,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();  // useNavigate hook to navigate

  const handleLogout = () => {
    logoutUser();  // <-- This will clear auth, navigate to home, and show the alert
  };

  const { logoutUser } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      {/* Full-width header with left, center, right alignment */}
      <header className="header">
        <button className="header-button" onClick={handleLogout}>  {/* Use navigate() here */}
          Home
        </button>
        <div className="header-title">
          Blood Bank Management and Donation System
        </div>
        <button className="header-button" onClick={handleLogout}>  {/* Use navigate() here */}
          Logout
        </button>
      </header>

      {/* Left-aligned card grid */}
      <div className="dashboard-grid">
        <div className="card" onClick={() => navigate("/search")}>
          <FaTint className="card-icon"/> {/* Use navigate() here */}
          <h3>Request Blood</h3>
          <p>Request required blood</p>
        </div>
        <div className="card" onClick={() => navigate("/donor")}>
          <FaHandHoldingHeart className="card-icon" />
          <h3>Manage Donors</h3>
          <p>Add, delete or edit donor info</p>
        </div>
        <div className="card" onClick={() => navigate("/attendant")}>
          <FaUsers className="card-icon" />
          <h3>Manage Attendants</h3>
          <p>Add, delete or edit attendant info</p>
        </div>
        <div className="card" onClick={() => navigate("/bloodstock")}>
          <FaBoxes className="card-icon" />
          <h3>Blood Stock</h3>
          <p>Add, delete or edit blood stock details</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
