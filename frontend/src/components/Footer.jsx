import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-main text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 sm:px-24">
        <div className="text-sm ">
          Made with ❤️ in Nepal
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
        <div className="text-sm text-gray-200">
          &copy; {new Date().getFullYear()} Kuldip Sirpali. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
