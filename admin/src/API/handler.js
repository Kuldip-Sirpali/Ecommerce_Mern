import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
export const handleLogOut = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${BACKEND_URL}/api/v1/admin/logOut`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteProduct = async (productId, imageUrl) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `${BACKEND_URL}/api/v1/admin/delete-product?productId=${productId}&imageUrl=${imageUrl}`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const handleDeleteUser = async (userId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `${BACKEND_URL}/api/v1/admin/delete-user?userId=${userId}`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
