import React from "react";
import Slideshow from "./SlideShow";
import { useNavigate } from "react-router-dom";
import Button from "../../Button"
import { FaArrowAltCircleRight } from "react-icons/fa"
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <section className="w-full  md:p-1 flex justify-center">
        <Slideshow />
      </section>
      <section>
        <div className=" container mx-auto px-4 py-8  ">
          <h1 className="md:text-8xl text-5xl font-bold text-center">
            Get upto <span className="">50%</span>{" "}
            discount in this festival season
          </h1>
          <div className="w-full text-center  p-3">
            <button
              onClick={() => navigate("/store")}
              className="bg-[#70e000]  text-white px-20 py-2 text-xl rounded-full hover:bg-[#38b000]"
            >
              Visit store
            </button>
          </div>
        </div>
      </section> */}

      {/* <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >
        <div className="w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 px-6 sm:px-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-center">
            Big Discounts, Big Dreams!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white mb-8 px-6 max-w-3xl text-center">
            Enjoy up to{" "}
            <span className="text-[#70e000] font-bold">50% off</span> on our
            exclusive collection. Shop now and experience luxury like never
            before.
          </p>
          <button
            onClick={() => navigate("/store")}
            className="bg-[#70e000] text-white px-8 py-2 text-lg rounded-full hover:bg-[#38b000] transition duration-300"
          >
            Start Shopping Now
          </button>
        </div>
      </section>

      <section className="w-full bg-white py-20 px-6 sm:px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mb-6 sm:mb-10">
            Featured Collections
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12">
            Discover the latest and most sought-after items. We’ve curated the
            best for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            <div
              className="relative w-full h-64 sm:h-72 md:h-80 bg-cover bg-center rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
              style={{
                backgroundImage: "url('/path-to-category-image-1.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-lg sm:text-xl md:text-2xl font-semibold">
                Electronics
              </div>
            </div>
            <div
              className="relative w-full h-64 sm:h-72 md:h-80 bg-cover bg-center rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
              style={{
                backgroundImage: "url('/path-to-category-image-2.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-lg sm:text-xl md:text-2xl font-semibold">
                Fashion
              </div>
            </div>
            <div
              className="relative w-full h-64 sm:h-72 md:h-80 bg-cover bg-center rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
              style={{
                backgroundImage: "url('/path-to-category-image-3.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-lg sm:text-xl md:text-2xl font-semibold">
                Home & Living
              </div>
            </div>
          </div>
        </div>
      </section> */}


      <section className="relative bg-black w-full h-screen bg-cover bg-center " style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D')" }}>
        <div className="w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 px-6 sm:px-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 text-center animate__animated animate__fadeIn animate__delay-1s">
            Unleash Your Style. Unleash Your Potential!
          </h1>
          <p className="text-lg sm:text-xl text-white mb-12 px-6 max-w-3xl text-center animate__animated animate__fadeIn animate__delay-2s">
            Discover a world of endless possibilities with exclusive offers. It's your time to shine—join the movement!
          </p>
          <Button
            onClick={() => navigate("/store")}
            className=" flex items-center bg-[#70e000] text-white px-16 py-2 text-lg rounded-full hover:bg-[#38b000] transition duration-300 animate__animated animate__fadeIn animate__delay-3s"
          >
            Explore Now  <FaArrowAltCircleRight />
          </Button>
        </div>
      </section>

      <section className="w-full bg-[#f1f5f8] py-20">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800 mb-10 animate__animated animate__fadeIn">
            🌟 Explore Our World of Innovation! 🌟
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 animate__animated animate__fadeIn animate__delay-1s">
            From premium electronics to exclusive fashion collections—our world is full of amazing discoveries waiting for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="relative group overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
              onClick={() => navigate("/category/electrical-devices")}
            >
              <img src="https://images.unsplash.com/photo-1675455137349-399d41cfcd72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbW1lcmNlJTIwZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D" alt="Category 1" className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Electronics
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
              onClick={() => navigate("/category/women")}
            >
              <img src="https://images.unsplash.com/photo-1605086998852-18371cfd9b2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D" alt="Category 2" className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Fashion
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500 cursor-pointer" onClick={() => navigate("/category/home-appliances")}>
              <img src="https://plus.unsplash.com/premium_photo-1664910692976-a5abab971d64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWNvbW1lcmNlJTIwaG9tZSUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D" alt="Category 3" className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Home & Living
              </div>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-lg sm:text-xl text-gray-700 mb-8 animate__animated animate__fadeIn animate__delay-2s">
              🎉 **Feel the thrill!** Every category is a new world waiting for you to discover. Hover over each card to explore more!
            </p>
            <Button
              onClick={() => navigate("/store")}
              className="  bg-[#70e000] text-white px-16 py-2 text-lg rounded-full hover:bg-[#38b000] transition duration-300 animate__animated animate__fadeIn animate__delay-3s"
            >
              Explore Store →_→
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
