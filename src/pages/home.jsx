import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-web";
import { Link, useNavigate } from "react-router-dom";
import "../css/home.css";
import io from "socket.io-client";
import dine from "../assets/dine.svg";
import femaleRide from "../assets/f-ride.jpg";
import shopping from "../assets/shopping.svg";
import { FaHome, FaServicestack, FaUserAstronaut } from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdSchedule, MdSell } from "react-icons/md";
import { UserContext } from "../context/userContext";
import { RiderContext } from "../context/riderContext";

const socket = io("https://walaminserver.onrender.com");

function Home() {
  const { userData, setUserData } = useContext(UserContext);
  const [greeting, setGreeting] = useState();
  const [currentTimeString, setCurrentTimeString] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.isLoggedIn === false) {
      console.log("not logged in");
      navigate("/signin", { replace: true });
    } else {
      console.log("Logged in");
    }
  }, [userData]);

  useEffect(() => {
    console.log("home userdata log", userData);
  }, [userData]);

  // this is simply getting the current time at all times to ensure proper greeting of the current user
  useEffect(() => {
    const currentTime = new Date().getHours();
    let time;

    if (currentTime < 12) {
      time = "Good morning ";
    } else if (currentTime < 18) {
      time = "Good afternoon ";
    } else {
      time = "Good evening ";
    }
    setGreeting(time);
  });

  // this is a timer to make sure the greeting is updated in real time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeString(new Date());
    }, 1000);
    return () => clearInterval(timer);
  });

  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const dateOptions = { weekday: "short", month: "short", day: "2-digit" };

  const formattedTime = currentTimeString.toLocaleTimeString(
    "en-US",
    timeOptions
  );
  const formattedDate = currentTimeString.toLocaleDateString(
    "en-US",
    dateOptions
  );

  return (
    <div className="container">
      <div className="topper">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            height: "50%",
          }}
        >
          {/* greet the user */}
          <span style={{ fontSize: 18 }}>
            {greeting} {userData.firstName} !{userData.isLoggedIn}
          </span>
          <>
            {/* display date and time */}
            <span>
              {formattedTime} - {formattedDate}
            </span>
          </>
        </div>
        <div className="widget">
          <div className="text">
            <div
              style={{
                height: "40%",
                display: "flex",
                flexDirection: "column",
                marginBottom: 0,
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 12, margin: 0 }}>fun with friends</span>
              <span style={{ fontSize: 14, margin: 0 }}>
                Get a free ride by referring
              </span>
            </div>
            <TouchableOpacity id="refer-button">
              <span style={{ fontSize: 14, color: "#fff" }}>
                Refer a Friend
              </span>
            </TouchableOpacity>
          </div>
        </div>
      </div>
      <div className="mid_details">
        <div className="mid_details_upper">
          <h2
            style={{
              width: "100%",
              textAlign: "start",
              padding: "10px",
              margin: "0px",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
            }}
          >
            Walamin Services
          </h2>
          {/* delivery button */}
          <button id="service_item">
            <Link id="link_item" to="/ride-request">
              <CiDeliveryTruck size={34} color="#ffc107" />
              <p style={{ fontSize: 14, margin: "1rem 0" }}>Delivery</p>
            </Link>
          </button>

          {/* express ride button */}
          <button id="service_item">
            <Link id="link_item" to="/ride-request">
              <GiFullMotorcycleHelmet size={34} color="#0097a7" />
              <p style={{ fontSize: 14, margin: "1rem 0" }}>Express</p>
            </Link>
          </button>

          {/* schedule ride button */}
          <button id="service_item">
            <Link to="/schedule-ride" id="link_item">
              <MdSchedule size={34} color="4caf50" />
              <p style={{ fontSize: 14, margin: "1rem 0" }}>Schedule</p>
            </Link>
          </button>

          {/* dine button */}
          <button id="service_item">
            <Link id="link_item">
              <img src={dine} style={{ width: "30px" }} />
              <p style={{ fontSize: 14, margin: "1rem 0" }}>Dine</p>{" "}
            </Link>
          </button>

          {/* shopping button */}
          <button id="service_item">
            <Link id="link_item">
              <img src={shopping} style={{ width: "30px" }} />
              <p style={{ fontSize: 14, margin: "1rem 0" }}>Shopping</p>{" "}
            </Link>
          </button>

          {/* auction house button */}
          <button id="service_item">
            <Link id="link_item">
              <MdSell size={34} color="#ff5a5f" />
              <p style={{ fontSize: 14, margin: "1rem 0" }}>
                Auction House
              </p>{" "}
            </Link>
          </button>

          {/* button to all services page */}
          <button
            id="service_item"
            style={{
              width: "100%",
              padding: "0px",
              overflow: "hidden",
              height: "10rem",
              backgroundColor: "pink",
              position: "relative",
              overflowY: "initial",
            }}
          >
            <div id="tag">
              <p style={{ color: "darkgreen" }}>All New</p>
            </div>
            <Link
              id="link_item"
              to="/ride-request"
              style={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img src={femaleRide} style={{ height: "100%" }} />
              <span style={{ flexGrow: 1 }}>
                <br />
                <br />
                Rides by Women <br />
                for women
              </span>
            </Link>
          </button>
        </div>
        <div className="mid_details_lower">
          <div className="image"></div>
        </div>
      </div>

      <Navigator />
    </div>
  );
}

export default Home;

export function Navigator() {
  return (
    <div className="navigator">
      {/* home page */}
      <TouchableOpacity>
        <Link to="/">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* wallet page */}
      <TouchableOpacity>
        <Link to="/services">
          <span className="icon_button">
            <FaServicestack color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "darkgreen" }}>
              All Services
            </span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* profile page */}
      <TouchableOpacity>
        <Link to="/account">
          <span className="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "darkgreen" }}>Profile</span>
          </span>
        </Link>
      </TouchableOpacity>
      <NewRideNot />
    </div>
  );
}

export const NewRideNot = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [newRide, setNewRide] = useState(false);
  useEffect(() => {
    console.log(`is Rider? ${userData.isRider}`);
    console.log(`rider vehicleBrand? ${userData.vehicleBrand}`);
  }, [userData]);
  useEffect(() => {
    socket.on("recieveCard", (data) => {
      console.log("data received", data);
      setNewRide(true);
    });

    return () => {
      socket.off("recieveCard");
    };
  }, []);
  return (
    <>
      {userData.isRider ? (
        <TouchableOpacity id="notification">
          <span style={{ color: "green" }}>{newRide ? "1 new ride" : "!"}</span>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};
