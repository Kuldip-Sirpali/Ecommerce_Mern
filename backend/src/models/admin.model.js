import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      unique: true,
      required: true,
    },
    adminEmail: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
//hooks
adminSchema.pre("save", async function (next) {
  if (!this.isModified("adminPassword")) return next();
  // hashing password before saved in database
  this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
  next();
});

//----------custom methods-------------
// ***** validate password
adminSchema.methods.isPasswordCorrect = async function (adminPassword) {
  return await bcrypt.compare(adminPassword, this.adminPassword);
};

//*****/ generate accesss and refresh tokens

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      emai: this.adminEmail,
      fullName: this.adminName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
