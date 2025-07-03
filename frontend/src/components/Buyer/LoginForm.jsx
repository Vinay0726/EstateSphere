import {
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../../Store/State/BuyerAuth/Action";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));
    console.log("userData", userData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <h1 className="flex justify-center items-center gap-3 text-3xl text-indigo-500">
          <FaRegUserCircle /> Buyer Login
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              autoComplete="email"
              className="shadow-lg"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              autoComplete="current-password"
              className="shadow-lg bg-transparent"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white transition-all duration-300 transform hover:scale-105"
              sx={{ padding: "12px" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="mt-4 flex justify-center items-center">
        <p>Don't have an account?</p>
        <button
          className="ml-2 text-indigo-500 hover:underline"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
