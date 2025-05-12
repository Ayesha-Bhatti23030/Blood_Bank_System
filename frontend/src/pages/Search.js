/*import React, { useState } from "react";
import "../styles/Search.css";

import aghaKhanImage from "../images/agha khan.png";
import generalHospitalImage from "../images/liaquat hospital.png";
import sunriseMedicalImage from "../images/jpmc.png";
import redCrossClinicImage from "../images/fatimid.png";
import healthFirstImage from "../images/nicvd.png";
import wellCareCenterImage from "../images/husaini.png";
import trustHospitalImage from "../images/chughtai.png";
import medlineHospitalImage from "../images/pwa.png";

const hospitals = [
  { name: "Agha Khan Hospital", image: aghaKhanImage },
  { name: "Liaquat National Hospital", image: generalHospitalImage },
  { name: "Jinnah Medical Center", image: sunriseMedicalImage },
  { name: "Fatimid Foundation Blood Bank", image: redCrossClinicImage },
  { name: "National Institute of Cardivascular Disease (NICVD)", image: healthFirstImage },
  { name: "Husaini Blood Bank", image: wellCareCenterImage },
  { name: "Chughtai Blood Center", image: trustHospitalImage },
  { name: "PWA Blood Bank", image: medlineHospitalImage },
];

const Search = () => {
  const [search, setSearch] = useState("");

  const filtered = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search hospital/ blood"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="hospital-grid">
        {filtered.map((h, i) => (
          <div className="hospital-card" key={i}>
            <img src={h.image} alt={h.name} />
            <h4>{h.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;*/
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar"; // path as per your structure


import aghaKhanImage from "../images/agha khan.png";
import generalHospitalImage from "../images/liaquat hospital.png";
import sunriseMedicalImage from "../images/jpmc.png";
import redCrossClinicImage from "../images/fatimid.png";
import healthFirstImage from "../images/nicvd.png";
import wellCareCenterImage from "../images/husaini.png";
import trustHospitalImage from "../images/chughtai.png";
import medlineHospitalImage from "../images/pwa.png";

const hospitals = [
  { id: 1, name: "Agha Khan Hospital", image: aghaKhanImage },
  { id: 2, name: "Liaquat National Hospital", image: generalHospitalImage },
  { id: 3, name: "Jinnah Medical Center", image: sunriseMedicalImage },
  { id: 4, name: "Fatimid Foundation Blood Bank", image: redCrossClinicImage },
  { id: 5, name: "National Institute of Cardivascular Disease (NICVD)", image: healthFirstImage },
  { id: 6, name: "Husaini Blood Bank", image: wellCareCenterImage },
  { id: 7, name: "Chughtai Blood Center", image: trustHospitalImage },
  { id: 8, name: "PWA Blood Bank", image: medlineHospitalImage },
];

const Search = () => {
  const [search, setSearch] = useState("");

  const filtered = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();

  const handleCardClick = (id) => {
  navigate(`/hospitals/${id}`);
  };

  return (
    <div className="search-container">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="hospital-grid">
      {filtered.map((h, i) => (
        <div className="hospital-card" key={i} onClick={() => handleCardClick(h.id)} style={{ cursor: 'pointer' }}>
        <img src={h.image} alt={h.name} />
        <h4>{h.name}</h4>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
