import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/constants";
import RTE from "./RTE";
import { useForm } from "react-hook-form";
const Upload = () => {
  const { admin } = useSelector((state) => state.appAdmin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/auth");
    }
  }, []);
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductDetails((prevDetails) => ({ ...prevDetails, image: file }));
  };

  // const handleCreateProduct = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("title", productDetails.title);
  //   formData.append("description", productDetails.description);
  //   formData.append("price", Number(productDetails.price));
  //   formData.append("category", productDetails.category);
  //   formData.append("tags", productDetails.tags);
  //   formData.append("image", productDetails.image);
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const response = await axios.post(
  //       `${BACKEND_URL}/api/v1/store/create-product`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );


  //     setProductDetails({
  //       title: "",
  //       description: "",
  //       price: "",
  //       category: "",
  //       tags: "",
  //       image: "",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleCreateProduct = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.content);
    formData.append("price", Number(data?.price));
    formData.append("category", data?.category);
    formData.append("tags", data?.tags);
    formData.append("image", data.image[0]);
    console.log(formData);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/store/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      setProductDetails({
        title: "",
        description: "",
        price: "",
        category: "",
        tags: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        content: productDetails?.description || "",
        title: productDetails?.title || "",
        price: productDetails?.price || "",
        category: productDetails?.category || "",
        tags: productDetails?.tags || "",
        image: productDetails?.image || "",
      },
    });


  return (
    <form
      onSubmit={handleSubmit(handleCreateProduct)}
      className="max-w-4xl mx-auto p-8 rounded-lg g space-y-4"
    >
      <h2 className="text-2xl font-bold text-green-400 text-center mb-6">
        Create an impactful product
      </h2>

      <div className="flex flex-wrap -mx-2 space-y-4 lg:space-y-0">
        {/* Title Input */}
        <div className="w-full lg:w-1/2 px-2">
          <label htmlFor="title" className="block text-green-500 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-white text-black focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Price Input */}
        <div className="w-full lg:w-1/2 px-2">
          <label htmlFor="price" className="block text-green-500 mb-2">
            Price
          </label>
          <input
            type="text"
            id="price"
            {...register("price", { required: true })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-white text-black focus:outline-none focus:border-blue-500"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Description Input (RTE) */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

        {/* Category */}
        <div className="w-full lg:w-1/2 px-2">
          <label htmlFor="category" className="block text-green-500 mb-2">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-white text-black focus:outline-none focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="electrical-devices">Electrical Devices</option>
            <option value="home-appliances">Home Appliances</option>
          </select>
        </div>

        {/* Tags */}
        <div className="w-full lg:w-1/2 px-2">
          <label htmlFor="tags" className="block text-green-500 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            {...register("tags", { required: true })}
            className="w-full p-3 border border-gray-600 rounded-lg bg-white text-black focus:outline-none focus:border-blue-500"
            placeholder="Enter product tags"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="w-full lg:w-1/2 px-2">
          <label htmlFor="image" className="block text-green-500 mb-2">
            Upload image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={handleImageChange}

            className="w-full p-3 bg-white text-black rounded-lg cursor-pointer focus:outline-none"
            required
          />
          {/* {productDetails?.image && (
            <img
              src={
                typeof productDetails.image === "string"
                  ? productDetails.image
                  : URL.createObjectURL(productDetails.image)
              }
              alt="Poster Preview"
              className="mt-4 max-w-full h-auto rounded-lg shadow-lg"
            />
          )} */}
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-green-400 text-white font-bold py-3 rounded-lg "
      >
        Create new Product
      </button>
    </form>
  );
};

export default Upload;
