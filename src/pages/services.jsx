import React from "react";
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
    <div className="container" style={{height: "150vh", overflow: "scroll"}}>
      <div
        className="mid_details_upper"
        style={{
          width: "100%",
          height: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          backgroundColor: "#eff2fb",
          boxSizing: "border-box",
          padding: "10px"
        }}
      >
        <p style={{ width: "100%", margin: 10 }}>Walamin Services</p>

        {/* delivery button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link to="/map2" id="link_item">
            <CiDeliveryTruck size={34} color="#ffc107" />
            <p style={{ fontSize: 12, color: "#333333" }}>Delivery Services</p>
          </Link>
        </TouchableOpacity>

        {/* Order ride button */}
        <TouchableOpacity id="service_item" style={{ padding: "10px" }}>
          <Link to="/currentRide" id="link_item">
            <GiFullMotorcycleHelmet size={34} color="#0097a7" />
            <p style={{ fontSize: 12, color: "#1a1d23" }}>Express Ride</p>
          </Link>
        </TouchableOpacity>

        {/* schedule ride button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link to="/agree" id="link_item">
            <MdSchedule size={34} color="4caf50" />
            <p style={{ fontSize: 12, color: "#333333" }}>Schedule ride</p>
          </Link>
        </TouchableOpacity>

        {/* the pharmacy button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdPayments size={34} color="8bc34a" />
            <p style={{ fontSize: 12, color: "#333333" }}>E pay</p>
          </Link>
        </TouchableOpacity>

        {/* all female rides button */}
        <TouchableOpacity id="service_item" style={{ padding: "10px" }}>
          <Link to="/currentRide" id="link_item">
            <GiFullMotorcycleHelmet size={34} color="pink" />
            <p style={{ fontSize: 12, color: "#660000" }}>All Female Ride</p>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdPedalBike size={34} color="#ff9800" />
            <p style={{ fontSize: 12, color: "#333333" }}>Bikes</p>{" "}
          </Link>
        </TouchableOpacity>

        <p style={{ width: "100%", margin: 10 }}>Deal Square</p>

        {/* dine button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <img src={dine} style={{ width: "34px" }} />
            <p style={{ fontSize: 12, color: "#663300" }}>Dine</p>{" "}
          </Link>
        </TouchableOpacity>

        {/* shopping button */}
        <TouchableOpacity id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <img src={shopping} style={{ width: "34px" }} />
            <p style={{ fontSize: 12, color: "" }}>Shopping</p>{" "}
          </Link>
        </TouchableOpacity>

        {/* auction house */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <TiTicket size={34} color="dc143c" />
            <p style={{ fontSize: 12, color: "#330000" }}>Cinemax</p>{" "}
          </Link>
        </TouchableOpacity>

        <p style={{ width: "100%", margin: 10 }}>24 Hour Services</p>

        {/* send money button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdEvent size={34} color="8e24aa" />
            <p style={{ fontSize: 12, color: "" }}>Events</p>{" "}
          </Link>
        </TouchableOpacity>

        <TouchableOpacity id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <GiMedicalPack size={34} color="#6495ed" />
            <p style={{ fontSize: 12, color: "#330000" }}>
              Medicare & Pharmaceuticals
            </p>{" "}
          </Link>
        </TouchableOpacity>

        {/* withdrawal button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <RiAuctionLine size={34} color="#ffd700" />
            <p style={{ fontSize: 12, color: "#663300" }}>Auction House</p>{" "}
          </Link>
        </TouchableOpacity>

        <p style={{ width: "100%", margin: 10 }}>More !!</p>

        {/* send money button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdTour size={34} color="#f08080" />
            <p style={{ fontSize: 12, color: "" }}>Tourism</p>{" "}
          </Link>
        </TouchableOpacity>

        <TouchableOpacity id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <FaSuitcase size={34} color="#c0c0c0" />
            <p style={{ fontSize: 12, color: "#330000" }}>Jobs</p>{" "}
          </Link>
        </TouchableOpacity>

        {/* withdrawal button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <GiHouse size={34} color="#98ff98" />
            <p style={{ fontSize: 12, color: "#663300" }}>
              Rentals & Houses
            </p>{" "}
          </Link>
        </TouchableOpacity>

        {/* send money button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdEvent size={34} color="8e24aa" />
            <p style={{ fontSize: 12, color: "" }}>Events</p>{" "}
          </Link>
        </TouchableOpacity>

        <TouchableOpacity id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <GiMedicalPack size={34} color="#6495ed" />
            <p style={{ fontSize: 12, color: "#330000" }}>
              Medicare & Pharmaceuticals
            </p>{" "}
          </Link>
        </TouchableOpacity>

        {/* withdrawal button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <RiAuctionLine size={34} color="#ffd700" />
            <p style={{ fontSize: 12, color: "#663300" }}>Auction House</p>{" "}
          </Link>
        </TouchableOpacity>

        {/* send money button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <MdEvent size={34} color="8e24aa" />
            <p style={{ fontSize: 12, color: "" }}>Events</p>{" "}
          </Link>
        </TouchableOpacity>

        <TouchableOpacity id="service_item" style={{ padding: "10px" }}>
          <Link id="link_item">
            <GiMedicalPack size={34} color="#6495ed" />
            <p style={{ fontSize: 12, color: "#330000" }}>
              Medicare & Pharmaceuticals
            </p>{" "}
          </Link>
        </TouchableOpacity>

        {/* withdrawal button */}
        <TouchableOpacity
          id="service_item"
          style={{ marginTop: "20px", padding: "10px" }}
        >
          <Link id="link_item">
            <RiAuctionLine size={34} color="#ffd700" />
            <p style={{ fontSize: 12, color: "#663300" }}>Auction House</p>{" "}
          </Link>
        </TouchableOpacity>
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
