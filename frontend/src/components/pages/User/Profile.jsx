import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import pf from "/images/PF.avif";
import { BACKEND_URL } from "../../../utils/constants";
import { getProducts } from "../../../redux/productSlice";
import toast from "react-hot-toast";
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
      await axios.post(`${BACKEND_URL}/api/v1/user/signOut?id=${user?._id}`);
      dispatch(getUser(null));
      dispatch(getProducts(null));
      navigate("/sign-in");
      toast.success("Sign out successfully", {
        style: {
          background: "#f0f0f0",
          color: "#000",
          fontSize: "16px",
          fontWeight: "500",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          transition: "all 0.3s ease",
        },
        iconTheme: {
          primary: "#4caf50",
          secondary: "#fff",
        },
      });
    } catch (error) {
      toast.error("Error signing out", {
        style: {
          background: "#650102",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "500",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          transition: "all 0.3s ease",
        },
        iconTheme: {
          primary: "#4caf50",
          secondary: "#fff",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center md:items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-main mb-4">
            <img
              src={user?.picture ? user?.picture : pf}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user?.fullName}</h2>
          <span className="text-sm text-gray-500 mb-6">{user?.email}</span>
          <nav className="w-full flex flex-col gap-2">
            <button className="text-left px-4 py-2 rounded-lg hover:bg-green-50 font-medium text-maintransition">
              My Orders
            </button>
            <button className="text-left px-4 py-2 rounded-lg hover:bg-green-50 font-medium text-main transition">
              Wishlist
            </button>
            <button className="text-left px-4 py-2 rounded-lg hover:bg-green-50 font-medium text-main transition">
              Account Settings
            </button>
          </nav>
          <button
            onClick={handleSignOut}
            className="mt-8 w-full py-2 bg-main text-white font-semibold rounded-lg shadow hover:bg-Hmain transition"
          >
            Sign Out
          </button>
        </aside>
        {/* Main Content */}
        <main className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-main mb-6">
            Welcome, {user?.fullName?.split(" ")[0]}!
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-2xl font-bold text-main mb-2">0</span>
              <span className="text-gray-600">Orders Placed</span>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-2xl font-bold text-main mb-2">0</span>
              <span className="text-gray-600">Wishlist Items</span>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Account Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-gray-500 text-sm">Full Name</span>
                <span className="block text-gray-800 font-medium">
                  {user?.fullName}
                </span>
              </div>
              <div>
                <span className="block text-gray-500 text-sm">Email</span>
                <span className="block text-gray-800 font-medium">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
