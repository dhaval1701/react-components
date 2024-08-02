import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // Use a strong secret key for encryption

// Function to encode state
const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decode state
const decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const createAuthTransform = () => ({
  in: (inboundState, key) => {
    console.log(inboundState, key, "inboundState_key");
    // Only encrypt and persist if the user is logged in
    if (inboundState.isLoggedIn) {
      return encrypt(inboundState);
    }
    // Return undefined to skip persistence when not logged in
    return undefined;
  },
  out: (outboundState, key) => {
    console.log(outboundState, key, "outboundState_key");
    // If there's no outbound state, return the initial state
    if (!outboundState) {
      return {
        isLoggedIn: false,
        userType: null,
        menus: [],
        token: null,
      };
    }
    // Decrypt outbound state after rehydration
    const decryptedState = decrypt(outboundState);
    console.log(decryptedState, "decryptedState");
    // Clear state on logout
    if (key === "credential" && !decryptedState?.isLoggedIn) {
      localStorage.removeItem("persist:auth");
      return {
        credential: {
          isLoggedIn: false,
          userType: null,
          menus: [],
          token: null,
        },
      };
    }
    return decryptedState;
  },
});
