import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { BiLoader } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import Button from "../../Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../utils/constants";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", userDetails?.email);
    formData.append("password", userDetails?.password);
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signIn`,
        {
          email: userDetails?.email,
          password: userDetails?.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        dispatch(getUser(response?.data?.data?.user));
        localStorage.removeItem("tempData");
      }
      navigate(`/`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen    flex-1 flex-col  px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full   sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#70e000]">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto     sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-2 "
          onSubmit={handleSubmit}
        >
          <div>
            {" "}
            <div>
              <div className="mt-2">
                <div className=" flex items-center   text-black px-4 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white sm:text-sm sm:leading-6">
                  <div className="px-2">
                    <MdOutlineMail />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className="w-full outline-none px-3  bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mt-2">
                <div className=" flex items-center  text-black   px-4 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6">
                  <div onClick={handleShowPassword} className="px-2">
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={userDetails.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    className="w-full outline-none px-3  bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#70e000] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#38b000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600  border-[0.4px] border-white"
              >
                {loading ? <BiLoader /> : "Sign In"}
              </Button>
            </div>

          </div>
        </form>

        <div className="mt-3 w-full  text-sm text-black">
          <span>Don't have an accout ? </span>

          <span
            onClick={() => navigate("/sign-up")}
            className="cursor-pointer underline"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
