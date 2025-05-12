import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css"; 
import AuthContext from "../context/AuthContext";

function Registration() {
 
  const [errorMessage, setErrorMessage] = useState("");
  
  const [hospitalName, sethospitalName] = useState("");
  const [license, setlicense] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [hours, sethours] = useState("");
  const [password, setpassword] = useState("");

  const { registerUser } = useContext(AuthContext);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message before submitting
    setErrorMessage("");

    // Ensure all fields are filled before submitting
    if (hospitalName && license && city && province && postalCode && phone && email && hours && password){
      try{
        const address = `${city}, ${province}`;
      
        await registerUser(
          email,                 // email
          license,               // username (hospital license here)
          password,              // password
          password,              // password2 (same as password)
          hospitalName,          // name
          address,               // address (city + province)
          postalCode,            // postal_code
          phone,                 // phone
          hours,                 // operating_hours
          'active'
        );
      }
      catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
    
    else {
      console.log("Please fill in all fields");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Welcome</h2>
      <p className="signup-subtitle">Register your account</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={hospitalName}
          onChange={(e) => sethospitalName(e.target.value)} // Bind the input to state
        />
        <input
          type="text"
          name="license"
          placeholder="Hospital License"
          value={license}
          onChange={(e) => setlicense(e.target.value)} // Bind the input to state
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setcity(e.target.value)} // Bind the input to state
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={province}
          onChange={(e) => setprovince(e.target.value)} // Bind the input to state
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setpostalCode(e.target.value)} // Bind the input to state
        />
        <input
          type="tel"
          name="phone"
          placeholder="Contact Number"
          value={phone}
          onChange={(e) => setphone(e.target.value)} // Bind the input to state
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)} // Bind the input to state
        />
        <input
          type="text"
          name="hours"
          placeholder="Operating Hours"
          value={hours}
          onChange={(e) => sethours(e.target.value)} // Bind the input to state
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)} // Bind the input to state
        />

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <div className="signup-footer">
        Already have an account? 
        <Link to="/login">Log in here</Link>
      </div>
    </div>
  );
}

export default Registration;
