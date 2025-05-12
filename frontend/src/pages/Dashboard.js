import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/Dashboard.css";
import {
  FaTint,
  FaBolt,
  FaCertificate,
  FaChartLine,
  FaUsers,
  FaProjectDiagram,
  FaUserPlus,
  FaThLarge,
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
        <div className="card">
          <FaTint className="card-icon" onClick={() => navigate("/search")} /> {/* Use navigate() here */}
          <h3>Request Blood</h3>
          <p>Request required blood</p>
        </div>
        <div className="card">
          <FaBolt className="card-icon" />
          <h3>Donors</h3>
          <p>Donor info</p>
        </div>
        <div className="card">
          <FaCertificate className="card-icon" />
          <h3>Certificates</h3>
          <p>Print certificates</p>
        </div>
        <div className="card">
          <FaChartLine className="card-icon" />
          <h3>Stock</h3>
          <p>Blood stock details</p>
        </div>
        <div className="card">
          <FaUsers className="card-icon" />
          <h3>Requests</h3>
          <p>Handle requests</p>
        </div>
        <div className="card">
          <FaProjectDiagram className="card-icon" />
          <h3>Projects</h3>
          <p>Hospital reports</p>
        </div>
        <div className="card">
          <FaUserPlus className="card-icon" />
          <h3>Register Donor</h3>
          <p>Add new donor</p>
        </div>
        <div className="card">
          <FaThLarge className="card-icon" />
          <h3>View All</h3>
          <p>All records</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
