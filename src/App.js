import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/Layout";

import { privateRoutes, publicRoutes } from "./utils/routes";
import withPublicRoute from "./router/PublicRouter";
import withPrivateRoute from "./router/PrivateRouter";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) =>
          withPublicRoute({ ...route }, index)
        )}
        {privateRoutes.map((route, index) =>
          withPrivateRoute({ ...route }, index)
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
