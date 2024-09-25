// this is the search thing
// here we search for the destination location
/*
  FULL EXPLANAION
*/
import React, { useState, useEffect, useRef } from "react";
import "../css/ride.css";
import "react-spring-bottom-sheet/dist/style.css";
import { BottomSheet } from "react-spring-bottom-sheet";
import { TouchableOpacity } from "react-native-web";
import { MdLocationOn } from "react-icons/md";
function RideRequestForm() {
  const [open, setOpen] = useState(true);
  const [searching, setSearching] = useState(false);
  const [typing, setTyping] = useState(false);
  const [location, setLocation] = useState("");
  const [costSheetOpen, setCostSheetOpen] = useState(false);
  const [dialogeOpen, setDialogeOpen] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    const handleScroll = () => window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const inputFocused = () => {
    setSearching(true);
  };
  const inputUnFocused = () => {
    setTimeout(() => {
      setTyping(null);
    }, 100);
    setSearching(false);
    setLocation(inputRef.current.value);
  };
  const inputChanging = () => {
    setTyping(true);
  };
  const locationSelected = () => {
    setOpen(false);
    setCostSheetOpen(true);
  };
  const declined = () => {
    setOpen(true);
    setDialogeOpen(true);
  };
  useEffect(() => {
    if (location) {
      console.log(location);
    }
  });
  return (
    <div className="container">
      <BottomSheet
        blocking={false}
        skipInitialTransition
        snapPoints={({ maxHeight, minHeight }) => [
          searching ? maxHeight / 1.05 : minHeight,
        ]}
        open={open}
        header={
          <label style={{ width: "100%", textAlign: "start" }}>
            <span style={{ width: "100%" }}>Where to ?</span>
            <input
              type="text"
              className="location-input"
              ref={inputRef}
              onFocus={inputFocused}
              onChange={inputChanging}
              onBlur={inputUnFocused}
            />
          </label>
        }
      >
        {typing ? (
          <TouchableOpacity id="location-item">
            <MdLocationOn size={20} style={{ marginRight: "15px" }} />
            <span>formatted Address</span>
          </TouchableOpacity>
        ) : typing === false ? (
          <>
            <p>Saved</p>
            <TouchableOpacity id="location-item">
              <MdLocationOn size={20} style={{ marginRight: "15px" }} />
              <span>formatted Address</span>
            </TouchableOpacity>
            <TouchableOpacity id="location-item">
              <MdLocationOn size={20} style={{ marginRight: "15px" }} />
              <span>formatted Address</span>
            </TouchableOpacity>
            <TouchableOpacity id="location-item">
              <MdLocationOn size={20} style={{ marginRight: "15px" }} />
              <span>formatted Address</span>
            </TouchableOpacity>
            <br />
            <br />
            <p></p>
          </>
        ) : typing === null ? (
          <TouchableOpacity
            onPress={locationSelected}
            id="confirm-location-button"
          >
            <p style={{ color: "#fff" }}>Confirm Location</p>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </BottomSheet>
      <BottomSheet
        blocking={false}
        skipInitialTransition
        snapPoints={({ maxHeight, minHeight }) => [minHeight]}
        open={costSheetOpen}
        header={
          <>
            <h2>Cost: 4500.oo shs</h2>
            <p>Go walamin, go green</p>
            <span>Thank you for riding with us</span>
          </>
        }
      >
        <div className="cost-estimate">
          <p className="pick-up">
            <MdLocationOn /> Pick-up: <br />
            <br />
            <span className="location-span">
              4 Port Bell Road, Kampala, Uganda
            </span>
          </p>
          <p className="drop-off">
            <MdLocationOn /> Destination: <br />
            <br />
            <span className="location-span">
              Acacia Mall, Cooper Road, Wilaya ya, Kampala, Uganda
            </span>
          </p>
          <div className="action-container">
            <TouchableOpacity onPress={declined} id="decline">
              <p style={{ color: "#fff" }}>Decline</p>
            </TouchableOpacity>
            <TouchableOpacity id="comfirm">
              <p style={{ color: "#fff" }}>Order</p>
            </TouchableOpacity>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default RideRequestForm;
