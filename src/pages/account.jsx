import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/account.css";
import { TouchableOpacity } from "react-native-web";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaServicestack } from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { UserContext } from "../context/userContext";
import { SlCalender } from "react-icons/sl";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { MdOutlineQuestionAnswer, MdChangeHistory } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { NewRideNot } from "./home";

function Account() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const cancelled = () => {
    setVisible(false);
  };
  const confirmedLogout = () => {
    clearStorage();
    navigate("/signin");
  };

  const footerContent = (
    <div
      style={{ width: "100%", justifyContent: "space-around", display: "flex" }}
    >
      <Button
        label="No"
        icon="pi pi-times"
        onClick={cancelled}
        className="p-button-text"
        style={{ width: "40%", height: "3rem" }}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={confirmedLogout}
        style={{ width: "50%", height: "3rem", backgroundColor: "limegreen" }}
      />
    </div>
  );
  const { userData, clearStorage } = useContext(UserContext);
  const navigate = useNavigate();
  const userLoggedOut = () => {
    setVisible(true);
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
          <span>
            <SlCalender style={{ marginRight: "1rem" }} />
            Scheduled rides
          </span>
        </TouchableOpacity>
        <TouchableOpacity id="account-option">
          <span>
            <MdChangeHistory style={{ marginRight: "1rem" }} />
            Ride History
          </span>
        </TouchableOpacity>
        <p style={{ width: "100%", textAlign: "start" }}>Support</p>
        <TouchableOpacity id="account-option">
          <span>
            <BiSupport style={{ marginRight: "1rem" }} />
            Contact Support
          </span>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible2(true)} id="account-option">
          <span>
            <GiFullMotorcycleHelmet style={{ marginRight: "1rem" }} />
            Become a captain
          </span>
        </TouchableOpacity>
        <p style={{ width: "100%", textAlign: "start" }}>Log Out</p>
        <TouchableOpacity
          onPress={userLoggedOut}
          id="account-option"
          style={{ backgroundColor: "orange" }}
        >
          <span style={{ color: "#fff" }}>Logout</span>
        </TouchableOpacity>
        <Dialog
          visible={visible}
          style={{
            width: "95%",
            backgroundColor: "#fff",
            padding: "30px 20px",
            boxSizing: "border-box",
            height: "40vh",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
          }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          footer={footerContent}
        >
          <MdOutlineQuestionAnswer size={70} color="limegreen" />
          <p className="m-0">Are you sure you want bail ?</p>
        </Dialog>
      </div>
      <Navigator />
      <Dialog
        visible={visible2}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: "30px 20px",
          boxSizing: "border-box",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        <CaptainReg setVisible2={setVisible2} />
      </Dialog>
    </div>
  );
}

export default Account;

export function Navigator() {
  const vibrate = () => {
    console.log("vibrating");
    navigator.vibrate(100);
  };
  return (
    <div className="navigator">
      {/* home page */}
      <TouchableOpacity onPress={vibrate}>
        <Link to="/">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "darkgreen" }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* wallet page */}
      <TouchableOpacity onPress={vibrate}>
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
      <TouchableOpacity onPress={vibrate}>
        <Link to="/account">
          <span className="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Profile</span>
          </span>
        </Link>
      </TouchableOpacity>
      <NewRideNot />
    </div>
  );
}

function CaptainReg({ setVisible2 }) {
  const navigate = useNavigate()
  const [code, setCode] = useState("");
  const codeRef = useRef();
  useEffect(() => {
    if (!code) {
      console.log("no code yet");
    } else {
      console.log(`typing ${code}`);
      if (code.length === 10 && code === "1213142122") {
        console.log("reached");
        navigate("/riderSignUp")
      } else {
        console.log("almost there");
      }
    }
  }, [code]);
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h1>Hello there</h1>
      <label>
        <p>Enter Captain's 10 digit code</p>
        <div className="input-cover">
          <input
            ref={codeRef}
            type="number"
            value={code}
            onChange={handleCodeChange}
            autoFocus={true}
            style={{
              paddingLeft: "10px",
            }}
            placeholder="1234567890"
          />
        </div>
      </label>
      <>
        <p>Don't have one? contact us for yours !!</p>
      </>
      <div
        style={{
          justifyContent: "space-between",
          width: "100%",
          display: "flex",
        }}
      >
        <button
          onClick={() => setVisible2(false)}
          style={{ backgroundColor: "limegreen", width: "35%", height: "3rem" }}
        >
          <span>Close</span>
        </button>
        <button
          style={{ backgroundColor: "limegreen", width: "60%", height: "3rem" }}
        >
          <span>Contact Us</span>
        </button>
      </div>
    </div>
  );
}
