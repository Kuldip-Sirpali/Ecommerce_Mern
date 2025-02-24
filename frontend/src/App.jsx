import "./App.css";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Container from "./Container";
import Store from "./components/pages/Store/Store";

import Category from "./components/pages/Category/Category";
import ProductView from "./components/pages/Product/ProductView";
import Cart from "./components/pages/Cart/Cart";
import SearchPage from "./components/pages/Search/SearchPage";
import Auth from "./components/pages/User/SignIn";
import Profile from "./components/pages/User/Profile";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./utils/constants";
import SignUp from "./components/pages/User/SignUp";
import SignIn from "./components/pages/User/SignIn";
import VerifyEmail from "./components/pages/User/VerifyEmail";
import ErrorPage from "./components/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Container />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {

        path: "/verify-email",
        element: <VerifyEmail />
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <ProductView />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router}>
        <Container />
      </RouterProvider>
    </>
  );
}

export default App;
