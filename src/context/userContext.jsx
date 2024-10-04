import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    contact: "",
    firstName: "",
    lastName: "",
    isLoggedIn: true,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Only store in localStorage if the user is logged in or if the data has meaningful content
    if (
      userData.isLoggedIn ||
      userData.contact ||
      userData.firstName ||
      userData.lastName
    ) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
