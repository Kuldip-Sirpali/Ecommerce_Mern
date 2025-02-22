import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import axios from "axios";
import { getUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import pf from "../../../assets/pf.avif";
import { BACKEND_URL } from "../../../utils/constants";
import { getProducts } from "../../../redux/productSlice";
const Profile = () => {
  const { user } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, []);
  const handleSignOut = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signOut`);
      dispatch(getUser(null));
      dispatch(getProducts(null));
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div
    //   className="h-screen flex items-center justify-center bg-gray-50"
    //   style={{
    //     background: `url(${pf}) no-repeat center center/cover`,
    //   }}
    // >
    //   <section className="w-full max-w-md p-8  shadow-lg rounded-lg flex flex-col ">
    //     <h1 className="text-3xl text-center md:text-4xl text-gray-800 mb-6">
    //       Warm welcome to you{" "}
    //       <span className="text-[#70e000] text-5xl">
    //         {user && user.fullName} !!
    //       </span>
    //     </h1>

    //     <div className="w-full text-left mb-6">
    //       <h2 className="text-xl font-semibold text-gray-700 mb-4">
    //         Your Profile Details
    //       </h2>
    //       <p className="text-gray-600">
    //         <span className="font-semibold">Full Name:</span> {user?.fullName}
    //       </p>
    //       <p className="text-gray-600">
    //         <span className="font-semibold">Email:</span> {user?.email}
    //       </p>
    //     </div>

    //     <Button
    //       onClick={handleSignOut}
    //       className="w-full py-2 px-4 bg-[#70e000] text-white font-semibold rounded-lg
    //        hover:bg-[#38b000] transition duration-300"
    //     >
    //       Sign out
    //     </Button>
    //   </section>
    // </div>
    <div
      className="min-h-screen flex items-center justify-center bg-black relative"
      style={{
        background: `url(${pf}) no-repeat center center/cover`,
      }}
    >
      {/* Dark overlay to enhance contrast */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <section className="relative z-10 w-full max-w-md p-8 rounded-xl shadow-2xl bg-white bg-opacity-20 backdrop-blur-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Welcome,{" "}
          <span className="text-[#70e000]">{user && user.fullName}</span>!
        </h1>

        <div className="mb-6 bg-white bg-opacity-40 p-4 rounded-md shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Details
          </h2>
          <p className="text-gray-800">
            <span className="font-semibold">Full Name:</span> {user?.fullName}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full py-2 px-4 bg-gradient-to-r from-[#70e000] to-[#38b000] text-white font-semibold rounded-lg hover:opacity-90 transition duration-300"
        >
          Sign out
        </button>
      </section>
    </div>
  );
};

export default Profile;
