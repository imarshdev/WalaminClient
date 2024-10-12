import React, { useState, useEffect, useContext, useRef } from "react";
import { TouchableOpacity } from "react-native-web";
import "../css/driver.css";
import io from "socket.io-client";
import { Sidebar } from "primereact/sidebar";
import { UserContext } from "../context/userContext";
import { MdLocationOn, MdTripOrigin } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const socket = io("https://walaminserver.onrender.com");

function DriverRideList() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const { userData } = useContext(UserContext);
  const userName = userData.firstName;
  const lastName = userData.lastName;
  const brand = userData.vehicleBrand;
  const plate = userData.plateNumber;
  const color = userData.vehicleColor;
  const [rideAccepted, setRideAccepted] = useState(false);
  const [rideStarted, setRideStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [arrived, setArrived] = useState(false);
  const [activeRide, setActiveRide] = useState(null); // To store the active ride details

  useEffect(() => {
    console.log("Checking socket connection");

    if (!socket) return;

    if (!socket.connected) {
      console.log("Socket is not connected, forcing reconnect...");
      socket.connect();
    } else {
      console.log("Socket is already connected");
      socket.disconnect();
      console.log("Socket is reconnecting");
      socket.connect();
    }

    // Add listeners for pending rides and new rides
    socket.on("pendingRides", (data) => {
      console.log("Pending rides received", data);
      setCards(data);
    });

    socket.on("recieveCard", (data) => {
      console.log("New ride data received", data);
      setCards((prevCards) => [...prevCards, data]);
    }, []);

    // Cleanup listeners on unmount
    return () => {
      socket.off("pendingRides");
      socket.off("recieveCard");
    };
  }, [socket]);

  useEffect(() => {
    console.log("hello there");
  });

  const sendReaction = (card) => {
    console.log("sending reaction");
    const reactorName = {
      userName,
      lastName,
      brand,
      plate,
      color,
    };
    socket.emit("reaction", { cardSender: card.senderId, reactorName });

    // When a ride is accepted, store the ride data and open the ride-accepted section
    setActiveRide(card);
    setRideAccepted(true);
  };

  const updateRideStatus = (status) => {
    console.log("updating ride status");
    if (activeRide) {
      socket.emit("updateRideStatus", {
        cardSender: activeRide.senderId,
        status,
        reactorName: activeRide.reactorName || "Rider",
      });
    }
  };

  return (
    <div className="rider-container" key={location.pathname}>
      <Sidebar
        fullScreen
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <PricePage activeRide={activeRide} setVisible={setVisible} />
      </Sidebar>
      <h2>Available Rides</h2>
      <br />
      <div style={{ width: "100%", height: "100%" }}>
        {cards.map((card, index) => (
          <RideCard key={index} card={card} sendReaction={sendReaction} />
        ))}
      </div>

      {/* Ride-accepted section */}
      <div
        className="ride-accepted"
        style={{
          height: rideAccepted ? "100vh" : 0,
        }}
      >
        <div id="top-shadow"></div>
        <div
          id="ongoing-map"
          ref={useRef()}
          style={{ width: "100%", height: "55vh" }}
        >
          {activeRide && (
            <RideMap
              userLat={activeRide.userLat}
              userLng={activeRide.userLng}
            />
          )}
        </div>
        <div id="ongoing-map-usage">
          <p>Progress</p>
          <span>2/4km and an approximated 3 mins to go!!</span>
          <br />
          <div id="progress-bar">
            <div id="done"></div>
          </div>
          <br />
          <p>
            <MdTripOrigin style={{ marginRight: "5px" }} /> from :{" "}
            {activeRide ? activeRide.shortUserlocation : "Unknown location"}
          </p>
          <p>
            <MdLocationOn style={{ marginRight: "5px" }} />
            to : {activeRide ? activeRide.location.name : "Unknown destination"}
          </p>
          <div id="actions">
            {arrived ? (
              <>
                <TouchableOpacity
                  id="ongoing-map-buttons"
                  onPress={() => {
                    setRideStarted(true);
                    updateRideStatus("Ride Started");
                  }}
                >
                  <span>{rideStarted ? "on Ride" : "start ride"}</span>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  id="ongoing-map-buttons"
                  onPress={() => {
                    setArrived(true);
                    updateRideStatus("Rider Arrived");
                  }}
                >
                  <span>Click to Arrive</span>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              id="ongoing-map-buttons"
              onPress={() => {
                setRideAccepted(false);
                setRideStarted(false);
                updateRideStatus("Ride Ended");
                setVisible(true);
              }}
            >
              <span>End ride</span>
            </TouchableOpacity>
          </div>
        </div>
      </div>
    </div>
  );
}

function RideCard({ card, sendReaction }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

    if (card.userLat && card.userLng) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [card.userLng, card.userLat],
        zoom: 14,
        attributionControl: false,
      });
      new mapboxgl.Marker().setLngLat([card.userLng, card.userLat]).addTo(map);

      return () => map.remove();
    }
  }, [card.userLat, card.userLng]);

  return (
    <div className="ride-container">
      <span>Username: {card.username}</span>
      <span>Contact: {card.contact}</span>
      <span>Pickup: {card.shortUserlocation}</span>
      <span>Destination: {card.location.name}</span>
      <span>Cost: {card.cost}.shs</span>
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "250px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      ></div>
      <TouchableOpacity
        id="result-button"
        style={{ marginTop: "10px" }}
        onPress={() => sendReaction(card)}
      >
        <p>Accept</p>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        id="result-button"
        onPress={() => sendReaction(card)} // Example for another status
      >
        <p>Decline</p>
      </TouchableOpacity>
    </div>
  );
}

function RideMap({ userLat, userLng }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [userLng, userLat],
      zoom: 14,
      attributionControl: false,
    });

    new mapboxgl.Marker().setLngLat([userLng, userLat]).addTo(map);

    return () => map.remove();
  }, [userLat, userLng]);

  return (
    <div style={{ height: "55vh", width: "100%" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default DriverRideList;

const PricePage = ({ activeRide, setVisible }) => {
  const navigate = useNavigate();
  const done = () => {
    setVisible(false);
    navigate("/");
  };
  return (
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
      <h2>Price to collect</h2>
      <br />
      <br />
      <span>ugx, {activeRide.cost} shs</span>
      <br />
      <br />
      <button style={{ width: "80%" }} onClick={done}>
        <p>Collected</p>
      </button>
    </div>
  );
};
