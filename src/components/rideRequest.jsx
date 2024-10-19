import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./rides.css";
import { Sidebar } from "primereact/sidebar";
import mapboxgl from "mapbox-gl";
import scooter from "../assets/scooter.jpg";
import { createRoot } from "react-dom/client";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// Ensure you import the necessary CSS for Mapbox GL and Directions
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import locationsData from "../locations/filteredLocations.json";
import { MdCircle, MdLocationOn, MdTripOrigin } from "react-icons/md";
import { TouchableOpacity } from "react-native-web";
import { BottomSheet } from "react-spring-bottom-sheet";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { RiderContext } from "../context/riderContext";
import { UserContext } from "../context/userContext";
// socket connection
import io from "socket.io-client";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
const socket = io("https://walaminserver.onrender.com");

function truncateText(text, length) {
  return text.substring(0, length) + (text.length > length ? "…" : "");
}

export default function RideRequest() {
  const { riderData, setRiderData } = useContext(RiderContext);
  const { userData, setUserData } = useContext(UserContext);
  const username = userData.firstName;
  const contact = userData.contact;
  const [location, setLocation] = useState();
  const [noride, setNoride] = useState(() => {
    const savedNoride = localStorage.getItem("noride");
    return savedNoride ? JSON.parse(savedNoride) : false; // assuming default is false
  });

  const [rideAccepted, setRideAccepted] = useState(() => {
    const savedRideAccepted = localStorage.getItem("rideAccepted");
    return savedRideAccepted ? JSON.parse(savedRideAccepted) : false; // assuming default is false
  });

  const [incomingRider, setIncomingRider] = useState(() => {
    const savedIncomingRider = localStorage.getItem("incomingRider");
    return savedIncomingRider ? JSON.parse(savedIncomingRider) : {}; // assuming default is null
  });

  useEffect(() => {
    localStorage.setItem("noride", JSON.stringify(noride));
  }, [noride]);

  useEffect(() => {
    localStorage.setItem("rideAccepted", JSON.stringify(rideAccepted));
  }, [rideAccepted]);

  useEffect(() => {
    localStorage.setItem("incomingRider", JSON.stringify(incomingRider));
  }, [incomingRider]);

  const [userLat, setUserLat] = useState(
    () => localStorage.getItem("userLat") || null
  );
  const [userLng, setUserLng] = useState(
    () => localStorage.getItem("userLng") || null
  );
  const [shortUserlocation, setShortUserlocation] = useState(
    () => localStorage.getItem("shortUserlocation") || null
  );
  const [userLocation, setUserLocation] = useState(
    () => localStorage.getItem("userLocation") || null
  );
  const [open, setOpen] = useState(
    () => JSON.parse(localStorage.getItem("open")) || true
  );
  const [confirmed, setConfirmed] = useState(
    () => JSON.parse(localStorage.getItem("confirmed")) || false
  ); // confirmation status
  const [selectedLocation, setSelectedLocation] = useState(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    return savedLocation ? JSON.parse(savedLocation) : null;
  });
  const [distance, setDistance] = useState(
    () => localStorage.getItem("distance") || null
  );
  const [rideStatus, setRideStatus] = useState(
    () => localStorage.getItem("rideStatus") || null
  );
  const [cost, setCost] = useState(() => localStorage.getItem("cost") || null);

  // New state for the second bottom sheet
  const [waitingOpen, setWaitingOpen] = useState(
    () => JSON.parse(localStorage.getItem("waitingOpen")) || false
  );

  const [visible, setVisible] = useState(
    () => JSON.parse(localStorage.getItem("visible")) || false
  );

  useEffect(() => {
    if (waitingOpen) {
      localStorage.setItem("waitingOpen", JSON.stringify(waitingOpen));
    }
  }, [waitingOpen]);

  useEffect(() => {
    if (visible) {
      localStorage.setItem("visible", JSON.stringify(visible));
    }
  }, [visible]);

  const navigate = useNavigate();
  const back = () => navigate("/");

  useEffect(() => {
    if (!userLat || !userLng) {
      // Geolocation: Get user location
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLat(lat);
        setUserLng(lng);
        localStorage.setItem("userLat", lat);
        localStorage.setItem("userLng", lng);

        // Reverse geocoding to get place name
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await response.json();
          const maxLength = 50;
          const shortname =
            data.display_name.length > maxLength
              ? data.display_name.substring(0, maxLength) + "..."
              : data.display_name;
          setShortUserlocation(shortname);
          setUserLocation(data.display_name);
          localStorage.setItem("shortUserlocation", shortname);
          localStorage.setItem("userLocation", data.display_name);
        } catch (error) {
          console.log("Error fetching place name:", error.message);
        }
      });
    }
  }, [userLat, userLng]);

  // Save selected location, distance, cost, and confirmed state to localStorage
  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem(
        "selectedLocation",
        JSON.stringify(selectedLocation)
      );
      setLocation(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (distance) {
      localStorage.setItem("distance", distance);
    }
  }, [distance]);

  useEffect(() => {
    if (rideStatus) {
      localStorage.setItem("rideStatus", rideStatus);
    }
  }, [rideStatus]);

  useEffect(() => {
    if (cost) {
      localStorage.setItem("cost", cost);
    }
  }, [cost]);

  useEffect(() => {
    localStorage.setItem("confirmed", confirmed);
  }, [confirmed]);

  useEffect(() => {
    localStorage.setItem("open", open);
  }, [open]);

  // Function to reset all state and localStorage
  const reset = () => {
    // Clear all localStorage items
    localStorage.removeItem("userLat");
    localStorage.removeItem("userLng");
    localStorage.removeItem("shortUserlocation");
    localStorage.removeItem("userLocation");
    localStorage.removeItem("confirmed");
    localStorage.removeItem("selectedLocation");
    localStorage.removeItem("distance");
    localStorage.removeItem("cost");
    localStorage.removeItem("searchOpen");
    localStorage.removeItem("waitingOpen");
    localStorage.removeItem("incomingRider");
    localStorage.removeItem("rideAccepted");
    localStorage.removeItem("noride");
    localStorage.removeItem("rideStatus");
    localStorage.removeItem("visible");

    // Reset all states
    setUserLat(null);
    setUserLng(null);
    setShortUserlocation(null);
    setUserLocation(null);
    setConfirmed(false);
    setSelectedLocation(null);
    setDistance(null);
    setCost(null);
    setOpen(true);
    setWaitingOpen(false); // Open the new bottom sheet
    setIncomingRider(null);
    setRideAccepted(false);
    setRideStatus(null);
    setVisible(false);

    // reset ridestatus
    setRiderData({ available: 0, rideStatus: "" });
    // Optionally, refresh the page
    window.location.reload();
    console.log("items have been reset");
  };

  const done = () => {
    reset();
    navigate("/");
  };

  useEffect(() => {
    if (cost) {
      console.log(`username: ${username}`);
      console.log(`contact: ${contact}`);
      console.log(`userLat: ${userLat}`);
      console.log(`userLng: ${userLng}`);
      console.log(`shortUserlocation: ${shortUserlocation}`);
      console.log(`userLocation: ${userLocation}`);
      console.log(`location: ${JSON.stringify(location)}`);
      console.log(`cost: ${cost}`);
    }
  });

  const orderRide = () => {
    setOpen(false); // Close the first bottom sheet
    setWaitingOpen(true); // Open the new bottom sheet
    setRiderData({ available: 0, rideStatus: "ridesent" });
    const cardData = {
      username,
      contact,
      userLat,
      userLng,
      shortUserlocation,
      userLocation,
      location,
      cost,
      senderId: socket.id,
    };
    socket.emit("sendCard", cardData);
    console.log("socket sent");
  };

  useEffect(() => {
    socket.on("rideTimeout", ({ message }) => {
      console.log(`message: ${message}`);
      setNoride(true);
      setRiderData({ available: 0, rideStatus: "" });
    });
  });

  useEffect(() => {
    socket.on("notifyReaction", ({ message }) => {
      console.log("result received", message);
      setIncomingRider(message);
      setRideAccepted(true);
    });
    return () => {
      socket.off("notifyReaction");
    };
  });

  useEffect(() => {
    // Listen for ride status updates if needed (optional)
    socket.on("rideStatusUpdate", ({ message, status, reactorDetails }) => {
      // Handle the incoming ride status update
      console.log(message);
      setRideStatus(status);
      if (status === "Ride Ended") {
        setVisible(true);
      }
    });

    return () => {
      socket.off("rideStatusUpdate");
    };
  });

  useEffect(() => {
    // Listen for ride status updates if needed (optional)
    socket.on("rideStatusUpdate", (data) => {
      // Handle the incoming ride status update
      console.log("Ride status updated:", data);
    });

    return () => {
      socket.off("rideStatusUpdate");
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Sidebar
        fullScreen
        style={{ width: "100%", height: "100vh" }}
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <h1>Price to Pay</h1>
          <br />
          <span>ugx, {cost} shs.</span>
          <br />
          <button style={{ width: "70%" }} onClick={done}>
            <p>Collected</p>
          </button>
        </div>
      </Sidebar>
      {userLat && userLng && (
        <MapElement
          lat1={userLat}
          lng1={userLng}
          selectedLocation={selectedLocation}
          confirmed={confirmed}
          setDistance={setDistance}
          setCost={setCost}
        />
      )}
      <SearchThing
        shortUserlocation={shortUserlocation}
        onLocationSelect={setSelectedLocation}
      />
      <BottomSheet open={open} blocking={false} skipInitialTransition={true}>
        <ConfirmDialog
          shortUserlocation={shortUserlocation}
          setConfirmed={setConfirmed}
          confirmed={confirmed}
          selectedLocation={selectedLocation}
          distance={distance}
          cost={cost}
          reset={reset}
          setRiderData={setRiderData}
          orderRide={orderRide}
        />
      </BottomSheet>
      {/* New BottomSheet for Waiting */}
      <BottomSheet open={waitingOpen} blocking={false}>
        {rideAccepted ? (
          <RideAccepted
            rideStatus={rideStatus}
            reset={reset}
            incomingRider={incomingRider}
          />
        ) : (
          <div
            style={{
              height: "43vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {noride ? (
              <p>We are sorry, no rider available at this time.</p>
            ) : (
              <p>waiting for rider...</p>
            )}
            <TouchableOpacity
              onPress={() => reset()}
              style={{
                width: "75%",
                height: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "orange",
                marginbottom: "20px",
                borderRadius: "20px",
              }}
            >
              <p style={{ color: "#fff" }}>Cancel Ride</p>
            </TouchableOpacity>
          </div>
        )}
      </BottomSheet>
      <ApiCalls orderRide={orderRide} />
      <TouchableOpacity onPress={back} id="go-back">
        <RiArrowLeftLine color="black" size={25} />
      </TouchableOpacity>
    </div>
  );
}
function RideAccepted({ incomingRider, reset, rideStatus }) {
  return (
    <div
      style={{
        height: "43vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      {rideStatus === null ? (
        <p>Your rider {incomingRider.lastName} is on his way</p>
      ) : rideStatus === "Arrived" ? (
        <p>Your rider has arrived</p>
      ) : rideStatus === "Started" ? (
        <p>Your Ride Has Started, Safe Journy</p>
      ) : rideStatus === "Ride Ended" ? (
        <p>Your Ride has Ended</p>
      ) : (
        <p>An Error has occured</p>
      )}
      <span>
        {incomingRider.userName} {incomingRider.lastName}
      </span>
      <span>{incomingRider.brand}</span>
      <span>
        {incomingRider.plate} {incomingRider.color}
      </span>
      <br />
      <TouchableOpacity
        style={{ width: "100%", backgroundColor: "limegreen" }}
        id="rideAccepted"
      >
        <p>Call</p>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "100%", backgroundColor: "lightblue" }}
        id="rideAccepted"
      >
        <p>Chat with!!</p>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={reset}
        style={{ width: "100%", backgroundColor: "orange" }}
        id="rideAccepted"
      >
        <p>Cancel Ride</p>
      </TouchableOpacity>
    </div>
  );
}
function ConfirmDialog({
  selectedLocation,
  shortUserlocation,
  setConfirmed,
  confirmed,
  distance,
  cost,
  reset,
  setRiderData,
  orderRide,
}) {
  return (
    <div
      style={{
        height: "43vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {confirmed ? (
        <div>
          <h2>Confirm Ride</h2>
          <p>
            Ride Cost: USh{" "}
            <span style={{ fontSize: "24px" }}>{cost && <>{cost}</>}</span>{" "}
            <span style={{ color: "lightgray" }}>{"cash only"}</span>
          </p>
          <p style={{ padding: "0px" }}>
            Distance: {distance && <>{distance} km</>}
          </p>
          <img src={scooter} style={{ width: "6.5rem", right: 0 }} />
        </div>
      ) : (
        <div>
          <p>Pickup Location :</p>
          <p>{shortUserlocation}</p>
          <br />
          <p>Destination :</p>
          {selectedLocation && (
            <p>
              {selectedLocation.name}, {selectedLocation.address}
            </p>
          )}
        </div>
      )}
      <div>
        {confirmed ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => reset()}
              style={{
                width: "35%",
                height: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "orange",
                marginbottom: "20px",
                borderRadius: "20px",
              }}
            >
              <p style={{ color: "#fff" }}>Cancel</p>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={orderRide}
              style={{
                width: "60%",
                height: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "limegreen",
                marginbottom: "20px",
                borderRadius: "20px",
              }}
            >
              <p style={{ color: "#fff" }}>Order Ride</p>
            </TouchableOpacity>
          </div>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setConfirmed(true);
              setRiderData({ available: 0, rideStatus: "processing" });
            }}
            style={{
              width: "100%",
              height: "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "limegreen",
              marginbottom: "20px",
              borderRadius: "40px",
            }}
          >
            <p style={{ color: "#fff" }}>Confirm Location</p>
          </TouchableOpacity>
        )}
        <br />
      </div>
    </div>
  );
}
function ApiCalls({ orderRide }) {
  useEffect(() => {
    socket.on("rideStatusUpdate", (data) => {
      console.log("status updated");
      console.log("status updated:", data.status);
    });
    return () => {
      socket.off("rideStatusUpdate");
    };
  });
  return;
}

function SearchThing({ shortUserlocation, onLocationSelect }) {
  const [open, setOpen] = useState(() => {
    const savedOpenState = localStorage.getItem("searchOpen");
    return savedOpenState !== null ? JSON.parse(savedOpenState) : true;
  });

  const [inputValue, setInputValue] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locationItem, setLocationItem] = useState(null); // Allow re-selection

  useEffect(() => {
    if (inputValue) {
      const results = locationsData.filter((location) =>
        location.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredLocations(results.slice(0, 6)); // Limit results to 6
    } else {
      setFilteredLocations([]);
    }
  }, [inputValue]);

  useEffect(() => {
    // Persist 'open' state to localStorage
    localStorage.setItem("searchOpen", JSON.stringify(open));
  }, [open]);

  const handleSelect = (location) => {
    setLocationItem(location);
    onLocationSelect(location); // Pass selected location to parent component
    setFilteredLocations([]);
    setOpen(false); // Close search after selection
  };

  const inputChanging = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <BottomSheet
      skipInitialTransition={true}
      blocking={false}
      open={open}
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        bottom: "0px",
        left: "0px",
        backgroundColor: "white",
        zIndex: 999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <label
        style={{
          width: "100%",
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
          height: "95vh",
        }}
      >
        <div>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <MdCircle style={{ paddingRight: "20px" }} color="lightgreen" />
            {shortUserlocation ? (
              <span> {shortUserlocation}</span>
            ) : (
              <span>Loading...</span>
            )}
          </p>
        </div>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <MdCircle style={{ paddingRight: "20px" }} color="red" />
          Enter destination
        </p>
        <div className="input-cover" style={{ width: "100%" }}>
          <FaArrowRight color="lightgray" />
          <input
            type="text"
            autoFocus
            value={inputValue}
            onChange={inputChanging}
            style={{ width: "100%", paddingLeft: "20px", color: "black" }}
            placeholder="Search for a location..."
          />
        </div>
        <br />
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => (
            <TouchableOpacity
              style={{
                width: "95%",
                borderBottom: "solid .5px #ccc",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                height: "4rem",
                alignItems: "center",
              }}
              key={index}
              onPress={() => handleSelect(location)}
            >
              <MdLocationOn
                color="green"
                size={20}
                style={{ marginRight: "15px" }}
              />
              <span style={{ textAlign: "start" }}>
                {truncateText(location.name, 30)}
                <br />
                <span style={{ fontSize: "12px" }}>
                  {truncateText(location.address, 30)}
                </span>
              </span>
            </TouchableOpacity>
          ))
        ) : inputValue ? (
          <p style={{ textAlign: "center" }}>No locations found</p>
        ) : null}
      </label>
    </BottomSheet>
  );
}

function MapElement({
  lat1,
  lng1,
  selectedLocation,
  confirmed,
  setDistance,
  setCost,
}) {
  const [directions, setDirections] = useState();
  const [destinationCoord, setDestinationCoords] = useState();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng1, lat1],
      zoom: 15,
      attributionControl: false,
    });

    const startMarker = document.createElement("div");
    const root = createRoot(startMarker);
    root.render(<OriginMarker />);
    new mapboxgl.Marker(startMarker)
      .setLngLat({
        lng: lng1,
        lat: lat1,
      })
      .addTo(map);

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/walking",
      alternatives: false,
      geometries: "geojson",
      controls: { instructions: false, inputs: false },
    });
    map.addControl(directions);
    setDirections(directions);

    if (selectedLocation) {
      const lat = selectedLocation.location.lat;
      const lng = selectedLocation.location.lng;
      setDestinationCoords([lng, lat]);

      // Show marker for destination
      const stopMarker = document.createElement("div");
      const root = createRoot(stopMarker);
      root.render(<DestinationMarker />);
      new mapboxgl.Marker(stopMarker)
        .setLngLat({
          lng: lng,
          lat: lat,
        })
        .addTo(map);
      map.flyTo({ center: [lng, lat], zoom: 15 });
    }

    return () => map.remove();
  }, [lat1, lng1, selectedLocation]);

  useEffect(() => {
    if (confirmed === true && directions && destinationCoord) {
      directions.setOrigin([lng1, lat1]); // User's current location
      directions.setDestination(destinationCoord); // Selected location

      directions.on("route", (e) => {
        const route = e.route[0];
        if (route && route.distance) {
          const distance = (route.distance / 1000).toFixed(2);
          const cost = (Math.ceil(distance) * 500).toLocaleString();
          setCost(cost);
          setDistance(distance);
        }
      });
    }
  }, [confirmed, directions, destinationCoord]);

  return (
    <div>
      <div id="map" ref={mapContainerRef} style={{ height: "60vh" }}></div>
      <div style={{ height: "50vh", width: "100%" }}>
        <div id="top-shadow"></div>
      </div>
    </div>
  );
}

function OriginMarker() {
  return (
    <div className="start">
      <MdTripOrigin size={24} color="#fff" />
    </div>
  );
}
function DestinationMarker() {
  return (
    <div className="stop">
      <MdLocationOn size={24} color="#fff" />
    </div>
  );
}
function RiderMarker() {
  return (
    <div className="start">
      <GiFullMotorcycleHelmet size={30} color="#fff" />
    </div>
  );
}
