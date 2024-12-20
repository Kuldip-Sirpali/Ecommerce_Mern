import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Search from "./pages/Search/Search";
import { RiMenu3Fill } from "react-icons/ri";

const NavBar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state to handle menu open/close

  const navItems = [
    { name: "Store", path: "/store" },
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Kids", path: "/category/kids" },
    { name: "Electronic Devices", path: "/category/electrical-devices" },
    { name: "Home Appliances", path: "/category/home-appliances" },
    { name: "Profile", path: "/profile" },
    { name: "Cart", path: "/cart" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full bg-[#80ed99] flex flex-col sticky top-0 z-40">
      {/* Beta Mode Alert */}
      <section className="w-full bg-black text-white text-center text-sm py-1">
        App is currently running in beta mode
      </section>

      {/* Navbar */}
      <div className="w-full flex items-center justify-between px-4 py-2 md:px-10  bg-[#80ed99]">
        {/* Brand */}
        <NavLink className="text-white font-semibold text-lg md:text-xl" to="/">
          eCom
        </NavLink>

        {/* Search and Nav Links - Visible in a row on larger screens */}
        <div className="hidden md:flex items-center gap-6 justify-between ">
          {/* Search Bar */}
          <div className=" max-w-sm">
            <Search small={true} />{" "}
            {/* Assuming Search can take a prop to render a smaller search bar */}
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {navItems.slice(0, 7).map((item) => (
              <NavLink
                to={item.path}
                className="text-black hover:text-white transition duration-200"
                key={item.name}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Cart with Total Quantity */}
            <NavLink to="/cart" className="text-white font-bold text-sm">
              Cart ({totalQuantity})
            </NavLink>
          </div>
        </div>

        {/* Hamburger Button - For small screens */}
        <div className="block md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {/* Hamburger icon */}

            <RiMenu3Fill size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu - Toggled by the Hamburger icon */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-[#80ed99] shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden z-50`}
      >
        <div className="flex flex-col p-4 gap-4">
          {/* Close Menu Button */}
          <button
            className="self-end text-white focus:outline-none  p-1 rounded-full"
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
            <Search className="bg-[#80ed99]" /> {/* Smaller search bar for mobile */}
          </div>

          {/* Navigation Items */}
          {navItems.slice(0, 7).map((item) => (
            <NavLink
              to={item.path}
              className="text-black rounded-md hover:bg-gray-100 p-2"
              key={item.name}
              onClick={toggleMenu} // Close the menu on click
            >
              {item.name}
            </NavLink>
          ))}

          {/* Cart with Total Quantity */}
          <NavLink
            to="/cart"
            className="text-black rounded-md  hover:bg-gray-100  text-sm p-2"
            onClick={toggleMenu}
          >
            Cart ({totalQuantity})
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
