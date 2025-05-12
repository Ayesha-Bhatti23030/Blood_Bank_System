import React, { useState, useEffect } from "react";
import "../styles/Results.css";
import "../styles/Search.css";
import { useLocation } from "react-router-dom";
import useAxios from "../utilis/useAxios";
import notFoundImage from "../images/notfound.png";

const BloodResults = () => {
  const location = useLocation();
  const query = location.state?.query || "";
  const [search, setSearch] = useState(query);
  const [bloodData, setBloodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const axiosInstance = useAxios();

  const fetchBloodData = async () => {
    try {
      const params = new URLSearchParams();

      if (search) {
        params.append("blood_group", search); // You can enhance this to parse blood group/component separately
      }

      const response = await axiosInstance.get(`/blood-search/?${params.toString()}`);
      setBloodData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching blood data:", error);
      setBloodData([]); // Reset on error
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchBloodData();
    // eslint-disable-next-line
  }, []);

  // Refetch if user changes the search term
  useEffect(() => {
    if (!search) {
      setFilteredData(bloodData);
      return;
    }

    const filtered = bloodData.filter((item) =>
      `${item.hospital_name} ${item.blood_group} ${item.blood_component}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredData(filtered);
  }, [search, bloodData]);

  return (
    <div className="blood-results-container">
      <input
        type="text"
        placeholder="Search by hospital, blood group or component"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {filteredData.length > 0 ? (
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
            {filteredData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.hospital_name}</td>
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
