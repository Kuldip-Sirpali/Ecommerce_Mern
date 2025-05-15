import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Search from "./pages/Search/Search";
import { RiMenu3Fill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { BiCart, BiCartAdd, BiCategory, BiUser } from "react-icons/bi";
import Logo from "./Logo";

const NavBar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state to handle menu open/close

  const navItems = [
    // { name: "Store", path: "/store" },
    // { name: "Men", path: "/category/men" },
    // { name: "Women", path: "/category/women" },
    // { name: "Kids", path: "/category/kids" },
    // { name: "Electronic Devices", path: "/category/electrical-devices" },
    // { name: "Home Appliances", path: "/category/home-appliances" },
    {
      name: "Category",
      path: "/category",
      icon: <BiCategory size={30} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <BiUser size={30} />,
    },
    // { name: "Cart", path: "/cart" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full flex flex-col sticky top-0 z-40 sm:px-24">
      <div className="w-full bg-white  flex items-center sm:justify-center  justify-between px-4 py-2 md:px-10 ">
        <Logo />

        {/* Search and Nav Links - Visible in a row on larger screens */}
        <div className="hidden md:flex items-center gap-6 justify-evenly flex-1">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <Search className="w-full" />
            {/* Assuming Search can take a prop to render a smaller search bar */}
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6  text-[#3D1612]">
            {navItems.slice(0, 7).map((item) => (
              <NavLink
                to={item.path}
                className=" flex   flex-col items-center justify-center  transition duration-200"
                key={item.name}
              >
                {" "}
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}

            {/* Cart with Total Quantity */}
            <NavLink
              to="/cart"
              className="relative flex flex-col items-center justify-center"
            >
              <BiCart size={30} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-2 bg-main text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
              <span>Cart</span>
            </NavLink>
          </div>
        </div>

        {/* Hamburger Button - For small screens */}
        <div className="block md:hidden ">
          <button
            className="text-main font-bold hover:bg-white p-2 rounded-full focus:outline-none"
            onClick={toggleMenu}
          >
            {/* Hamburger icon */}
            <RiMenu3Fill size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu - Toggled by the Hamburger icon */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-main shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden z-50 text-[#fff]`}
      >
        <div className="flex flex-col p-4 gap-4">
          {/* Close Menu Button */}
          <button
            className="self-end focus:outline-none hover:bg-white p-1 rounded-full"
            onClick={toggleMenu}
          >
            {/* Close icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          {/* Mobile Search Bar */}
          <div className="w-full">
            <Search className="w-full bg-main" />
            {/* Smaller search bar for mobile */}
          </div>

          {/* Navigation Items */}
          {navItems.slice(0, 7).map((item) => (
            <NavLink
              to={item.path}
              className=" flex   items-center   transition duration-200"
              key={item.name}
            >
              {" "}
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Cart with Total Quantity */}
          <NavLink to="/cart" className="relative flex items-end">
            <BiCart size={30} />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 left-16 bg-white text-main text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
            <span>Cart</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
