import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../components/firebase/config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase/config";
import { Roles } from "../components/constants/roles"; // Import Roles enum

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Get all users from Firestore
      const usersCollection = await getDocs(collection(db, "users"));
      const userDoc = usersCollection.docs.find((doc) => doc.data().email === email);

      if (userDoc) {
        const userEntity = userDoc.data().entity;

        if (userEntity === Roles.admin) {
          // Allow only admins to log in
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          navigate("/dashboard");
        } else {
          setError("You do not have admin access.");
        }
      } else {
        setError("Email not found.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      console.log("Sending password reset email to:", email);
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setError("Error sending password reset email.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://6ammart-admin.6amtech.com/public/assets/admin/css/images/auth-bg.png"
          alt="Background Logo"
          className="login-bg"
        />
        <div className="login-logo-container">
          <img
            className="login-logo"
            src="https://samridhimart.com/img/logocanva.png"
            alt="SamriddhiMart Logo"
          />
          <h1 className="login-title">SamriddhiMart</h1>
          <p className="login-subtitle">Your</p>
          <p className="login-subtitle">All Service</p>
          <p className="login-subtitle green">In one field....</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h2 className="login-form-title">Admin Login</h2>
          <p className="login-form-subtitle">Welcome back, log in to your panel.</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6+ characters required"
                className="form-input"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-footer">
              <a href="#" onClick={handleForgotPassword} className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          min-height: 100vh;
          background-color: #f7fafc;
        }

        .login-left {
          position: relative;
          width: 50%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 8px;
        }

        .login-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .login-logo-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .login-logo {
          width: 128px;
          height: auto;
          margin-bottom: 16px;
        }

        .login-title {
          font-size: 2.25rem;
          font-weight: bold;
          color: #38a169;
        }

        .login-subtitle {
          font-size: 1.5rem;
          margin-top: 16px;
        }

        .login-subtitle.green {
          color: #38a169;
        }

        .login-right {
          width: 50%;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 32px;
        }

        .login-form-container {
          width: 100%;
          max-width: 448px;
        }

        .login-form-title {
          font-size: 1.875rem;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .login-form-subtitle {
          color: #718096;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          color: #4a5568;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
        }

        .error-message {
          color: #e53e3e;
          margin-bottom: 16px;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .forgot-password {
          font-size: 0.875rem;
          color: #38a169;
          text-decoration: none;
        }

        .login-button {
          width: 100%;
          background-color: #38a169;
          color: white;
          padding: 8px 0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .login-button:hover {
          background-color: #2f855a;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;