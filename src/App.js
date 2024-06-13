import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import WithPublicRoute from "./router/PublicRouter";
import WithPrivateRoute from "./router/PrivateRouter";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => (
          WithPublicRoute(route, index)
        ))}
        {privateRoutes.map((route, index) => (
          WithPrivateRoute(route, index)
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
