import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTint, FaHandsHelping, FaBullseye, FaHeart } from "react-icons/fa";
import '../styles/Dashboard.css'; // Assuming same styles are used as Dashboard

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Header like the Dashboard */}
      <header className="header">
        <button className="header-button" onClick={() => navigate("/register")}>
          Register
        </button>
        <div className="header-title">
          Blood Bank Management and Donation System
        </div>
        <button className="header-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      {/* Welcome Section */}
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "36px", color: "#1E40AF", marginBottom: "10px" }}>
          Welcome!
        </h1>
        <p style={{ fontSize: "18px", color: "#555", maxWidth: "600px", margin: "0 auto" }}>
          This is the Blood Bank and Management System. Manage your blood requests, donations,
          and keep track of all activities smoothly.
        </p>
      </div>

      {/* Grid of cards */}
      <div className="dashboard-grid">
        <div className="card">
          <FaTint className="card-icon" />
          <h3>Request Blood</h3>
          <p>Request required blood easily.</p>
        </div>
        
        <div className="card">
          <FaHandsHelping className="card-icon" />
          <h3>Donate Blood</h3>
          <p>Register to donate and help save lives.</p>
        </div>

        <div className="card">
          <FaBullseye className="card-icon" />
          <h3>Our Mission</h3>
          <p>We aim to ensure blood availability for everyone in need.</p>
        </div>

        <div className="card">
          <FaHeart className="card-icon" />
          <h3>Why Donate?</h3>
          <p>Every donation can save up to 3 lives. Be a hero today!</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            <strong>Contact Us:</strong> info@bloodbank.com | +1 (234) 567-890
          </p>
          <p 
            style={{ cursor: "pointer", textDecoration: "underline", color: "#1E40AF" }}
            onClick={() => navigate("/about")}
          >
            About Us
          </p>
          <p>© {new Date().getFullYear()} Blood Bank Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
