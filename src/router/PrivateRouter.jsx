import { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

const WithPrivateRoute = (props, index) => {
  const [accessToken, setAccessToken] = useState("");
  const accessLocalStorage = localStorage.getItem("__token__");

  useEffect(() => {
    setAccessToken(accessLocalStorage);
  }, [accessLocalStorage]);

  if (accessToken) {
    return <Route key={index} {...props} />;
  }

};

export default WithPrivateRoute;
