import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RideReq() {
  const [name, setName] = useState();
  const [step, setStep] = useState(1);
  const nameRef = useRef();
  const navigate = useNavigate();
  const setname = () => {
    setName(nameRef.current.value);
    setStep(2);
  };
  useEffect(() => {
    if (name) {
      console.log(name);
    }
  }, [name]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>New Ride</h1>
      <p>Enter name</p>
      <div className="input-cover">
        <input
          style={{ width: "100%", paddingLeft: "20px" }}
          ref={nameRef}
          type="text"
        />
      </div>
      <br />
      <button onClick={setname}>
        <p>Set Name</p>
      </button>
      <br />
      <button onClick={() => navigate("/account")}>
        <p>back</p>
      </button>
    </div>
  );
}
