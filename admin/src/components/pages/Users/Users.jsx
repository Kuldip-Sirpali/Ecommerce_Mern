import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getRefresh, getUsers } from "../../../redux/adminSlice";
import { handleDeleteUser } from "../../../API/handler";
const Users = () => {
  const { admin, users, refresh } = useSelector((state) => state.appAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!admin) {
      navigate("/auth");
    }
  }, []);
  const updateUsersWithDelete = (userId) => {
    handleDeleteUser(userId);
    dispatch(getRefresh());
  };
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`/api/v1/admin/get-all-users`);
        dispatch(getUsers(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, [refresh]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="p-2">Users Details</h1>
      <h1 className="text-green-400 p-2">
        Total users:{users?.length}
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                FullName
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users && users.length > 0 ? (
              users?.map((user) => (
                <tr key={user._id}>
                  <td
                    onClick={() => navigate(`/user/${user?._id}`)}
                    className="px-4 py-4  cursor-pointer  whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {user.fullName}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user?.createdAt).toDateString()}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => updateUsersWithDelete(user?._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="p-3">
                <td colSpan="5" className="px-4 py-4 text-center">
                  No users were found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
