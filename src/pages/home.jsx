import React from "react";
import { TouchableOpacity } from "react-native-web";
import { Link } from "react-router-dom";
import "../css/home.css";
import dine from "../assets/dine.svg";
import shopping from "../assets/shopping.svg";
import { FaHome, FaServicestack, FaUserAstronaut } from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdSchedule, MdSell } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";

function Home() {
  return (
    <div className="container">
      <div className="topper">
        <div className="upper_topper">
          <TouchableOpacity id="user_icon">
            <div className="user_icon one">
              <FaUserAstronaut color="#fff" size={30} />
            </div>
          </TouchableOpacity>
        </div>
        {/* greet the user */}
        <h2 style={{ margin: "1rem 0" }}>Good morning Marsh !</h2>
        <>
          {/* display date and time */}
          <span>02:43 AM</span>
          <span>Mon, Sep 24</span>
          <br />
        </>
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
          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <CiDeliveryTruck size={34} color="#ffc107" />
              <h2 style={{ fontSize: 16, margin: "1rem 0", color: "#333333" }}>
                Delivery
              </h2>
            </Link>
          </TouchableOpacity>

          {/* express ride button */}
          <TouchableOpacity id="service_item">
            <Link id="link_item" to="/ride-request">
              <GiFullMotorcycleHelmet size={34} color="#0097a7" />
              <h2 style={{ fontSize: 16, margin: "1rem 0", color: "#1a1d23" }}>
                Express
              </h2>
            </Link>
          </TouchableOpacity>

          {/* schedule ride button */}
          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <MdSchedule size={34} color="4caf50" />
              <h2 style={{ fontSize: 16, margin: "1rem 0", color: "#333333" }}>
                Schedule
              </h2>
            </Link>
          </TouchableOpacity>

          {/* dine button */}
          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <img src={dine} style={{ width: "30px" }} />
              <h2 style={{ fontSize: 16, margin: "1rem 0" }}>Dine</h2>{" "}
            </Link>
          </TouchableOpacity>

          {/* shopping button */}
          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <img src={shopping} style={{ width: "30px" }} />
              <h2 style={{ fontSize: 16, margin: "1rem 0" }}>Shopping</h2>{" "}
            </Link>
          </TouchableOpacity>

          {/* auction house button */}
          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <MdSell size={34} color="#ff5a5f" />
              <h2 style={{ fontSize: 16, margin: "1rem 0" }}>
                Auction House
              </h2>{" "}
            </Link>
          </TouchableOpacity>

          {/* button to all services page */}
          <TouchableOpacity id="service_item" style={{ width: "65%" }}>
            <Link id="link_item" to="/ride-request">
              <GiFullMotorcycleHelmet size={34} color="pink" />
              <h2 style={{ fontSize: 16, margin: "1rem 0", color: "#1a1d23" }}>
                All female ride 🤩
              </h2>
            </Link>
          </TouchableOpacity>

          {/* button to all services page */}
          <TouchableOpacity id="service_item" style={{ width: "30%" }}>
            <Link id="link_item">
              <FaServicestack size={34} color="limegreen" />
              <h2 style={{ fontSize: 16, margin: "1rem 0" }}>Services</h2>{" "}
            </Link>
          </TouchableOpacity>
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
            <span style={{ fontSize: 12 }}>All Services</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* profile page */}
      <TouchableOpacity>
        <Link to="/account">
          <span className="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Profile</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}
