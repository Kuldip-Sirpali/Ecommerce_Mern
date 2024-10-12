import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleDeleteProduct } from "../../../API/handler";
import { getRefresh } from "../../../redux/adminSlice";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.appAdmin);
  const updateproductsWithDelete = (productId, imageUrl) => {
    handleDeleteProduct(productId, imageUrl);
    navigate("/products");
    dispatch(getRefresh());
  };
  const selectedProduct = products.filter((product) => product?._id === id);
  return (
    <div className="p-4 bg-white shadow-sm rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        {selectedProduct[0]?.title}
      </h1>
      <h2 className="text-md text-gray-600 mb-2">
        {selectedProduct[0]?.description}
      </h2>
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Price: Rs.{selectedProduct[0]?.price}
      </h3>
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Category: {selectedProduct[0]?.category}
      </h3>

      {selectedProduct[0]?.image && (
        <img
          src={selectedProduct[0].image}
          alt={selectedProduct[0]?.title}
          className="w-72 h-72 object-cover mb-2 rounded-md shadow-sm border-2 border-green-400"
        />
      )}

      <span className="block text-xl text-gray-500 mb-2">
        CreatedAt:{" "}
        {new Date(selectedProduct[0]?.createdAt).toDateString()}
      </span>
      <span className="block text-xl text-gray-500 mb-2">
        UpdatedAt:{" "}
        {new Date(selectedProduct[0]?.updatedAt).toDateString()}
      </span>
      <div className="flex justify-end">
        <button
          onClick={() => {
            updateproductsWithDelete(
              selectedProduct[0]?._id,
              selectedProduct[0]?.image
            );
          }}
          className="px-3 py-1.5 bg-green-400 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
