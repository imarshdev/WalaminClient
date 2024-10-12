import { UserContext } from "../context/userContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RiderSignUp() {
  const { userData, setUserData } = useContext(UserContext);
  const [agreed, setAgreed] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const brandRef = useRef();
  const plateRef = useRef();
  const colorRef = useRef();
  const [brand, setBrand] = useState();
  const [plate, setPlate] = useState();
  const [color, setColor] = useState();
  const navigate = useNavigate();
  const agreedTo = () => {
    const brand = brandRef.current.value;
    const plate = plateRef.current.value;
    const color = colorRef.current.value;
    setBrand(brand);
    setPlate(plate);
    setColor(color);
    setCongrats(true);
  };
  useEffect(() => {
    if (color) {
      console.log(`brand: ${brand}`);
      console.log(`plate: ${plate}`);
      console.log(`color: ${color}`);
      setUserData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        contact: userData.contact,
        isLoggedIn: true,
        vehicleBrand: brand,
        plateNumber: plate,
        vehicleColor: color,
        isRider: true,
      });
    } else {
      console.log("no data");
    }
  });
  useEffect(() => {
    console.log("userdata: ", userData);
  }, [userData]);
  const gotohome = () => {
    if (userData.isRider) {
      navigate("/");
    }
  };
  return (
    <>
      {congrats ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>congratulations, welcome aboad</p>
          <br />
          <button style={{ width: "70%" }} onClick={gotohome}>
            <p>Go to home</p>
          </button>
        </div>
      ) : (
        <>
          {agreed ? (
            <div
              style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "start",
              }}
            >
              <h2>Welcome Captain</h2>
              <br />
              <p>vehicleBrand</p>
              <div className="input-cover">
                <input
                  style={{ width: "100%", paddingLeft: "30px" }}
                  type="text"
                  name=""
                  id=""
                  ref={brandRef}
                />
              </div>
              <p>plateNumber</p>
              <div className="input-cover">
                <input
                  style={{ width: "100%", paddingLeft: "30px" }}
                  type="text"
                  name=""
                  id=""
                  ref={plateRef}
                />
              </div>
              <p>vehicleColor</p>
              <div className="input-cover">
                <input
                  style={{ width: "100%", paddingLeft: "30px" }}
                  type="text"
                  name=""
                  id=""
                  ref={colorRef}
                />
              </div>
              <br />
              <br />
              <br />
              <button style={{ width: "70%" }} onClick={agreedTo}>
                <p>Go</p>
              </button>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>RiderSignUp</p>
              <p style={{ width: "90%" }}>
                You have been provided with a terms and conditions document,
                Please read through carefully before agreeing
              </p>
              <p>Agree to the terms and conditions </p>
              <button style={{ width: "70%" }} onClick={() => setAgreed(true)}>
                <p>Agree</p>
              </button>
              <br />
              <p style={{ width: "90%" }}>
                feel free to decline if you are uncomfortable or disagree with
                any content.
              </p>
              <p>And be sure to inform us so we may adjust accordingly</p>
              <button style={{ width: "70%" }} onClick={() => navigate("/")}>
                <p>Decline</p>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
