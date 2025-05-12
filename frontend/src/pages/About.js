import React from "react";
import "../styles/aboutus.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>Welcome to the <span className="about-highlight">Blood Bank and Donation System</span>, an innovative and centralized platform designed to connect hospitals and healthcare facilities in their mission to save lives. Our goal is clear: <strong>every drop counts</strong>. We aim to empower hospitals to efficiently search for, exchange, and manage blood donations and requests, especially during critical emergencies when timing is everything.</p>

      <p>Created with cutting-edge technology, our system ensures the highest standards of security, usability, and real-time performance. By fostering collaboration and transparency among verified hospitals, we are bridging the gap in blood donation and management. Our platform provides the tools needed for hospitals to maintain accurate blood inventories, streamline blood request handling, and respond swiftly to urgent needs, ensuring no life is left waiting.</p>

      <h2>Our Platform Offers:</h2>
      <ul>
        <li>Real-time blood <strong>availability tracking</strong> and searching, ensuring fast access to necessary supplies.</li>
        <li>Secure <strong>blood request management</strong> and seamless exchange coordination for hospitals.</li>
        <li>Verified hospital profiles with <strong>easy-to-use management tools</strong> and comprehensive audit logging.</li>
        <li><strong>Notifications and updates</strong> to keep all parties informed for better coordination.</li>
      </ul>

      <p>At the heart of our mission is <span className="about-highlight">innovation with purpose</span>. We are committed to leveraging technology for <strong>life-saving impact</strong>, making the process of blood donation and acquisition faster, safer, and more efficient. With our platform, we aim to create a smarter, more connected healthcare ecosystem where every donor's contribution has the power to save lives.</p>

      <h2>Our Story</h2>
      <p>This platform was developed by a passionate team of software engineers, healthcare professionals, and innovators who are united by a single goal: to make a tangible difference in the world of healthcare. Designed and built with love and care, our solution reflects our unwavering commitment to improving lives, one drop at a time.</p>

      <h2>The Team Behind the Project</h2>
      <p>The <span className="about-highlight">Blood Bank and Donation System</span> was created by a talented team at NEDUET, which brings together software engineers, project managers, and healthcare experts. Each member is dedicated to building a future where accessing and donating blood is easier, safer, and more efficient for everyone.</p>

      <p>We hope that our platform serves as a small but important step towards a world where no one has to wait for blood during emergencies.</p>
    </div>
  );
};

export default About;
