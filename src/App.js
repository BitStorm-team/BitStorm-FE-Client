import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./utils/routes";
import withPublicRoute from "./router/PublicRouter";
import withPrivateRoute from "./router/PrivateRouter";
import NotFound from "./pages/NotFound.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) =>
          withPublicRoute({ ...route }, index, { key: `public_${index}` })
        )}
        {privateRoutes.map((route, index) =>
          withPrivateRoute({ ...route }, index, { key: `private_${index}` })
        )}
        <Route path="/*" element={<NotFound />} key="not_found" />
      </Routes>
    </BrowserRouter>
  );
}
