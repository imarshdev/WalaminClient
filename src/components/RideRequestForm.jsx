import React, { useState, useEffect, useRef, useContext } from "react";
import "../css/ride.css";
import { Dialog } from "primereact/dialog";
import "react-spring-bottom-sheet/dist/style.css";
import locationsData from "../locations/filteredLocations.json";
import { BottomSheet } from "react-spring-bottom-sheet";
import { TouchableOpacity } from "react-native-web";
import { MdLocationOn } from "react-icons/md";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getDistance } from "geolib";
import { UserContext } from "../context/userContext";
const socket = io("https://walaminserver.onrender.com");
function RideRequestForm() {
  const [inputValue, setInputValue] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loactionItem, setLocationItem] = useState();
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
    setInputValue(location.name);
    setLocation(location);
    if (!loactionItem) {
      setLocationItem(location);
    } else {
      console.log("item already exists");
    }
    console.log(location.name);
    setFilteredLocations([]);
  };
  const mapContainerRef = useRef(null);
  const { userData, setUserData } = useContext(UserContext);
  const [notification, setNotification] = useState("");
  const [rideStatus, setRideStatus] = useState();
  const [username, setUsername] = useState(userData.firstName);
  const [contact, setContact] = useState(userData.contact);
  const [userLocation, setUserLocation] = useState();
  const [shortUserlocation, setShortUserlocation] = useState();
  const [userLat, setUserLat] = useState();
  const [userLng, setUserLng] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    socket.on("notifyReaction", ({ message }) => {
      console.log("result received", message);
      setCostSheetOpen(false);
      setResultSheet(true);
      setNotification(message);
    });
    return () => {
      socket.off("notifyReaction");
    };
  }, []);
  useEffect(() => {
    socket.on("rideStatusUpdate", (data) => {
      console.log("status updated");
      console.log("status updated:", data.status);
      setRideSheet(true);
      setResultSheet(false);
      setRideStatus(data.status);
    });
    return () => {
      socket.off("rideStatusUpdate");
    };
  });
  const [map, setMap] = useState();
  const [open, setOpen] = useState(true);
  const [searching, setSearching] = useState(false);
  const [typing, setTyping] = useState(false);
  const [location, setLocation] = useState("");
  const [mapHeight, setMapHeight] = useState(true);
  const [costSheetOpen, setCostSheetOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [resultSheet, setResultSheet] = useState(false);
  const [rideSheet, setRideSheet] = useState(false);
  const [result, setresult] = useState(true);
  const [LocationSelected, setLocationSelected] = useState(false);
  const [directions, setDirections] = useState();
  const [cost, setCost] = useState();
  const [zoom, setZoom] = useState(15);
  const [centerLat, setCenterLat] = useState();
  const [centerLng, setCenterLng] = useState();
  const inputRef = useRef();
  const navigate = useNavigate();
  const back = () => navigate("/");

  useEffect(() => {
    const handleScroll = () => window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SendRide = () => {
    if (location) {
      const cardData = {
        username,
        contact,
        userLat,
        userLng,
        userLocation,
        shortUserlocation,
        location,
        cost,
        senderId: socket.id,
      };
      socket.emit("sendCard", cardData);
    }
  };

  function truncateText(text, length) {
    return text.substring(0, length) + (text.length > length ? "…" : "");
  }

  const inputFocused = () => {
    setSearching(true);
  };
  const inputUnFocused = () => {
    setTimeout(() => {
      setTyping(null);
    }, 100);
    setMapHeight(false);
    setSearching(false);
  };
  const inputChanging = (event) => {
    setTyping(true);
    setInputValue(event.target.value);
  };
  const locationSelected = () => {
    setMapHeight(true);
    setOpen(false);
    setCostSheetOpen(true);
    setLocationSelected(true);
    if (location) {
      directions.setOrigin([userLng, userLat]);
      directions.setDestination([location.location.lng, location.location.lat]);
      directions.on("route", (event) => {
        const route = event.route[0]; // Get the first route
        if (route) {
          console.log("route available");

          // Ensure the geometry is a valid GeoJSON LineString
          const geoJsonData = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route.geometry.coordinates, // Make sure this exists
            },
          };

          // Check if the 'route' layer already exists
          if (map.getLayer("route")) {
            map.removeLayer("route");
            map.removeSource("route");
          }

          // Add the new source and layer
          map.addSource("route", {
            type: "geojson",
            data: geoJsonData, // Use the constructed GeoJSON data
          });

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "pink",
              "line-width": 2, // You can adjust the width
              "line-opacity": 0.75,
            },
          });
        }
      });
      map.flyTo({ center: [centerLng, centerLat], zoom: zoom });
      console.log(`zoom level: ${zoom}`);
    }
  };
  const declined = () => {
    setOpen(true);
    setTyping(false);
    setCostSheetOpen(false);
    setResultSheet(false);
    window.location.reload();
  };
  useEffect(() => {
    if (rideStatus === "Ride Ended") {
      setVisible(true);
    }
  }, [rideStatus]);
  const ordered = () => {
    SendRide();
    setWaiting(true);
  };
  useEffect(() => {
    if (location) {
      console.log(location);
      console.log("userlocation", userLocation);
      console.log(contact);
      console.log(username);
    }
  }, [location]);
  useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(lat);
          console.log(lng);
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
        },
        (error) => {
          console.log("Error getting location:", error);
        }
      );
    };

    getLocation();
  }, []); // Add dependencies for useEffect

  useEffect(() => {
    console.log("userplace name", userLocation);
  }, [userLocation]);
  useEffect(() => {
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

    if (userLat || userLng) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11", // Map style
        center: [userLng, userLat], // Starting position [lng, lat]
        zoom: 15, // Starting zoom level
        attributionControl: false,
      });
      setMap(map);
      const marker = new mapboxgl.Marker().setLngLat({
        lng: userLng,
        lat: userLat,
      });
      marker.addTo(map);

      const directions = new window.MapboxDirections({
        accessToken:
          "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg",
        unit: "metric",
        profile: "mapbox/walking",
        alternatives: false,
        geometries: "geojson",
        controls: { instructions: false, inputs: false },
        flyTo: true,
      });

      map.addControl(directions);
      setDirections(directions);

      const updateMapCenter = (lng, lat) => {
        map.flyTo({ center: [lng, lat], zoom: 15 });
        marker.setLngLat([lng, lat]);
      };
      if (location) {
        updateMapCenter(location.location.lng, location.location.lat);
      }
      return () => map.remove();
    }
  }, [userLat, userLng, location]);
  useEffect(() => {
    if (location) {
      console.log("location object", location);
    }
  }, [location]);
  useEffect(() => {
    if (location) {
      const userLocation = { latitude: userLat, longitude: userLng };
      const destination = {
        latitude: location.location.lat,
        longitude: location.location.lng,
      };
      const distance = getDistance(userLocation, destination);
      const distanceinKm = (distance / 1000).toFixed(1);
      console.log(`distance: ${distance} meters`);
      console.log(`distance: ${distanceinKm} km`);
      if (distanceinKm <= 2) setZoom(14);
      else if (distanceinKm <= 4) setZoom(13);
      else if (distanceinKm <= 6) setZoom(12);
      else if (distanceinKm <= 8) setZoom(11);
      else if (distanceinKm <= 10) setZoom(10);
      else {
        // For distances greater than 10km, decrease zoom level by 1 for every 2km
        setZoom(Math.max(8, 10 - Math.floor((distanceinKm - 10) / 2)));
      }
      const zoom = Math.floor(Math.log2(40075 / distance)) + 1;
      console.log(`Required zoom level: ${zoom}`);
      const price = (1000 + ((distance / 1000 - 2) / 0.5) * 500).toFixed(0);
      console.log(`${price} shs`);
      setCost(price);
      const midLat = (userLat + location.location.lat) / 2;
      const midLng = (userLng + location.location.lng) / 2;
      setCenterLat(midLat);
      setCenterLng(midLng);
    }
  }, [location]);
  return (
    <div
      className="container2"
      style={{ boxSizing: "border-box", padding: "0px" }}
    >
      <Dialog
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div style={{ width: "100%", height: "100vh" }}>
          <h1>Price to pay</h1>
          <span>ugx, {cost} shs.</span>
          <button onClick={() => setVisible(false)}>
            <p>Collected</p>
          </button>
        </div>
      </Dialog>
      <div id="top-shadow"></div>
      <div
        id="map"
        ref={mapContainerRef}
        style={{
          height: costSheetOpen ? "55vh" : typing === null ? "80vh" : "70vh",
        }}
      ></div>
      <TouchableOpacity onPress={back} id="go-back">
        <RiArrowLeftLine color="black" size={25} />
      </TouchableOpacity>
      <BottomSheet
        className="location-input-sheet"
        blocking={false}
        skipInitialTransition
        snapPoints={({ maxHeight, minHeight }) => [
          searching ? maxHeight / 1.05 : minHeight,
        ]}
        open={open}
        header={
          <label style={{ width: "100%", textAlign: "start" }}>
            <span style={{ width: "100%" }}>Where to ?</span>
            <input
              style={{ color: "black" }}
              type="text"
              className="location-input"
              ref={inputRef}
              value={inputValue}
              onFocus={inputFocused}
              onChange={inputChanging}
              onBlur={inputUnFocused}
            />
          </label>
        }
      >
        {typing ? (
          <>
            {filteredLocations.length > 0 && (
              <>
                {filteredLocations.map((location, index) => (
                  <TouchableOpacity
                    id="location-item"
                    key={index}
                    onPress={() => handleSelect(location)}
                  >
                    <MdLocationOn
                      color="green"
                      size={20}
                      style={{ marginRight: "15px" }}
                    />
                    <span>
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
          </>
        ) : typing === false ? (
          <>
            <p>Saved</p>
            <TouchableOpacity id="location-item">
              <MdLocationOn
                color="limegreen"
                size={20}
                style={{ marginRight: "15px" }}
              />
              {loactionItem ? (
                <>
                  <span>
                    {truncateText(loactionItem.name, 30)}
                    <br />
                    <span style={{ fontSize: "12px" }}>
                      {truncateText(loactionItem.address, 30)}
                    </span>
                  </span>
                </>
              ) : (
                <span>formatted Address</span>
              )}
            </TouchableOpacity>
            <br />
            <p></p>
          </>
        ) : typing === null ? (
          <TouchableOpacity
            onPress={locationSelected}
            id="confirm-location-button"
          >
            <p style={{ color: "#fff" }}>Confirm Location</p>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </BottomSheet>
      <BottomSheet
        blocking={false}
        skipInitialTransition
        snapPoints={({ maxHeight, minHeight }) => [minHeight]}
        open={costSheetOpen}
      >
        {waiting ? (
          <div className="waiting">
            <p>WAITING.........</p>
            <br />
            <TouchableOpacity
              onPress={declined}
              id="decline"
              style={{ width: "100%" }}
            >
              <p style={{ color: "#fff" }}>Cancel Ride</p>
            </TouchableOpacity>
          </div>
        ) : (
          <div className="cost-estimate">
            <div className="price-container">
              <h2 style={{ color: "#fff" }}>Cost: {cost}.oo shs</h2>
              <span style={{ color: "#fff" }}>Go walamin, go green</span>
            </div>
            <p className="pick-up">
              <MdLocationOn /> Pick-up: <br />
              <br />
              <span className="location-span">{userLocation}</span>
            </p>
            <p className="drop-off">
              <MdLocationOn /> Destination: <br />
              <br />
              <span className="location-span">{location.name}</span>
            </p>
            <div className="action-container">
              <TouchableOpacity onPress={declined} id="decline">
                <p style={{ color: "#fff" }}>Decline</p>
              </TouchableOpacity>
              <TouchableOpacity onPress={ordered} id="comfirm">
                <p style={{ color: "#fff" }}>Order</p>
              </TouchableOpacity>
            </div>
          </div>
        )}
      </BottomSheet>
      <BottomSheet blocking={false} open={resultSheet}>
        {result ? (
          <div className="result">
            <p>Your captain {notification.userName} is on his way</p>
            <div className="driver-details">
              <p>
                Name: {notification.userName} {notification.lastName}
              </p>
              <p>
                {notification.brand}, {notification.color}
              </p>
              <p>{notification.plate}</p>
            </div>
            <br />
            <br />
            <div className="action-container">
              <TouchableOpacity
                onPress={declined}
                id="decline"
                style={{ width: "100%" }}
              >
                <p style={{ color: "#fff" }}>Cancel Ride</p>
              </TouchableOpacity>
            </div>
          </div>
        ) : (
          <div className="result">
            <p> Sorry, we have no riders available at the moment</p>
          </div>
        )}
      </BottomSheet>
      <BottomSheet
        blocking={false}
        open={rideSheet}
        snapPoints={({ minHeight }) => [minHeight]}
      >
        <div className="result" style={{ height: "auto" }}>
          {rideStatus === "Rider Arrived" ? (
            <p>Your captain {notification} has arrived</p>
          ) : rideStatus === "Ride Started" ? (
            <p>Your ride has started</p>
          ) : (
            rideStatus === "Ride Ended" && <p>Your ride has ended</p>
          )}
          <div className="driver-details">
            <p>Name: {notification}</p>
            <p>Bajaj 120, lemon green</p>
            <p>UFU171C</p>
          </div>
          <br />
          <br />
          <div className="action-container"></div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default RideRequestForm;
