import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
export default function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Move to the next input if value is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      setError("Please enter a 4-digit OTP");
    } else {
      setLoading(true);

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/verify-code`,
        {
          verificationCode: otpValue,
          email: JSON.parse(localStorage.getItem("tempData"))?.email,
        }
      );

      if (response.status === 200) {
        navigate("/sign-in");
        setLoading(false);
      }
      else {
        setError(response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                maxLength="1"
                autoFocus={true}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg border border-[#38b000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#38b000]"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-[#38b000] text-white px-4 py-2 rounded-md hover:bg-[#70e000] w-full"
          >
            {
              loading ? "Verifying..." : "Verify OTP"
            }
          </button>
        </form>
      </div>
    </div>
  );
}
