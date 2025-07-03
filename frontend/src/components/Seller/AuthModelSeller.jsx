import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import LoginFormSeller from "./LoginFormSeller";
import RegisterFormSeller from "./RegisterFormSeller";


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
  borderRadius: "8px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  p: 4,
};

const AuthModalSeller = ({ handleClose, open }) => {
  const location = useLocation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={style}>
        {location.pathname === "/slogin" ? <LoginFormSeller /> : <RegisterFormSeller />}
      </Box>
    </Modal>
  );
};

export default AuthModalSeller;
