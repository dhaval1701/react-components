import React, { useState, createContext, useEffect } from "react";
import CryptoJS from "crypto-js";

// Create the context
export const GlobalContext = createContext();

const secretKey = "your-secret-key"; // Replace with your own secret key

const encodeValue = (value) => {
  const stringifiedValue = JSON.stringify(value);
  return CryptoJS.AES.encrypt(stringifiedValue, secretKey).toString(); // Encrypt the value
};

const decodeValue = (value) => {
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedValue); // Parse the decrypted value back to JSON
};

const GlobalCommonContextProvider = (props) => {
  const [commonGlobalVal, setCommonGlobalVal] = useState({
    window_: window,
    userType_: localStorage.getItem("userType_")
      ? decodeValue(localStorage.getItem("userType_"))
      : {},
  });

  // Update the context value and store it in localStorage
  const updateCommonGlobalVal = (key, value) => {
    setCommonGlobalVal((prevState) => {
      const updatedState = { ...prevState, [key]: value };

      // Store encoded value in localStorage
      if (key === "userType_") {
        localStorage.setItem(key, encodeValue(value));
      }

      return updatedState;
    });
  };

  // Sync context with localStorage on initial load
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType) {
      setCommonGlobalVal((prevState) => ({
        ...prevState,
        userType_: decodeValue(userType),
      }));
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        data: commonGlobalVal,
        updateCommonGlobalVal,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalCommonContextProvider;
