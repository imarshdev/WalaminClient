import React, { useState, useRef } from "react";
import "../css/ride.css";
import { TouchableOpacity } from "react-native-web";
function RideRequestForm() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="container" style={{ padding: 0, margin: 0 }}>
      <div id="map"></div>
      <div
        className="bottomSheet"
        style={{
          height: expanded ? "90vh" : "30vh",
          transition: "height 0.5s",
        }}
      >
        <div className="input-cover">
          <input
            type="text"
            onFocus={() => setExpanded(true)}
            onBlur={()=> setExpanded(false)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RideRequestForm;
