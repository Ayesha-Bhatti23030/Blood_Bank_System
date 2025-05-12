import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import PrivateRoute from "./utilis/PrivateRoutes";
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Search from "./pages/Search";
import About from "./pages/About";
import  BloodStock from "./pages/BloodStock";
import  Donor from "./pages/Donor";
import  Attendant from "./pages/Attendant";
import HospitalList from "./pages/HospitalList";
import HospitalDetail from "./pages/HospitalDetail";
import BloodResults from "./pages/Results";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Updated the usage of PrivateRoute and Route to work with v6 */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bloodstock" element={<BloodStock/>} />
            <Route path="/donor" element={<Donor/>} />
            <Route path="/attendant" element={<Attendant/>} />
            <Route path="/hospitallist" element={<HospitalList/>} />
            <Route path="/hospitals/:id" element={<HospitalDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/results" element={<BloodResults/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
