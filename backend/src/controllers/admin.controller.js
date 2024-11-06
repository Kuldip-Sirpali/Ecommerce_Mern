import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadOnCloudinary } from "../utils/cloudinaryUploader.js";

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();
    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export const registerAdmin = asyncHandler(async (req, res) => {
  const { adminName, adminEmail, adminPassword } = req.body;
  const imageLocalFilePath = req.file;

  if (!adminName || !adminEmail || !adminPassword || !imageLocalFilePath) {
    throw new ApiError(400, "All fields are required");
  }

  const image = await uploadOnCloudinary(imageLocalFilePath.path);
  if (!image) {
    throw new ApiError("Image file in missing");
  }

  const existedAdmin = await Admin.findOne({ adminEmail });
  if (existedAdmin) {
    throw new ApiError(401, "Admin with this email already exists");
  }
  const admin = await Admin.create({
    adminName,
    adminEmail: adminEmail.toLowerCase(),
    adminPassword,
    image: image?.secure_url,
  });
  const createdAdmin = await Admin.findById(admin?._id).select(
    "-adminPassword -refreshToken"
  );
  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the admin");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, "Admin  created successfully"));
});

export const logInAdmin = asyncHandler(async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  if (!adminEmail || !adminPassword) {
    throw new ApiError(400, "All fields are required");
  }

  const admin = await Admin.findOne({ adminEmail });
  if (!admin) {
    throw new ApiError(400, "Admin does not exist");
  }
  const isPasswordValid = await admin.isPasswordCorrect(adminPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
  );
  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-adminPassword -refreshToken"
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    })
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin loggedIn Successfully"
      )
    );
});

export const logOutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json(new ApiResponse(200, {}, "Admin logged out successfully"));
});
export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(400, "Unauthorized request");
    }
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(400, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(400, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user?._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 60 * 60 * 1000),//1hr
    
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      })
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid refresh token");
  }
});
export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find();
  if (!allUsers) {
    throw new ApiError(500, "No users found ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allUsers, "All users fetched successfully"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find();
  if (!allProducts) {
    throw new ApiError(500, "No products found ");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, allProducts, "All products fetched successfully")
    );
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId, imageUrl } = req.query;
  if (!productId || !imageUrl) {
    throw new ApiError(400, "Invalid credientials");
  }
  const image_public_id = imageUrl.split("/").pop().split(".")[0];

  await Product.findByIdAndDelete(productId);
  await cloudinary.uploader.destroy(
    image_public_id,
    {
      resource_type: "image",
    },
    (error, result) => {
      if (error) {
        console.error("Error deleting image:", error);
      } else {
        console.log("Delete result:", result);
      }
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Admin deleted a product successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    throw new ApiError(400, "Invalid credientials");
  }
  await User.findByIdAndDelete(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Admin deleted a user successfully"));
});
