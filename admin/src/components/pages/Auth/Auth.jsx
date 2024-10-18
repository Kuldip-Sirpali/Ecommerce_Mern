import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { SiNamebase } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import Avatar from "react-avatar";
import avatar from "/avatar.jpg";
import { useNavigate } from "react-router-dom";
import { getAdmin, getToken } from "../../../redux/adminSlice";
import { BACKEND_URL } from "../../../utils/constants";
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleIsAdminLoggedIn = () => {
    setIsAdminLoggedIn(!isAdminLoggedIn);
  };

  const [adminDetails, setAdminDetails] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    image: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      image: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("adminName", adminDetails.adminName);
    formData.append("adminEmail", adminDetails.adminEmail);
    formData.append("adminPassword", adminDetails.adminPassword);
    formData.append("image", adminDetails.image);

    if (isAdminLoggedIn) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/admin/logIn`,
          {
            adminEmail: adminDetails.adminEmail,
            adminPassword: adminDetails.adminPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(getAdmin(response?.data?.data?.admin));
        dispatch(getToken(response?.accessToken));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${BACKEND_URL}/api/v1/admin/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsAdminLoggedIn(!isAdminLoggedIn);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* logo  */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-4xl flex text-green-400  justify-center"
        >
          eCom
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-400">
          {isAdminLoggedIn ? "Log in as Admin" : "Sign up as Admin"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto  sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-2 "
          onSubmit={handleSubmit}
        >
          {isAdminLoggedIn && (
            <>
              {
                <div>
                  {" "}
                  <div>
                    <div className="mt-2">
                      <label htmlFor="email ">Email</label>
                      <div className=" flex items-center   text-black px-4 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white sm:text-sm sm:leading-6">
                        <div className="px-2">
                          <MdOutlineMail />
                        </div>
                        <input
                          id="email"
                          name="adminEmail"
                          type="email"
                          placeholder="Email Address"
                          value={adminDetails.adminEmail}
                          onChange={handleInputChange}
                          required
                          autoComplete="adminEmail"
                          className="w-full outline-none px-3  bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <label htmlFor="password">Password</label>
                      <div className=" flex items-center  text-black   px-4 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6">
                        <div onClick={handleShowPassword} className="px-2">
                          {showPassword ? <FiEye /> : <FiEyeOff />}
                        </div>
                        <input
                          id="password"
                          name="adminPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={adminDetails.adminPassword}
                          onChange={handleInputChange}
                          required
                          autoComplete="current-password"
                          className="w-full outline-none px-3  bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          )}

          {!isAdminLoggedIn && (
            <>
              <div>
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className=" w-full flex justify-center  text-center"
                  >
                    <Avatar
                      src={
                        adminDetails.image
                          ? URL.createObjectURL(adminDetails.image)
                          : avatar
                      }
                      size="100"
                      round
                    />
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className=" hidden   text-white "
                  />

                  {/* {avatarPreview && (
                  <img src={avatarPreview} width={80} height={80} />
                )} */}
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <div className=" flex items-center   text-black px-4 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white sm:text-sm sm:leading-6">
                    <div className="px-2">
                      <SiNamebase />
                    </div>
                    <input
                      id="fullname"
                      name="adminName"
                      type="name"
                      placeholder="Fullname"
                      value={adminDetails.adminName}
                      onChange={handleInputChange}
                      required
                      className="w-full outline-none px-3  bg-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <div className=" flex items-center   text-black px-4 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white sm:text-sm sm:leading-6">
                    <div className="px-2">
                      <MdOutlineMail />
                    </div>
                    <input
                      id="email"
                      name="adminEmail"
                      type="email"
                      placeholder="Email Address"
                      value={adminDetails.adminEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full outline-none px-3  bg-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between"></div>
                <div className="mt-2">
                  <div className=" flex items-center  text-black   px-4 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6">
                    <div onClick={handleShowPassword} className="px-2">
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </div>
                    <input
                      id="password"
                      name="adminPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={adminDetails.adminPassword}
                      onChange={handleInputChange}
                      required
                      autoComplete="current-password"
                      className="w-full outline-none px-3  bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600  border-[0.4px] border-white"
            >
              {isAdminLoggedIn ? "Login" : "Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-3 w-full  text-sm text-black">
          {isAdminLoggedIn ? (
            <>
              <span>Wanna be admin ? </span>
            </>
          ) : (
            <>
              <span>Already an admin ? </span>
            </>
          )}

          <span
            onClick={handleIsAdminLoggedIn}
            className="cursor-pointer underline"
          >
            {!isAdminLoggedIn ? "Log In " : "Sign up "}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
