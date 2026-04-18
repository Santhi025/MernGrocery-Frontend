import axios from "axios";
import React, { useState } from "react";
import { emailUrl } from "../repo/api_path";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast"; 

const OtpVerify = () => {
  const userEmail = localStorage.getItem("userEmail");

  const [email] = useState(userEmail);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();   const otpHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP");
    }

    const userName = localStorage.getItem("userName");

    try {
      setLoading(true);

      const res = await axios.post(`${emailUrl}/verify-otp`, {
        email,
        otp,
      });

      toast.success("Login successful"); 

      login(userName, res.data.token);

      navigate("/");
    } catch (error) {
      toast.error("Invalid OTP"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emailSection">
      <div className="emailHeading verify">OTP Verification</div>

      <form onSubmit={otpHandler} className="emailForm">
        <div style={{ color: "red" }}>OTP valid only for 5 mins</div>

        <h3>Email</h3>
        <input type="email" value={email} disabled />

        <h3>OTP</h3>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;