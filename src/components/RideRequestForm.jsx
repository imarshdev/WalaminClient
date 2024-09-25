import React, { useState, useRef } from "react";
import "../css/ride.css";
import { TouchableOpacity } from "react-native-web";
function RideRequestForm() {
  const [expanded, setExpanded] = useState(false);
  const goUp = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    setExpanded(true);
  };
  return (
    <div
      className="container"
      style={{ padding: 0, margin: 0, height: "100vh" }}
    >
      <div id="map"></div>
      <div
        className="bottomSheet"
        style={{
          height: expanded ? "90vh" : "30vh",
          transition: "height 0.5s",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "3px",
            backgroundColor: "darkgreen",
            borderRadius: "10px",
          }}
        ></div>
        <div className="input-cover">
          <input
            type="text"
            onFocus={goUp}
            onBlur={() => setExpanded(false)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RideRequestForm;
