import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { createRoot } from "react-dom/client";
import { TouchableOpacity } from "react-native-web";
import "../css/driver.css";
import io from "socket.io-client";
import { BottomSheet } from "react-spring-bottom-sheet";
import { UserContext } from "../context/userContext";
import { MdLocationOn, MdTripOrigin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { RiArrowLeftLine } from "react-icons/ri";

const socket = io("https://walaminserver.onrender.com");

export default function DriverRideList() {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };

  const { userData } = useContext(UserContext);
  const userName = userData.firstName;
  const lastName = userData.lastName;
  const brand = userData.vehicleBrand;
  const plate = userData.plateNumber;
  const color = userData.vehicleColor;

  const [selectedRide, setSelectedRide] = useState(
    () => localStorage.getItem("selectedRide") || null
  );
  const [riderLat, setRiderLat] = useState(
    () => localStorage.getItem("riderLat") || null
  );
  const [riderLng, setRiderLng] = useState(
    () => localStorage.getItem("riderLng") || null
  );
  const [acceptedRide, setAcceptedRide] = useState(() =>
    JSON.parse(localStorage.getItem("acceptedRide") || false)
  );
  const [riderOpen, setRiderOpen] = useState(
    () => JSON.parse(localStorage.getItem("riderOpen")) || true
  );
  const [rideData, setRideData] = useState(() => {
    const storedData = localStorage.getItem("rideData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("rideData", JSON.stringify(rideData));
  }, [rideData]);

  useEffect(() => {
    localStorage.setItem("selectedRide", selectedRide);
    console.log(selectedRide);
  }, [selectedRide]);

  useEffect(() => {
    localStorage.setItem("acceptedRide", JSON.stringify(acceptedRide));
  }, [acceptedRide]);

  useEffect(() => {
    localStorage.setItem("riderOpen", JSON.stringify(riderOpen));
  }, [riderOpen]);

  const sendReaction = (ride) => {
    console.log("Ride in send Reaction: ", JSON.stringify(ride), null, 2);
    const reactorName = {
      userName,
      lastName,
      brand,
      plate,
      color,
      riderLat,
      riderLng,
    };
    socket.emit("reaction", { cardSender: ride.senderId, reactorName });
    setSelectedRide(ride);
  };

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  useEffect(() => {
    if (!riderLat || !riderLng) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setRiderLat(lat);
        setRiderLng(lng);
        localStorage.setItem("riderLat", lat);
        localStorage.setItem("riderLng", lng);
      });
    }
  }, [riderLat, riderLng]);

  useEffect(() => {
    // Socket listener for pending rides
    const handlePendingRides = (data) => {
      console.log(`Received pending rides data: ${JSON.stringify(data)}`);
      setRideData(data); // Append new rides if needed
    };

    socket.on("pendingRides", handlePendingRides);

    // Cleanup listener on component unmount
    return () => {
      socket.off("pendingRides", handlePendingRides);
    };
  }, []); // Runs once on mount

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This runs every 5 seconds");
      const handlePendingRides = (data) => {
        console.log(`Received pending rides data: ${JSON.stringify(data)}`);
        setRideData(data); // Append new rides if needed
      };
      socket.on("pendingRides", handlePendingRides);
      return () => {
        socket.off("pendingRides", handlePendingRides);
      };
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures it

  const reset = () => {
    localStorage.removeItem("selectedRide");
    localStorage.removeItem("riderLat");
    localStorage.removeItem("riderLng");
    localStorage.removeItem("acceptedRide");
    localStorage.removeItem("riderOpen");
    localStorage.removeItem("rideData");

    setAcceptedRide(false);
    setSelectedRide(null);
    setRiderLat(null);
    setRiderLng(null);
    setRiderOpen(true);
    setRideData([]);
    console.log("Items have been reset");
    window.location.reload();
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MapElement riderLat={riderLat} riderLng={riderLng} />
      <BottomSheet
        open={riderOpen}
        skipInitialTransition={true}
        blocking={false}
      >
        <NewRides
          setAcceptedRide={setAcceptedRide}
          setRiderOpen={setRiderOpen}
          rideData={rideData}
          sendReaction={sendReaction}
          userName={userName}
          lastName={lastName}
          brand={brand}
          plate={plate}
          color={color}
        />
      </BottomSheet>
      <BottomSheet
        open={acceptedRide}
        skipInitialTransition={true}
        blocking={false}
      >
        <RideDetails selectedRide={selectedRide} reset={reset} />
      </BottomSheet>
      <TouchableOpacity
        onPress={back}
        id="go-back"
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <RiArrowLeftLine color="black" size={25} />
      </TouchableOpacity>
      <SocketCalls />
    </div>
  );
}

function MapElement({ riderLat, riderLng }) {
  const mapContainerRef = useRef();
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [riderLng, riderLat],
      zoom: 15,
      attributionControl: false,
    });
    const Rider = document.createElement("div");
    const root = createRoot(Rider);
    root.render(<RiderMarker />);
    new mapboxgl.Marker(Rider)
      .setLngLat({ lng: riderLng, lat: riderLat })
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [riderLat, riderLng]);

  return (
    <div>
      <div
        id="map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "50vh" }}
      ></div>
      <div style={{ height: "50vh", width: "100%" }}>
        <div id="top-shadow"></div>
      </div>
    </div>
  );
}

function NewRides({
  setAcceptedRide,
  setRiderOpen,
  rideData,
  sendReaction,
  userName,
  lastName,
  brand,
  plate,
  color,
}) {
  useEffect(() => {
    console.log(`does the data exist? ${rideData}`);
  });
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      {rideData.length > 0 ? (
        rideData.map((ride, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: "#f5f5f5",
              marginBottom: "10px",
            }}
          >
            <span>
              <b>Username</b>: {ride.username}
            </span>
            <span>
              <b>Contact</b>: {ride.contact}
            </span>
            <span>
              <b>Origin</b>: {ride.shortUserlocation}
            </span>
            <span>
              <b>Cost</b>: {ride.cost}
            </span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ff4d4d",
                  padding: "10px",
                  cursor: "pointer",
                  width: "35%",
                }}
              >
                <p>Decline</p>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAcceptedRide(true);
                  setRiderOpen(false);
                  sendReaction(ride); // Send the reaction when accepting the ride
                }}
                style={{
                  backgroundColor: "#4CAF50",
                  padding: "10px",
                  cursor: "pointer",
                  width: "60%",
                }}
              >
                <p>Accept</p>
              </TouchableOpacity>
            </div>
          </div>
        ))
      ) : (
        <div style={{ width: "100%" }}>
          <p>No Rides Available</p>
          <p style={{ width: "100%" }}>
            <span style={{ color: "black", fontWeight: "bold" }}>userName</span>{" "}
            : <span style={{ fontSize: "26px" }}>{userName}</span>
            {}
          </p>
          <p style={{ width: "100%" }}>
            <span style={{ color: "black", fontWeight: "bold" }}>lastName</span>{" "}
            : <span style={{ fontSize: "26px" }}>{lastName}</span>
            {}
          </p>
          <p style={{ width: "100%" }}>
            <span style={{ color: "black", fontWeight: "bold" }}>brand</span> :{" "}
            <span>{brand}</span>
            {}
          </p>
          <p style={{ width: "100%" }}>
            <span style={{ color: "black", fontWeight: "bold" }}>plate</span> :{" "}
            <span>{plate}</span>
            {}
          </p>
          <p style={{ width: "100%" }}>
            <span style={{ color: "black", fontWeight: "bold" }}>color</span> :{" "}
            <span>{color}</span>
            {}
          </p>
          <button
            style={{ width: "100%" }}
            onClick={() => window.location.reload()}
          >
            <p>Try refresh</p>
          </button>
        </div>
      )}
    </div>
  );
}

const updateRideStatus = (status) => {
  socket.emit("updateRideStatus", {
    status,
  });
};

function RideDetails({ selectedRide, reset }) {
  const { userData } = useContext(UserContext);
  const userName = userData.firstName;
  const [arrive, setArrived] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("Ride: ", JSON.stringify(selectedRide, null, 2));
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
  });

  const arriveTo = () => {
    setArrived(true);
    socket.emit("updateRideStatus", {
      cardSender: selectedRide.senderId, // Adjust according to your data
      status: "Arrived",
      reactorName: { userName: userName }, // Adjust accordingly
    });
  };
  const startRide = () => {
    setStarted(true);
    socket.emit("updateRideStatus", {
      cardSender: selectedRide.senderId, // Adjust according to your data
      status: "Started",
      reactorName: { userName: userName }, // Adjust accordingly
    });
  };
  const endRide = () => {
    setVisible(true);
    socket.emit("updateRideStatus", {
      cardSender: selectedRide.senderId, // Adjust according to your data
      status: "Ride Ended",
      reactorName: { userName: userName }, // Adjust accordingly
    });
  };
  const done = () => {
    setVisible(false);
    reset();
  };
  return (
    <div
      style={{
        height: "50vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        paddingBottom: "20px",
      }}
    >
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
          <h1>Price to Collect</h1>
          <br />
          <span>ugx, {selectedRide.cost} shs.</span>
          <br />
          <button style={{ width: "70%" }} onClick={done}>
            <p>Collected</p>
          </button>
        </div>
      </Sidebar>
      <p>Ride Details</p>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <span>
          <b>Username</b>: {selectedRide.username}
        </span>
        <span>
          <b>Contact</b>: {selectedRide.contact}
        </span>
        <span>
          <b>Origin</b>: {selectedRide.shortUserlocation}
        </span>
        <span>
          <b>Destination</b>: {selectedRide.location.name}
        </span>
        <span>
          <b>Cost</b>: {selectedRide.cost}
        </span>
      </div>
      <br />
      {started ? (
        <>
          <h1>On Trip</h1>
          <br />
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "orange",
              height: "4rem",
            }}
            id="rideAccepted"
            onPress={endRide}
          >
            <p>End Ride</p>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {arrive ? (
            <>
              <h1>Start Ride</h1>
              <br />
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: "lightgreen",
                  border: arrive ? "solid .5px black" : "",
                  height: "4rem",
                }}
                id="rideAccepted"
                onPress={startRide}
              >
                <p>Click to start Ride</p>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "limegreen",
              }}
              id="rideAccepted"
              onPress={arriveTo}
            >
              <p>Click to Arrive</p>
            </TouchableOpacity>
          )}
          {arrive ? (
            <></>
          ) : (
            <>
              <TouchableOpacity
                style={{ width: "100%", backgroundColor: "lightblue" }}
                id="rideAccepted"
              >
                <p>Chat with!!</p>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "100%", backgroundColor: "orange" }}
                id="rideAccepted"
              >
                <p>Call Client</p>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
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

function SocketCalls() {
  return null; // Placeholder for socket calls
}
