import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
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

function truncateText(text, length) {
  return text.substring(0, length) + (text.length > length ? "…" : "");
}

export default function RideRequest() {
  const [userLat, setUserLat] = useState();
  const [userLng, setUserLng] = useState();
  const [shortUserlocation, setShortUserlocation] = useState();
  const [userLocation, setUserLocation] = useState();
  const [open, setOpen] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [distance, setDistance] = useState();
  const [cost, setCost] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setUserLat(lat);
      setUserLng(lng);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const maxLength = 50;
        const shortname =
          data.display_name.length > maxLength
            ? data.display_name.substring(0, maxLength) + "..."
            : data.display_name;
        setShortUserlocation(shortname);
        setUserLocation(data.display_name); // Update state with the place name
        console.log("short name:", shortname);
        console.log("Place Name:", data.display_name);
      } catch (error) {
        console.log("Error fetching place name:", error.message);
      }
    });
  });
  return (
    <div style={{ width: "100%", height: "100%" }}>
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
        />
      </BottomSheet>
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
          <p style={{ padding: "0px" }}>Distance: {distance && <>{distance} km</>}</p>
          <img src={scooter} style={{ width: "10rem", right: 0 }} />
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
          <>
            <TouchableOpacity
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
              <p style={{ color: "#fff" }}>Order Ride</p>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => setConfirmed(true)}
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
function ApiCalls() {
  useEffect(() => {});
  return;
}

function SearchThing({ shortUserlocation, onLocationSelect }) {
  const [open, setOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locationItem, setLocationItem] = useState();
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
  const handleSelect = (location) => {
    if (!locationItem) {
      setLocationItem(location);
      onLocationSelect(location);
    } else {
      console.log("item already exists");
    }
    console.log(location.name);
    console.log(`lat: ${location.location.lat}, lng: ${location.location.lng}`);

    setFilteredLocations([]);
    setOpen(false);
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
            style={{ width: "100%", paddingLeft: "20px" }}
          />
        </div>
        <br />
        {filteredLocations.length > 0 && (
          <>
            {filteredLocations.map((location, index) => (
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
            ))}
          </>
        )}
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
  const [map, setMap] = useState();
  const mapContainerRef = useRef();
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [lng1, lat1], // Starting position [lng, lat]
      zoom: 15, // Starting zoom level
      attributionControl: false,
    });
    setMap(map);
    const startMarker = document.createElement("div");
    const root = createRoot(startMarker);
    root.render(<OriginMarker />);
    new mapboxgl.Marker(startMarker)
      .setLngLat({
        lng: lng1,
        lat: lat1,
      })
      .addTo(map);

    // Initialize the Mapbox Directions plugin
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: "mapbox/walking", // You can change this to walking, cycling, etc.
      alternatives: false,
      geometries: "geojson",
      controls: { instructions: false, inputs: false },
    });

    map.addControl(directions);
    setDirections(directions);

    // If a destination is selected, set the origin and destination
    if (selectedLocation) {
      console.log(selectedLocation);
      const lat = selectedLocation.location.lat;
      const lng = selectedLocation.location.lng;

      setDestinationCoords([lng, lat]);

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
    // Clean up on unmount
    return () => map.remove();
  }, [lat1, lng1, selectedLocation]);
  useEffect(() => {
    if (confirmed === true) {
      // Set the origin to user's location and destination to the selected location
      directions.setOrigin([lng1, lat1]); // User's current location
      directions.setDestination(destinationCoord); // Selected location
      // Optionally fit the bounds to show both the user's location and the destination
      map.fitBounds(
        [
          [lng1, lat1], // User's location
          [destinationCoord[0], destinationCoord[1]], // Selected location
        ],
        { padding: 100 }
      );
      directions.on("route", (e) => {
        const route = e.route[0];
        console.log("Route:", route); // Check route object

        if (route && route.distance) {
          const distance = (route.distance / 1000).toFixed(2);
          console.log(`Distance: ${distance} km`);
          const cost = (Math.ceil(distance) * 500).toLocaleString();
          console.log(`cost is Ugx ${cost}Shs.`);
          setCost(cost);
          setDistance(distance);
        } else {
          console.log("Route or distance is undefined");
        }
      });
    }
  }, [confirmed]);
  return (
    <>
      <div id="map" ref={mapContainerRef} style={{ height: "60vh" }}></div>
      <div style={{ height: "50vh", width: "100%" }}>
        <div id="top-shadow"></div>
      </div>
    </>
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