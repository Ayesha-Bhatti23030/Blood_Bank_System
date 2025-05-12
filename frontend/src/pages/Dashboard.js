import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utilis/useAxios";  // Assuming you are using a custom Axios hook
import "../styles/Dashboard.css";
import { FaTint, FaHandHoldingHeart, FaUsers, FaBoxes } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();  
  const { logoutUser, user } = useContext(AuthContext);  // Assuming 'user' contains the logged-in user info
  const api = useAxios();
  const [hospitalName, setHospitalName] = useState("");

  useEffect(() => {
    const fetchHospitalName = async () => {
      try {
        const response = await api.get('/hospitalprofile/');  // Fetch hospital profile
        if (response.data && response.data.name) {
          setHospitalName(response.data.name);  // Assuming name is part of the response
        } else {
          setHospitalName("Hospital Name Not Available");
        }
      } catch (error) {
        console.error('Error fetching hospital profile:', error);
        setHospitalName("Hospital Name Not Available");
      }
    };

    if (user) {
      fetchHospitalName();  // Only fetch if the user is logged in
    }
  }, [user, api]);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="dashboard-container">
      {/* Full-width header with left, center, right alignment */}
      <header className="header">
        <button className="header-button" onClick={handleLogout}>Home</button>
        <div className="header-title">
          <h2>Welcome {hospitalName}</h2> {/* Display the hospital name */}
        </div>
        <button className="header-button" onClick={handleLogout}>Logout</button>
      </header>

      {/* Left-aligned card grid */}
      <div className="dashboard-grid">
        <div className="card" onClick={() => navigate("/search")}>
          <FaTint className="card-icon" />
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
