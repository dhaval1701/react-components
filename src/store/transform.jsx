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

// Create the transform
export const createTransform = () => ({
  in: (inboundState, key) => {
    // Encrypt the state before persisting
    return encrypt(inboundState);
  },
  out: (outboundState, key) => {
    // Decrypt the state after rehydrating
    return decrypt(outboundState);
  },
});
