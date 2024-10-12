import { useState } from "react";
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
  return (
    <>
      <RouterProvider router={router}>
        <Container />
      </RouterProvider>
    </>
  );
}

export default App;
