import React, { createContext, useEffect, useState } from "react";

const RiderContext = createContext();

const RiderProvider = ({ children }) => {
  const [riderData, setRiderData] = useState({
    vehicleBrand: "Bajaj",
    plateNumber: "",
    vehicleColor: "",
    isRider: true,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("riderData");
    if (storedData) {
      setRiderData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("riderData", JSON.stringify(riderData));
  }, [riderData]);

  return (
    <RiderContext.Provider value={{ riderData, setRiderData }}>
      {children}
    </RiderContext.Provider>
  );
};

export { RiderContext, RiderProvider };
