import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/Home";
import MainLayout from "../layout/Layout";

export const publicRoutes = [
  {
    path: "/signin",
    element: <SignIn />,
    exact: true,
  },
  {
    path: "/signup",
    element: <SignUp />,
    exact: true,
  },
];

export const privateRoutes = [
  {
    path: "/",
    element: <MainLayout main={<HomePage />} />,
    exact: true,
  },
  {
    path: "/home",
    element: <MainLayout main={<HomePage />} />,
    exact: true,
  },
  {
    path: "/contact",
    element: <MainLayout main={<Contact />} />,
    exact: true,
  },
];
