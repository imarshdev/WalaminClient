import React, { createContext, useState } from "react";

export const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: "John Doe",
    contact: "john@example.com",
  });
  const [destination, setDestination] = useState(null);

  return (
    <RideContext.Provider value={{ userData, destination, setDestination }}>
      {children}
    </RideContext.Provider>
  );
};
