import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/Home";
import MainLayout from "../layout/Layout";
import ExpertDetail from "../pages/ExpertsDetail";
import ContactUs from "../pages/ContactUs";
import Expert from "../pages/Expert";
import FormGetInforExpert from "../pages/FormGetInfoExpert";
import ExpertDetail from '../pages/ExpertsDetail'

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
    path: "/signup/expert",
    element: <FormGetInforExpert />,
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
  {
    path: "/expert-detail",
    element: <MainLayout main={<ExpertDetail />} />,
    exact: true,
  },
  {
    path: "/expert",
    element: <MainLayout main={<Expert />} />,
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
  {
    path: "/expert/:id",
    element: <MainLayout main={<ExpertDetail />} />,
    exact: true,
  },
  {
    path: "/expert-detail",
    element: <MainLayout main={<ExpertDetail />} />,
    exact: true,
  },
];
