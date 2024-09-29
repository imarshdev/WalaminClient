import React from "react";
import "../css/services.css";
import { FaHome, FaServicestack } from "react-icons/fa";
import { TouchableOpacity } from "react-native-web";
import { Link } from "react-router-dom";

import dine from "../assets/dine.svg";
import shopping from "../assets/shopping.svg";
import { RiAuctionLine, RiListSettingsLine } from "react-icons/ri";

import {
  MdEvent,
  MdPayments,
  MdPedalBike,
  MdSchedule,
  MdTour,
} from "react-icons/md";
import { TiTicket } from "react-icons/ti";
import { GiFullMotorcycleHelmet, GiHouse, GiMedicalPack } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaSuitcase } from "react-icons/fa";

function AllServices() {
  return (
    <div className="container2" style={{ height: "100vh", overflow: "scroll" }}>
      <div
        style={{
          width: "100%",
          height: "120vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "end",
          backgroundColor: "#eff2fb",
          boxSizing: "border-box",
          padding: "5rem 1rem",
        }}
      >
        <span style={{ width: "100%", margin: 0 }}>Walamin Services</span>

        {/* delivery button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link to="/ride-request" id="link_item">
            <CiDeliveryTruck size={34} color="#ffc107" />
            <p style={{ color: "#333333", fontWeight: "bold" }}>Delivery</p>
          </Link>
        </button>

        {/* Order ride button */}
        <button id="service_item" style={{ padding: "10px" }}>
          <Link to="/ride-request" id="link_item">
            <GiFullMotorcycleHelmet size={34} color="#0097a7" />
            <p style={{ color: "#1a1d23" }}>Express Ride</p>
          </Link>
        </button>

        {/* schedule ride button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link to="/agree" id="link_item">
            <MdSchedule size={34} color="4caf50" />
            <p style={{ color: "#333333" }}>Schedule ride</p>
          </Link>
        </button>

        {/* the pharmacy button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdPayments size={34} color="8bc34a" />
            <p style={{ color: "#333333" }}>E pay</p>
          </Link>
        </button>

        {/* all female rides button */}
        <button id="service_item" style={{ padding: "10px" }}>
          <Link to="/currentRide" id="link_item">
            <GiFullMotorcycleHelmet size={34} color="pink" />
            <p style={{ color: "#660000" }}>All Female Ride</p>
          </Link>
        </button>

        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdPedalBike size={34} color="#ff9800" />
            <p style={{ color: "#333333" }}>Bikes</p>{" "}
          </Link>
        </button>

        <span style={{ width: "100%", margin: 0 }}>Deal Square</span>

        {/* dine button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <img src={dine} style={{ width: "34px" }} />
            <p style={{ color: "#663300" }}>Dine</p>{" "}
          </Link>
        </button>

        {/* shopping button */}
        <button id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <img src={shopping} style={{ width: "34px" }} />
            <p style={{ color: "" }}>Shopping</p>{" "}
          </Link>
        </button>

        {/* auction house */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <TiTicket size={34} color="dc143c" />
            <p style={{ color: "#330000" }}>Cinemax</p>{" "}
          </Link>
        </button>

        <span style={{ width: "100%", margin: 0 }}>24 Hour Services</span>

        {/* send money button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdEvent size={34} color="8e24aa" />
            <p style={{ color: "" }}>Events</p>{" "}
          </Link>
        </button>

        <button id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <GiMedicalPack size={34} color="#6495ed" />
            <p style={{ color: "#330000" }}>Medicare & Pharmaceuticals</p>
          </Link>
        </button>

        {/* withdrawal button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <RiAuctionLine size={34} color="#ffd700" />
            <p style={{ color: "#663300" }}>Auction House</p>{" "}
          </Link>
        </button>

        <p style={{ width: "100%", margin: 10 }}>More !!</p>

        {/* send money button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdTour size={34} color="#f08080" />
            <p style={{ color: "" }}>Tourism</p>{" "}
          </Link>
        </button>

        <button id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <FaSuitcase size={34} color="#c0c0c0" />
            <p style={{ color: "#330000" }}>Jobs</p>{" "}
          </Link>
        </button>

        {/* withdrawal button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <GiHouse size={34} color="#98ff98" />
            <p style={{ color: "#663300" }}>Rentals & Houses</p>{" "}
          </Link>
        </button>

        {/* send money button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdEvent size={34} color="8e24aa" />
            <p style={{ color: "" }}>Events</p>{" "}
          </Link>
        </button>

        <button id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <GiMedicalPack size={34} color="#6495ed" />
            <p style={{ color: "#330000" }}>Medicare & Pharmaceuticals</p>{" "}
          </Link>
        </button>

        {/* withdrawal button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <RiAuctionLine size={34} color="#ffd700" />
            <p style={{ color: "#663300" }}>Auction House</p>{" "}
          </Link>
        </button>

        {/* send money button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdEvent size={34} color="8e24aa" />
            <p style={{ color: "" }}>Events</p>{" "}
          </Link>
        </button>

        <button id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <GiMedicalPack size={34} color="#6495ed" />
            <p style={{ color: "#330000" }}>Medicare & Pharmaceuticals</p>{" "}
          </Link>
        </button>

        {/* withdrawal button */}
        <button
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <RiAuctionLine size={34} color="#ffd700" />
            <p style={{ color: "#663300" }}>Auction House</p>{" "}
          </Link>
        </button>

        <div className="bottom-space"></div>
      </div>
      <Navigator />
    </div>
  );
}
export default AllServices;

export function Navigator() {
  return (
    <div className="navigator">
      {/* home page */}
      <TouchableOpacity>
        <Link to="/">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "darkgreen" }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* wallet page */}
      <TouchableOpacity>
        <Link to="/services">
          <span className="icon_button">
            <FaServicestack color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>All Services</span>
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
    </div>
  );
}
