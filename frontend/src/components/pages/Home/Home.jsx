import React from "react";
import Slideshow from "./SlideShow";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="w-full  md:p-1 flex justify-center">
        <Slideshow />
      </section>
      <section>
        <div className=" container mx-auto px-4 py-8  ">
          <h1 className="md:text-8xl text-5xl font-bold text-center">
            Get upto <span className="text-white bg-green-700">50%</span>{" "}
            discount in this festival season
          </h1>
          <div className="w-full text-center  p-3">
            <button
              onClick={() => navigate("/store")}
              className="bg-green-400  text-white px-8 py-2 rounded-md hover:bg-green-600"
            >
              Visit store
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
