import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
const slides = [
  {
    id: 1,
    image: "/images/01.jpg",
    title: "Summer Collection",
    description: "Discover the latest trends in our summer collection.",
    link: "/shop/summer",
  },
  {
    id: 2,
    image: "/images/02.jpg",
    title: "Exclusive Deals",
    description: "Save big on exclusive deals for a limited time.",
    link: "/shop/deals",
  },
  {
    id: 3,
    image: "/images/03.jpg",
    title: "New Arrivals",
    description: "Check out the newest products in our store.",
    link: "/shop/new",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goToSlide = (index) => setCurrent(index);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl ">
      {slides.map((slide, idx) => (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          key={slide.id}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="w-full h-full bg-black/40 flex flex-col justify-center items-start px-8 md:px-16">
              {idx === current && (
                <div className="max-w-lg text-white animate-fade-in">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="mb-6 text-lg md:text-xl font-medium drop-shadow">
                    {slide.description}
                  </p>
                  <NavLink
                    to={"category"}

                    className="inline-block bg-white text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-black hover:text-white transition"
                  >
                    Discover Categories
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {/* Arrows */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full  h-8 w-8 shadow transition z-20"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <span className="text-2xl">&#10094;</span>
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full  h-8 w-8 shadow transition z-20"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <span className="text-2xl">&#10095;</span>
      </button>
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${idx === current ? "bg-white scale-125 shadow" : "bg-white/50"
              }`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
