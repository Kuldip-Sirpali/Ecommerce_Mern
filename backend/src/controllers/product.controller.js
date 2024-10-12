import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUploader.js";
//creation of product is only for admin
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, tags } = req.body;

  const imageLocalFilePath = req.file;
  if (
    !title ||
    !description ||
    !price ||
    !category ||
    !tags ||
    !imageLocalFilePath
  ) {
    throw new ApiError(401, "All fields are required");
  }
  const image = await uploadOnCloudinary(imageLocalFilePath.path);
  if (!image) {
    throw new ApiError("Image file in missing");
  }

  const product = await Product.create({
    title,
    description,
    price,
    category,
    tags: tags.split(","),
    image: image?.secure_url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit); // Total pages available
  // if (page > totalPages) {
  //   throw new ApiError(400, "Page number exceeds total available pages");
  // }
  if (totalProducts == 0) {
    throw new ApiError(500, "No products were found");
  }
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: 1 });
  if (!products) {
    throw new ApiError(500, "Error while fetching products");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Fetched products"));
});

export const getProduct = asyncHandler(async (req, res) => {
  const productId = req.query.id;
  if (!productId) {
    throw new ApiError(400, "Product id was not found");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(501, "Unexpected error occured while fetching product");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

export const getCategorizedProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit); // Total pages available
  if (totalProducts == 0) {
    throw new ApiError(500, "No products were found");
  }

  if (!category) {
    throw new ApiError(400, "No category selected");
  }

  const products = await Product.find({ category: { $in: category } })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  if (!products) {
    throw new ApiError(
      500,
      `No products found with the category : ${category}`
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products,
        `${category} products fetched successfully`
      )
    );
});

export const searchProduct = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    throw new ApiError(400, "No query available");
  }
  const products = await Product.find({
    $or: [
      { title: { $regex: query, $options: "i" } }, // Case-insensitive search
      { description: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
    ],
  });

  if (!products) {
    throw new ApiError(500, "No result found");
  }

  return res.status(200).json(new ApiResponse(200, products, "Query resolved"));
});
