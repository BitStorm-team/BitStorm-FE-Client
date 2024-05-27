import axios from "axios"; // Ensure axios is imported
import { useState, useEffect } from "react"; // Import useState and useEffect hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate hook if you're using React Router
import { API_URL, API_URL_BACKUP } from "../utils/helpers";

const fetchCsrfToken = async (setData) => {
  const fetchToken = async (url) => {
    const response = await axios.get(`${url}/csrf-token`, { withCredentials: true });
    return response.data.csrf_token;
  };

  try {
    setData(await fetchToken(API_URL));
  } catch (error) {
    console.error("Error fetching CSRF token from primary URL:", error);
    try {
      setData(await fetchToken(API_URL_BACKUP));
    } catch (fallbackError) {
      console.error("Error fetching CSRF token from fallback URL:", fallbackError);
      // Handle the error appropriately, e.g., set a default value, show an error message, etc.
      setData(null); // or any other default value or error state
    }
  }
};

export default fetchCsrfToken;
