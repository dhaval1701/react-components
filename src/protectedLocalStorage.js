import React, { useEffect, useRef } from "react";

function App() {
  useEffect(() => {
    // Backup local storage data when the component mounts
    backupLocalStorage();
  }, [location]);

  const backupLocalStorage = () => {
    const backup = {};
    for (const key of Object.keys(localStorage)) {
      backup[key] = localStorage.getItem(key);
    }
    localStorageBackupRef.current = backup; // Store backup in ref
  };

  const restoreLocalStorage = () => {
    const backup = localStorageBackupRef.current;
    for (const [key, value] of Object.entries(backup)) {
      localStorage.setItem(key, value);
    }
  };

  const handleStorageChange = (e) => {
    console.log(e, "e");

    console.log(e.url, "url");
    e.stopPropagation();
    if (e.url === window.location.href) {
      if (!e.key) {
        restoreLocalStorage();
        // window.location.href = "/login";
        // clearLocalData();
      } else {
        localStorage.setItem(e.key, e.oldValue);
      }
    }
    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      restoreLocalStorage();

      // window.location.href = "/login";
      // clearLocalData();
    }
  };

  useEffect(() => {
    const storageEventHandler = (e) => {
      handleStorageChange(e);
    };

    window.addEventListener("storage", storageEventHandler);

    return () => {
      window.removeEventListener("storage", storageEventHandler);
    };
  }, []);

  return <div>Hello</div>;
}

export default App;
