import React, { useContext } from "react";
import "../css/account.css";
import { TouchableOpacity } from "react-native-web";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaServicestack } from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { UserContext } from "../context/userContext";

function Account() {
  const { userData, clearStorage } = useContext(UserContext);
  const navigate = useNavigate();
  const userLoggedOut = () => {
    clearStorage();
    navigate("/signin");
  };
  return (
    <div className="container">
      <p>My Account</p>
      <div className="account-card">
        <span>
          Username: {userData.firstName} {userData.lastName}
        </span>
        <span>Contact: {userData.contact}</span>
      </div>
      <br />
      <div className="account-options">
        <p style={{ width: "100%", textAlign: "start" }}>Your account</p>
        <TouchableOpacity id="account-option">
          <span>Scheduled rides</span>
        </TouchableOpacity>
        <TouchableOpacity id="account-option">
          <span>Ride History</span>
        </TouchableOpacity>
        <p style={{ width: "100%", textAlign: "start" }}>Support</p>
        <TouchableOpacity id="account-option">
          <span>Contact Support</span>
        </TouchableOpacity>
        <TouchableOpacity id="account-option">
          <span>Become a captain</span>
        </TouchableOpacity>
        <p style={{ width: "100%", textAlign: "start" }}>Log Out</p>
        <TouchableOpacity
          onPress={userLoggedOut}
          id="account-option"
          style={{ backgroundColor: "orange" }}
        >
          <span style={{ color: "#fff" }}>Logout</span>
        </TouchableOpacity>
      </div>
      <Navigator />
    </div>
  );
}

export default Account;

export function Navigator() {
  return (
    <div className="navigator">
      {/* home page */}
      <TouchableOpacity>
        <Link to="/">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "darkgreen" }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* wallet page */}
      <TouchableOpacity>
        <Link to="/services">
          <span className="icon_button">
            <FaServicestack color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "darkgreen" }}>
              All Services
            </span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* profile page */}
      <TouchableOpacity>
        <Link to="/account">
          <span className="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Profile</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}
