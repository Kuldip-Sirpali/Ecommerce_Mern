import React from "react";

const Footer = () => {
  return (
    <section className="w-full bg-[#38b000] text-white h-10 flex items-center justify-center ">
      <p>
        {" "}
        &copy; {new Date().getFullYear()} Kuldip Sirpali. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
