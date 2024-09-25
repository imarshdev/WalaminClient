import React, { useState, useRef } from "react";
import "../css/ride.css";
import { TouchableOpacity } from "react-native-web";
function RideRequestForm() {
  const [expanded, setExpanded] = useState(false);
  const goUp = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    setExpanded(true);
  };
  useEffect(() => {
    const handleScroll = () => window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="container"
      style={{
        padding: 0,
        margin: 0,
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
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
            backgroundColor: "pink",
            height: "100px",
            width: "100px",
            position: "absolute",
            bottom: "50px",
            left: "0px",
            zIndex: "9999",
          }}
        ></div>
        <div
          style={{
            width: "50px",
            height: "3px",
            backgroundColor: "darkgreen",
            borderRadius: "10px",
            position: "fixed",
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
