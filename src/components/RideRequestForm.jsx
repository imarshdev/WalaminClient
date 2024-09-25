import React, { useState, useEffect } from "react";
import "../css/ride.css";
import "react-spring-bottom-sheet/dist/style.css";
import { BottomSheet } from "react-spring-bottom-sheet";
import { TouchableOpacity } from "react-native-web";
function RideRequestForm() {
  const [blocking, setBlocking] = useState(false);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    const handleScroll = () => window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const inputFocused = () => {
    setSearching(true);
    setBlocking(true);
  };
  const inputUnFocused = () => {
    setSearching(false);
    setBlocking(false);
  };
  return (
    <div className="container">
      <BottomSheet
        blocking={blocking}
        skipInitialTransition
        snapPoints={({ maxHeight, minHeight }) => [
          searching ? maxHeight / 1.05 : minHeight,
        ]}
        open={true}
        header={
          <label style={{ width: "100%", textAlign: "start" }}>
            <span style={{ width: "100%" }}>Where to ?</span>
            <input
              type="text"
              className="location-input"
              onFocus={inputFocused}
              onBlur={inputUnFocused}
            />
          </label>
        }
      >
        {searching ? (
          <p></p>
        ) : (
          <>
            <p>Saved</p>
            <TouchableOpacity id="location-item"></TouchableOpacity>
            <TouchableOpacity id="location-item"></TouchableOpacity>
          </>
        )}
      </BottomSheet>
    </div>
  );
}

export default RideRequestForm;
