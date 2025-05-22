import React, { useEffect } from "react";
import {
  FaAppleAlt,
  FaTshirt,
  FaLaptop,
  FaCouch,
  FaBasketballBall,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "a",
    name: "Men",
    icon: <FaAppleAlt />,
    path: "men",
  },
  {
    id: "b",
    name: "Women",
    icon: <FaTshirt />,
    path: "women",
  },
  {
    id: "c",
    name: "Kids",
    icon: <FaLaptop />,
    path: "kids",
  },
  {
    id: "d",
    name: "Home Appliances",
    icon: <FaCouch />,
    path: "home-appliances",
  },
  {
    id: "e",
    name: "Electrical Devices",
    icon: <FaBasketballBall />,
    path: "electrical-devices",
  },
];
const CategoryList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.customer);
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, []);
  return (
    <section className="py-8  h-screen sm:px-24">
      <h2 className="text-center mb-6 font-semibold text-2xl text-main">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <div
            className="bg-red-600 rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 px-20 cursor-pointer  border border-gray-100"
            style={{
              backgroundImage: `url(/images/${cat?.id}.jpg)`,
              backgroundSize: "cover",
            }}

            key={cat.name}
            onClick={() => navigate(`${cat.path}`)}
          >

            <span

              className="text-lg font-semibold text-white text-center "

            >
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
