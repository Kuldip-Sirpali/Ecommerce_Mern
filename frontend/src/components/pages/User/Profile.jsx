import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";

import axios from "axios";
import { getUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import curveBg from "/images/bg-curve.svg";
const Profile = () => {
  const { user } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);
  const handleSignOut = async () => {
    try {
      const response = await axios.post(`/api/v1/user/signOut`);
      console.log(response);
      dispatch(getUser(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      style={{
        background: `url(${curveBg})`,
      }}
    >
      <section className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg flex flex-col ">
        <h1 className="text-3xl md:text-4xl text-gray-800 mb-6">
          Warm welcome {user && user.fullName}
        </h1>

        <div className="w-full text-left mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Profile Details
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">Full Name:</span> {user?.fullName}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>

        <Button
          onClick={handleSignOut}
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          Sign out
        </Button>
      </section>
    </div>
  );
};

export default Profile;
