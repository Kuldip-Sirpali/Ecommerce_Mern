import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProducts, getRefresh } from "../../../redux/adminSlice";
import { handleDeleteProduct } from "../../../API/handler";
const Products = () => {
  const { admin, products, refresh } = useSelector((state) => state.appAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState(null);
  useEffect(() => {
    if (!admin) {
      navigate("/auth");
    }
  }, []);

  const updateproductsWithDelete = (productId, imageUrl) => {
    handleDeleteProduct(productId, imageUrl);
    navigate("/products");
    dispatch(getRefresh());
  };
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`/api/v1/admin/get-all-products`);
        console.log(response);
        dispatch(getProducts(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, [refresh]);
  const menProducts = products?.filter((product) => product.category === "men");
  const womenProducts = products?.filter(
    (product) => product.category === "women"
  );
  const kidsProducts = products?.filter(
    (product) => product.category === "kids"
  );
  const homeApplianceProducts = products?.filter(
    (product) => product.category === "home-appliances"
  );
  const electricalDevicesProducts = products?.filter(
    (product) => product.category === "electrical-devices"
  );
  let productsArray = [];
  if (filterValue === "men") {
    productsArray = menProducts;
  } else if (filterValue === "women") {
    productsArray = womenProducts;
  } else if (filterValue === "kids") {
    productsArray = kidsProducts;
  } else if (filterValue === "home-appliances") {
    productsArray = homeApplianceProducts;
  } else if (filterValue === "electrical-devices") {
    productsArray = electricalDevicesProducts;
  } else {
    productsArray = products;
  }
  return (
    <section>
      <div className="container mx-auto p-4">
        <select
          name="filter"
          className="my-3 p-2"
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="All">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="home-appliances">Home-Appliances</option>
          <option value="electrical-devices">Electrical-Devices</option>
        </select>
        <h1 className="text-green-400 p-2">
          Total Products:{productsArray?.length}
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
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
              {productsArray ? (
                productsArray?.map((product) => (
                  <tr key={product._id}>
                    <td
                      onClick={() => navigate(`/product/${product?._id}`)}
                      className="px-4 py-4 whitespace-wrap  cursor-pointer  text-sm font-medium text-gray-900"
                    >
                      {product.title}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs. {product.price}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product?.category}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(product.createdAt).toDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          updateproductsWithDelete(product?._id, product?.image)
                        }
                        className="text-green-400 hover:text-green-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="p-3">
                  <td colSpan="5" className="px-4 py-4 text-center">
                    No products were found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Products;
