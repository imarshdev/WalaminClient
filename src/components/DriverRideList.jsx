import React, { useState, useEffect, useContext, useRef } from "react";
import { TouchableOpacity } from "react-native-web";
import "../css/driver.css";
import io from "socket.io-client";
import { UserContext } from "../context/userContext";
import { MdLocationOn, MdTripOrigin } from "react-icons/md";
const socket = io("https://walaminserver.onrender.com");

function DriverRideList() {
  const { userData, setUserData } = useContext(UserContext);
  const [userName, setUsername] = useState(userData.firstName);
  const [rideaccepted, setRideaccepted] = useState(false);
  const [rideStarted, setRideStarted] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    socket.on("recieveCard", (data) => {
      console.log("data recieved");
      console.log(data.username);
      setCards((prevCards) => [...prevCards, data]);
    });

    return () => {
      socket.off("recieveCard");
    };
  }, []);

  const sendReaction = (cardSender) => {
    console.log("sending reaction");
    const reactorName = userName;
    socket.emit("reaction", { cardSender, reactorName });
  };
  return (
    <div className="rider-container">
      <h2>Available Rides</h2>
      <br />
      <div style={{ width: "100%", height: "100%" }}>
        {cards.map((card, index) => (
          <RideCard key={index} card={card} sendReaction={sendReaction} />
        ))}
      </div>
      <TouchableOpacity
        id="ongoing-map-buttons"
        onPress={() => setRideaccepted(true)}
      >
        <p>Open ride</p>
      </TouchableOpacity>
      <div
        className="ride-accepted"
        style={{
          height: rideaccepted ? "100vh" : 0,
        }}
      >
        <div id="top-shadow"></div>
        <div id="ongoing-map"></div>
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
            {"4R Ntinda Rd, Kampala Uganda"}
          </p>
          <p>
            <MdLocationOn style={{ marginRight: "5px" }} />
            to : {"Acacia Mall, Cooper Rd, Kampala Uganda"}
          </p>
          <div id="actions">
            <TouchableOpacity
              id="ongoing-map-buttons"
              onPress={() => setRideStarted(true)}
            >
              <span>{rideStarted ? "on Ride" : "start ride"}</span>
            </TouchableOpacity>
            <TouchableOpacity
              id="ongoing-map-buttons"
              onPress={() => setRideaccepted(false)}
            >
              <span>End ride</span>
            </TouchableOpacity>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

function RideCard({ card, sendReaction, sendMessage, messages }) {
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

  const updateRideStatus = (status) => {
    console.log("updating ride status");
    socket.emit("updateRideStatus", {
      cardSender: card.senderId,
      status,
      reactorName: card.reactorName || "Rider",
    });
  };

  return (
    <div className="ride-container">
      <span>Username: {card.username}</span>
      <span>Contact: {card.contact}</span>
      <span>Pickup: {card.shortUserlocation}</span>
      <span>Destination: {card.location}</span>
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
        onPress={() => sendReaction(card.senderId)}
      >
        <p>Accept</p>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        id="result-button"
        onPress={() => updateRideStatus("Rider has arrived")}
      >
        <p>Slide to arrive</p>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        id="result-button"
        onPress={() => updateRideStatus("Ride Ended")}
      >
        <p>End Ride</p>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: "red" }} id="result-button">
        <p>Decline</p>
      </TouchableOpacity>
    </div>
  );
}

export default DriverRideList;
