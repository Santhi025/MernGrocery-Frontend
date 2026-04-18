import axios from "axios";
import React, { useState } from "react";
import { emailUrl } from "../repo/api_path";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";  

const SendOtp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const emailHandler = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      return toast.error("Please enter name and email");
    }

    try {
      setLoading(true);

      await axios.post(`${emailUrl}/send-otp`, {
        name,
        email,
      });

      toast.success("OTP sent to your email"); 

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);

      setName("");
      setEmail("");

      navigate("/verify-otp");
    } catch (error) {
      toast.error("Failed to send OTP"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emailSection">
      <div className="emailHeading">
        *Please enter your Name and Email for OTP
      </div>

      <form onSubmit={emailHandler} className="emailForm">
        <h3>Name</h3>
        <input
          type="text"
          placeholder="please enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3>Email</h3>
        <input
          type="email"
          placeholder="please enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default SendOtp;