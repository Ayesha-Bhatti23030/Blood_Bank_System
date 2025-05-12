import React, { useEffect, useState } from "react";
import "../styles/Results.css"; 
import "../styles/Search.css";
import { useLocation } from "react-router-dom";
import notFoundImage from "../images/notfound.png";
import useAxios from "../utilis/useAxios"; // your custom axios hook
import { Link } from "react-router-dom";

const BloodResults = () => {
  const location = useLocation();
  const query = location.state?.query || ""; // A+, B+, etc.
  const [search, setSearch] = useState(query);
  const [bloodData, setBloodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
  const fetchBloodData = async () => {
    try {
      const response = await axiosInstance.get(`/search/?query=${encodeURIComponent(search)}`);
      const data = response.data;

      const combined = data.map(item => ({
        hospital_id: item.hospital_id, 
        hospital_name: item.hospital_name,
        blood_group: item.blood_group,
        blood_component: item.blood_component,
        quantity: item.quantity,
        price: item.price
      }));

      setBloodData(combined);
    } catch (error) {
      console.error("Error fetching blood data:", error);
      setBloodData([]);
    } finally {
      setLoading(false);
    }
  };

  if (search.trim() !== "") {
    fetchBloodData();
  } else {
    setBloodData([]);
    setLoading(false);
  }
}, [search, axiosInstance]);

  const filteredResults = bloodData.filter((item) =>
    `${item.hospital_name} ${item.blood_group} ${item.blood_component}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="blood-results-container">
      <input
        type="text"
        placeholder="Search by hospital, blood group or component"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Blood Group</th>
              <th>Component</th>
              <th>Units Available</th>
              <th>Price/Unit</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((entry, index) => (
              <tr key={index}>
                  <td>
                  <Link to={`/hospitals/${entry.hospital_id}`} className="hospital-link">
                    {entry.hospital_name}
                  </Link>
                </td>
                <td>{entry.blood_group}</td>
                <td>{entry.blood_component}</td>
                <td>{entry.quantity}</td>
                <td>{entry.price}</td>
                <td>
                  <button className="request-btn">Request</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-matches">
          <img
            src={notFoundImage}
            alt="No matches found"
            className="no-results-img"
          />
          <p>No matches Found.</p>
        </div>
      )}
    </div>
  );
};

export default BloodResults;
