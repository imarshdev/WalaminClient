import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native-web";
import "../css/driver.css";
import io from "socket.io-client";
import { UserContext } from "../context/userContext";
const socket = io("https://walaminserver.onrender.com");

function DriverRideList() {
  const { userData, setUserData } = useContext(UserContext);
  const [userName, setUsername] = useState(userData.firstName);
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
          <div className="ride-container" index={index}>
            <span>username: {card.username}</span>
            <span>contact: {card.contact}</span>
            <span>Pickup: {card.userLocation}</span>
            <span>Destination: {card.location}</span>
            <TouchableOpacity
              id="result-button"
              onPress={() => sendReaction(card.senderId)}
            >
              <p>Accept</p>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "red" }}
              id="result-button"
            >
              <p>Decline</p>
            </TouchableOpacity>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverRideList;
