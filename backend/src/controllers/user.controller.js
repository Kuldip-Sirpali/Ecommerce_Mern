import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

//function to send verification code
const sendVerifcationCode = async (email, fullName, verificationCode) => {
  const { data, error } = await resend.emails.send({
    from: "ecomartia <onboarding@resend.dev>",
    to: email,
    subject: "Email Verification",
    html: `<h1> Hello ${fullName}  ,here is your email verification code : ${verificationCode} </h1>`,
  });

  if (error) {
    return console.error({ error });
  }

  return {
    success: true,
    message: "Verification code send successfully",
  };
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(401, "User with this email already exists");
  }
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);
  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
    verificationCode,
    verificationCodeExpiry: expiryDate,
    isVerified: false,
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  const emailResponse = await sendVerifcationCode(
    email,
    fullName,
    verificationCode
  );
  console.log(emailResponse);
  if (!emailResponse) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Failed to send verification email"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Account created successfully"));
});
export const verifyCode = asyncHandler(async (req, res) => {
  const { verificationCode, email } = req.body;
  if (!verificationCode || !email) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Credientials are required"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(new ApiResponse(400, {}, "No user found"));
  }

  const isCodeValid = user?.verificationCode === verificationCode;
  const isCodeNotExpired = new Date(user?.verificationCodeExpiry) > new Date();
  if (!isCodeValid) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid verification code"));
  } else if (!isCodeNotExpired) {
    return res
      .status(400)
      .json(new ApiResponse(200, {}, "Verification code has expired"));
  } else {
    user.isVerified = true;
    await user.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email verified successfully"));
});

export const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const signInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!signInUser) {
    return res.status(400).json(new ApiResponse(400, {}, "User not found"));
  }
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
          user: signInUser,
        },
        "User signIn Successfully"
      )
    );
});

export const signOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
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
    .json(new ApiResponse(200, {}, "User signout successfully"));
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
        expires: new Date(Date.now() + 60 * 60 * 1000), //1hr
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      })
      .json(new ApiResponse(200, {}, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid refresh token");
  }
});
