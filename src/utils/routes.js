import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/Home";
import MainLayout from "../layout/Layout";
import ContactUs from "../pages/ContactUs";

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
    path: "/contactUs",
    element: <MainLayout main={<ContactUs />} />,
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
    path: "/contactUs",
    element: <MainLayout main={<ContactUs />} />,
    exact: true,
  },
];
