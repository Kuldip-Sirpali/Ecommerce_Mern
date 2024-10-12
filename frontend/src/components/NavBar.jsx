import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Search from "./pages/Search/Search";

const NavBar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const navItems = [
    {
      name: "Store",
      path: "/store",
    },
    {
      name: "Men",
      path: "/category/men",
    },
    {
      name: "Women",
      path: "/category/women",
    },
    {
      name: "Kids",
      path: "/category/kids",
    },
    {
      name: "  Electronic Devices",
      path: "/category/electrical-devices",
    },
    {
      name: "Home appliances",
      path: "/category/home-appliances",
    },
    {
      name: "Cart",
      path: "/cart",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];
  return (
    <div className="w-full bg-[#80ed99]  flex flex-col justify-center   ">
      <section className="w-full bg-white text-black text-center">
        App is currently running in beta mode
      </section>
      <div className="flex items-center justify-center py-2 px-10 gap-4  overflow-hidden">
        <NavLink className="text-white font-semibold cursor-pointer" to="/">
          eCom
        </NavLink>

        <Search />
        {navItems.map((item) => (
          <NavLink to={item?.path} className="p-2 text-black " key={item.name}>
            <span className="   hover:border-b-2 hover:border-white">
              {item?.name}
            </span>
            {item.name === "Cart" && (
              <span className="text-white  font-bold text-sm ">
                ({totalQuantity})
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
