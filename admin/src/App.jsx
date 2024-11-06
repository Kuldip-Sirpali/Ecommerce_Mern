import "./App.css";
import Upload from "./components/pages/Upload/Upload";
import Container from "./Container";
("react-router-dom");
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/pages/DashBoard/DashBoard";
import Users from "./components/pages/Users/Users";
import Products from "./components/pages/Products/Products";
import Auth from "./components/pages/Auth/Auth";
import ViewProduct from "./components/pages/Products/ViewProduct";
import ViewUser from "./components/pages/Users/ViewUser";
import { useEffect } from "react";
import { BACKEND_URL } from "./utils/constants";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/user/:id",
        element: <ViewUser />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ViewProduct />,
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
          `${BACKEND_URL}/api/v1/admin/refresh-token`
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
