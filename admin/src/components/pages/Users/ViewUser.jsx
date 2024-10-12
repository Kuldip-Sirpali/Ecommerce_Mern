import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleDeleteUser } from "../../../API/handler";

const ViewUser = () => {
  const { users } = useSelector((state) => state.appAdmin);
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedUser = users?.filter((user) => user?._id === id);
  const updateUsersWithDelete = (userId) => {
    handleDeleteUser(userId);
    navigate("/users");
    dispatch(getRefresh());
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <div className="flex items-center space-x-4 mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Name:     {selectedUser[0]?.fullName}
          </h1>
          <h2 className="text-sm text-gray-500">Email: {selectedUser[0]?.email}</h2>

          <p className="text-sm text-gray-500">
            {" "}
            CreatedAt: {new Date(selectedUser[0]?.createdAt).toDateString()}
          </p>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => updateUsersWithDelete(selectedUser[0]?._id)}
              className="px-3 py-1.5 bg-green-400 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
