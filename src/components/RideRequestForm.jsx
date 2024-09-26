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
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function RideRequestForm() {
  const [open, setOpen] = useState(true);
  const [searching, setSearching] = useState(false);
  const [typing, setTyping] = useState(false);
  const [location, setLocation] = useState("");
  const [costSheetOpen, setCostSheetOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [resultSheet, setResultSheet] = useState(false);
  const [result, setresult] = useState(true);
  const inputRef = useRef();
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };
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
    setTyping(false);
    setCostSheetOpen(false);
    setResultSheet(false)
  };
  const ordered = () => {
    setWaiting(true);
  };
  const ready = () => {
    setCostSheetOpen(false);
    setResultSheet(true);
  };
  useEffect(() => {
    if (location) {
      console.log(location);
    }
  });
  return (
    <div className="container">
      <div id="map" style={{ height: costSheetOpen ? "55vh" : "80vh" }}></div>
      <TouchableOpacity onPress={back} id="go-back">
        <RiArrowLeftLine color="black" size={25} />
      </TouchableOpacity>
      <BottomSheet
        className="location-input-sheet"
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
              style={{color:"black"}}
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
      >
        {waiting ? (
          <div className="waiting">
            <p>WAITING.........</p>
            <TouchableOpacity
              onPress={ready}
              id="decline"
              style={{ width: "100%", backgroundColor: "limegreen" }}
            >
              <p style={{ color: "#fff" }}>Ready.</p>
            </TouchableOpacity>
            <br />
            <TouchableOpacity
              onPress={declined}
              id="decline"
              style={{ width: "100%" }}
            >
              <p style={{ color: "#fff" }}>Cancel Ride</p>
            </TouchableOpacity>
          </div>
        ) : (
          <div className="cost-estimate">
            <div className="price-container">
              <h2 style={{ color: "#fff" }}>Cost: 4500.oo shs</h2>
              <span style={{ color: "#fff" }}>Go walamin, go green</span>
            </div>
            <p className="pick-up">
              <MdLocationOn /> Pick-up: <br />
              <br />
              <span className="location-span">
                4 Port Bell Road, Kampala, Uganda
              </span>
            </p>
            <hr style={{ color: "green" }} />
            <p className="drop-off">
              <MdLocationOn /> Destination: <br />
              <br />
              <span className="location-span">
                Acacia Mall, Cooper Road, Wilaya ya, Kampala, Uganda
              </span>
            </p>
            <br />
            <div className="action-container">
              <TouchableOpacity onPress={declined} id="decline">
                <p style={{ color: "#fff" }}>Decline</p>
              </TouchableOpacity>
              <TouchableOpacity onPress={ordered} id="comfirm">
                <p style={{ color: "#fff" }}>Order</p>
              </TouchableOpacity>
            </div>
          </div>
        )}
      </BottomSheet>
      <BottomSheet blocking={false} open={resultSheet}>
        {result ? (
          <div className="result">
            <p> Your captain is 3 minutes way...</p>
            <div className="rider-image"></div>
            <div className="driver-details">
              <p>Name: Musinguzi Ronald</p>
              <p>Bajaj 120, lemon green</p>
              <p>UFU171C</p>
            </div>
            <div className="action-container">
              <TouchableOpacity
                onPress={declined}
                id="decline"
                style={{ width: "100%" }}
              >
                <p style={{ color: "#fff" }}>Cancel Ride</p>
              </TouchableOpacity>
            </div>
          </div>
        ) : (
          <div className="result">
            <p> Sorry, we have no riders available at the moment</p>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}

export default RideRequestForm;
