import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Container from "./Container";
import Store from "./components/pages/Store/Store";

import Category from "./components/pages/Category/Category";
import ProductView from "./components/pages/Product/ProductView";
import Cart from "./components/pages/Cart/Cart";
import SearchPage from "./components/pages/Search/SearchPage";
import Auth from "./components/pages/User/Auth";
import Profile from "./components/pages/User/Profile";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./utils/constants";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
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
        path: "/search/:query",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/refresh-token`
        );
      } catch (error) {
        console.log("Please sign in again to continue");
      }
    };
    // Refresh token every 1hr
    const intervalId = setInterval(
      refreshToken,
      import.meta.env.VITE_ACCESS_TOKEN_EXPIRY
    );

    // Initial refresh
    refreshToken();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <RouterProvider router={router}>
        <Container />
      </RouterProvider>
    </>
  );
}

export default App;
