import React, { useState } from "react";
import axios from "axios";

const PhoneVerification = ({ phone, onVerify, onChange }) => {
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const apiKey = "33f565a1-d26c-11ef-8b17-0200cd936042";

  const sendOtp = () => {
    if (!phone) {
      alert("Please enter a phone number.");
      return;
    }

    axios
      .get(`https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN`)
      .then((response) => {
        if (response.data.Status === "Success") {
          alert("OTP sent!");
          setVerificationId(response.data.Details);
          setIsOtpSent(true);
        }
      })
      .catch((error) => console.error("Error sending OTP:", error));
  };

  const verifyOtp = () => {
    axios
      .get(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${verificationId}/${otp}`)
      .then((response) => {
        if (response.data.Status === "Success") {
          alert("Phone verified!");
          onVerify();
          setIsOtpSent(false);
        }
      })
      .catch((error) => console.error("Error verifying OTP:", error));
  };

  return (
    <div className="p-2 bg-gray-100 ">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Phone:</label>
        <div className="relative">
          <input
            type="text"
            value={phone}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 pr-20 border rounded focus:ring focus:ring-blue-200"
            placeholder="Enter your phone number"
          />
          <button
            type="button"
            onClick={sendOtp}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send OTP
          </button>
        </div>
      </div>
      {isOtpSent && (
        <div>
          <label className="block text-gray-700 font-medium mb-2">OTP:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-grow p-2 border rounded focus:ring focus:ring-blue-200"
              placeholder="Enter OTP"
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;