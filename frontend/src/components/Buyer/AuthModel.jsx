import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: 500,
  },
  bgcolor: "white",
  borderRadius: "12px", // Updated border radius
  boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)", // Subtle shadow
  p: 4,
};

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={style}>
        {location.pathname === "/login" ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Modal>
  );
};

export default AuthModal;
