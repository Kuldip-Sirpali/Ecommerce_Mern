import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { BACKEND_URL } from "../../../utils/constants.js"
import api from "../../../api/apiConfig.js";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleResponse = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await api.get(
          `/user/google?code=${authResult?.code}`
        );
        if (result.status === 200) {
          dispatch(getUser(result?.data?.data));
          navigate("/profile");
          toast.success("Login successfully", {
            style: {
              background: "#f0f0f0",
              color: "#000",
              fontSize: "16px",
              fontWeight: "500",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ccc",
              transition: "all 0.3s ease",
            },
            iconTheme: {
              primary: "#4caf50",
              secondary: "#fff",
            },
          });
        }
      }
    } catch (error) {
      toast.error("Login failed", {
        style: {
          background: "#650102",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "500",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          transition: "all 0.3s ease",
        },
        iconTheme: {
          primary: "#4caf50",
          secondary: "#fff",
        },
      });
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "popup",
  });

  return (
    <main className="flex items-center justify-center h-screen">
      <section className="bg-white border-main  border rounded-md p-10 w-full max-w-sm flex flex-col items-center gap-6">
        {/* <Logo /> */}
        <FaShoppingCart className="text-5xl text-main mb-2" />

        <header className="w-full text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-500 text-base">
            Sign in to access your personalized shopping experience.
          </p>
        </header>
        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-main text-white font-semibold rounded-xl hover:bg-Hmain transition-colors duration-200 shadow focus:outline-none focus:ring-2 focus:ring-main/5"
        >
          <img
            src="https://res.cloudinary.com/djlajb0wj/image/upload/v1747304786/google_fgwhsn.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Sign in with Google
        </button>
        <footer className="w-full mt-6 text-xs text-gray-400 text-center">
          By continuing, you agree to our&nbsp;
          <a href="/terms" className="underline hover:text-blue-600 transition-colors">
            Terms of Service
          </a>
          &nbsp;and&nbsp;
          <a href="/privacy" className="underline hover:text-blue-600 transition-colors">
            Privacy Policy
          </a>
          .
        </footer>
      </section>
    </main>
  );
};

export default OAuth;
