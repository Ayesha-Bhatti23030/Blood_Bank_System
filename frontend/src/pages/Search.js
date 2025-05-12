import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utilis/useAxios";
import "../styles/Search.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/hospitals/')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => {
        console.error("Error fetching hospitals", error);
      });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate("/results", { state: { query: search } });
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search hospital/ blood group/ blood component"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-bar"
      />

      <div className="hospital-grid">
        {hospitals.map((hospital) => (
          <div className="hospital-card" key={hospital.id} onClick={() => navigate(`/hospitals/${hospital.id}`)}>
            <img src={hospital.image ? `http://localhost:8000${hospital.image}` : null} alt={hospital.name} />

            <h4>{hospital.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
