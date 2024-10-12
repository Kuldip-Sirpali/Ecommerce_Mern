import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
const Container = () => {
  return (
    <>
      <section className="min-h-screen flex flex-col md:flex-row">
        <SideBar />
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Container;
