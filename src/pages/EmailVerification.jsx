import React, { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../components/firebase/config";

const EmailVerification = ({ email, password, onVerify, onChange, onPasswordChange, isEmailVerified }) => {
  const [isVerified, setIsVerified] = useState(isEmailVerified);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailVerify = () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    setIsLoading(true);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Verification email sent.");
        setIsVerified(true);
        onVerify();
      })
      .catch((error) => {
        console.error("Email verification error:", error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
        <div className="flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isVerified} // Disable input if verified
          />
          {!isVerified && (
            <button
              type="button"
              onClick={handleEmailVerify}
              className={`px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Verify"}
            </button>
          )}
          {isVerified && (
            <span className="text-green-500 text-lg ml-2" title="Verified">
              ✔️
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
};

export default EmailVerification;