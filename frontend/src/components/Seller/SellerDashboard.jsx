import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import {
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { getUser, logout } from "../../Store/State/SellerAuth/Action";
import SellerUpdateProfile from "./SellerUpdateProfile";
import AddProperties from "./AddProperties";
import ListPropertiesAdded from "./ListPropertiesAdded";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import RoomList from "./RoomList";
import PaymentHistory from "./PaymentHistory";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { auth } = useSelector((store) => store);

  console.log("seller getting data", auth);

   useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        dispatch(getUser(jwt)); 
      }
    }, [auth.jwt, dispatch]);
  
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/slogin");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 useEffect(() => {
   const handleResize = () => {
     setIsMobile(window.innerWidth < 768);
   };

   window.addEventListener("resize", handleResize);
   return () => window.removeEventListener("resize", handleResize);
 }, []);
  const sidebarContent = (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-5">
      {/* Close Button (Visible only on mobile) */}
      <IconButton
        edge="end"
        color="inherit"
        onClick={toggleMenu}
        className="self-end text-white sm:hidden"
      >
        <CloseIcon
          style={{ display: isMobile ? "block" : "none" }} // Inline CSS for showing only on mobile
          className="block lg:hidden"
        />
      </IconButton>

      {/* User Avatar and Name */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {/* Main Avatar */}
          <Avatar
            className="w-16 h-16 mb-2 bg-blue-500 text-white shadow-lg"
            style={{ fontSize: "24px", fontWeight: "bold" }}
          >
            {auth?.user?.firstName.charAt(0).toUpperCase() || "S"}
          </Avatar>

          {/* React Icon Overlay */}
          <FaUserCircle className="absolute -bottom-2 -right-2 text-blue-400 text-xl" />
        </div>

        {/* User Name */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-300">
            {auth?.user?.firstName || "John"} {auth?.user?.lastName || "Doe"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <List className="w-full">
        <Link to="/seller/dashboard/addproperty">
          <ListItem button className="hover:bg-gray-700 rounded-md">
            <ListItemIcon>
              <AddBoxIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Add Properties" className="text-white" />
          </ListItem>
        </Link>

        <Link to="/seller/dashboard/listaddedproperty">
          <ListItem button className="hover:bg-gray-700 rounded-md">
            <ListItemIcon>
              <ListAltIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Properties Added" className="text-white" />
          </ListItem>
        </Link>
        <Link to="/seller/dashboard/roomList">
          <ListItem button className="hover:bg-gray-700 rounded-md">
            <ListItemIcon>
              <ListAltIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Chat Rooms" className="text-white" />
          </ListItem>
        </Link>
        <Link to="/seller/dashboard/paymenthistory">
          <ListItem button className="hover:bg-gray-700 rounded-md">
            <ListItemIcon>
              <ListAltIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Payment History" className="text-white" />
          </ListItem>
        </Link>
        <Link to="/seller/dashboard/updateprofile">
          <ListItem button className="hover:bg-gray-700 rounded-md">
            <ListItemIcon>
              <AccountCircleIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Profile" className="text-white" />
          </ListItem>
        </Link>

        <Divider className="my-4 bg-gray-600" />

        <ListItem
          button
          onClick={handleLogout}
          className="hover:bg-gray-700 rounded-md"
        >
          <ListItemIcon>
            <LogoutIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Logout" className="text-white" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="h-screen flex">
      {/* Toggle Menu Button (Visible only on mobile) */}
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        className="absolute top-4 right-4 z-50 md:hidden"
        onClick={toggleMenu}
      >
        <MenuIcon
          style={{ display: isMobile ? "block" : "none" }} // Inline CSS for showing only on mobile
          className="text-gray-800"
        />
      </IconButton>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={toggleMenu}
        classes={{
          paper:
            "w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out",
        }}
        ModalProps={{
          keepMounted: true,
        }}
        className="md:hidden"
      >
        {sidebarContent}
      </Drawer>

      {/* Persistent Sidebar for Larger Screens */}
      <div className="hidden md:flex h-screen w-1/4 lg:w-1/5 bg-gray-900 text-white">
        {sidebarContent}
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-5 md:p-10 overflow-y-auto"
        style={{
          height: "100vh",
          scrollbarWidth: "none",
        }}
      >
        <Routes>
          <Route path="/updateprofile" element={<SellerUpdateProfile />} />
          <Route path="/addproperty" element={<AddProperties />} />
          <Route path="/roomList" element={<RoomList />} />
          <Route path="/paymenthistory" element={<PaymentHistory />} />
          <Route path="/listaddedproperty" element={<ListPropertiesAdded />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default SellerDashboard;
