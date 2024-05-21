import axios from "axios";
import { ENDPOINT } from "../config";

const getToken = () => localStorage.getItem("token");
const redirectToLogin = () => {
  localStorage.clear(); // Clear all items from local storage
  window.location.assign("/login"); // Redirect to login page
};

// Common function for making API calls
export const MakeApiCall = async (
  url,
  method = "get",
  data = null,
  withBearer = false
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (withBearer) {
      // Assuming you have a way to retrieve the authentication token
      if (getToken()) {
        headers["Authorization"] = `Bearer ${getToken()}`;
      }
    }
    let url_ = ENDPOINT + url;
    const response = await axios({
      method,
      url: url_,
      data: data ? JSON.stringify(data) : null,
      headers,
    });

    return response.data;
  } catch (error) {
    // Check if error status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      redirectToLogin();
    }

    // Handle other errors here (e.g., log them or throw a custom error)
    throw { message: error?.message };
  }
};
