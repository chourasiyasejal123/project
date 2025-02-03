import axios from "axios";

const apiKey = "33f565a1-d26c-11ef-8b17-0200cd936042";

export const sendOtp = async (phone) => {
  try {
    const response = await axios.get(`https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN`);
    if (response.data.Status === "Success") {
      return { success: true, verificationId: response.data.Details };
    } else {
      return { success: false, message: "Failed to send OTP" };
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP" };
  }
};

export const verifyOtp = async (verificationId, otp) => {
  try {
    const response = await axios.get(
      `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${verificationId}/${otp}`
    );
    if (response.data.Status === "Success") {
      return { success: true };
    } else {
      return { success: false, message: "Invalid OTP" };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Failed to verify OTP" };
  }
};