import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";

import { getAdmin } from "../../../redux/adminSlice";
import { handleLogOut } from "../../../API/handler";
const Dashboard = () => {
  const { admin } = useSelector((state) => state.appAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!admin) {
      navigate("/auth");
    }
  }, []);

  const removeDataWithLogOut = async () => {
    handleLogOut();
    dispatch(getAdmin(null));
    navigate("/auth");
  };

  return (
    <>
      <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Welcome to the admin dashboard
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          {admin?.image && <Avatar src={admin?.image} size="80" round />}
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {admin?.adminName}
            </h1>
            <h2 className="text-sm text-gray-500">{admin?.adminEmail}</h2>
          </div>
          <button
            onClick={removeDataWithLogOut}
            className="m-4 px-10 py-2 font-bold rounded-full text-white bg-green-400"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
