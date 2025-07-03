import {
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlinePersonAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUser, registerSeller } from "../../Store/State/SellerAuth/Action";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

const RegisterFormSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { auth } = useSelector((store) => store);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/otp/send?email=${encodeURIComponent(
          userData.email
        )}`
      );
      setOtpSent(true);
      setVerificationMessage("OTP sent to email successfully!");
    } catch (error) {
      setVerificationMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/otp/verify?email=${encodeURIComponent(
          userData.email
        )}&otp=${userData.otp}`
      );
      setOtpVerified(true);
      setVerificationMessage("OTP verified successfully!");
    } catch (error) {
      setVerificationMessage("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!otpVerified) {
      setVerificationMessage("Please verify OTP before registering.");
      return;
    }
    dispatch(registerSeller(userData));
    console.log("Seller data after OTP verification:", userData);
    navigate("/slogin")
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <h1 className="flex justify-center items-center text-3xl gap-3 text-green-500">
          <MdOutlinePersonAdd /> Seller Register
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              variant="outlined"
              value={userData.firstName}
              onChange={handleChange}
              className="shadow-lg"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              value={userData.lastName}
              onChange={handleChange}
              className="shadow-lg"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              value={userData.email}
              onChange={handleChange}
              className="shadow-lg"
            />
            <Button
              onClick={handleSendOtp}
              disabled={loading || otpSent}
              variant="contained"
              size="small"
              className="mt-2 bg-blue-500 text-white"
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </Button>
          </Grid>

          {otpSent && (
            <Grid item xs={12}>
              <TextField
                required
                id="otp"
                name="otp"
                label="Enter OTP"
                fullWidth
                variant="outlined"
                value={userData.otp}
                onChange={handleChange}
                className="shadow-lg"
              />
              <Button
                onClick={handleVerifyOtp}
                variant="contained"
                size="small"
                className="mt-2 bg-green-500 text-white"
              >
                Verify OTP
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={userData.password}
              onChange={handleChange}
              className="shadow-lg"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {verificationMessage && (
            <Grid item xs={12}>
              <p className="text-sm text-red-500">{verificationMessage}</p>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
              sx={{ padding: "12px" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="mt-4 flex justify-center items-center">
        <p>Already have an account?</p>
        <button
          className="ml-2 text-green-500 hover:underline"
          onClick={() => navigate("/slogin")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterFormSeller;
