import {
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginSeller } from "../../Store/State/SellerAuth/Action";
import { useDispatch } from "react-redux";

const LoginFormSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(loginSeller(userData));
    console.log("userData", userData);
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="flex justify-center items-center gap-4 text-2xl text-center font-semibold text-indigo-800 mb-6">
          <FaUserAlt className="text-4xl text-indigo-500" />
          Seller Login
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
              className="shadow-sm"
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
              className="shadow-sm"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordToggle} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
              className="bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300"
              sx={{ padding: "12px" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="mt-4 flex justify-center items-center">
        <p>Don’t have an account?</p>
        <button
          className="ml-2 text-indigo-500 hover:underline"
          onClick={() => navigate("/sregister")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginFormSeller;
