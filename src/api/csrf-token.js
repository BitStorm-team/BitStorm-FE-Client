import axios from 'axios'; // Ensure axios is imported
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook if you're using React Router

const fetchCsrfToken = async (setData) => {
  try {
    const response = await axios.get(
      "https://bitstormbe.zeabur.app/api/csrf-token",
      {
        withCredentials: true,
      }
    );
    setData(response.data.csrf_token); // Set the CSRF token using setData function
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    // Handle error here, maybe set a default value or show an error message
  }
};
export default fetchCsrfToken;
