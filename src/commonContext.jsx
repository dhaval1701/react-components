import React, { useState, createContext } from "react";

// export const GlobalSpinnerContext = createContext();
export const GlobalContext = createContext();
const GlobalCommonContextProvider = (props) => {
  const [commonGlobalVal, setCommonGlobalVal] = useState({
    window_: window,
    userType_: localStorage.getItem("userType")
      ? JSON.parse(localStorage.getItem("userType"))
      : {},
  });

  return (
    <GlobalContext.Provider
      value={{
        data: commonGlobalVal,
        updateCommonGlobalVal: (key, value) => {
          setCommonGlobalVal({ ...commonGlobalVal, [key]: value });
        },
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalCommonContextProvider;
