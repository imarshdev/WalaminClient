import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    contact: "",
    firstName: "",
    lastName: "",
    isLoggedIn: false,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        setUserData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (
      userData &&
      (userData.isLoggedIn ||
        userData.contact ||
        userData.firstName ||
        userData.lastName)
    ) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const clearStorage = () => {
    localStorage.removeItem("userData");
    setUserData({
      contact: "",
      firstName: "",
      lastName: "",
      isLoggedIn: false,
    });
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, clearStorage }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
