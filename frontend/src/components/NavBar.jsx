import React, { useEffect, useState } from "react";
import {
  FaHeart as FaHeartOutline,
  FaBars,
  FaUser as FaUserOutline,
  FaShoppingCart as FaShoppingCartOutline,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaTimes,
} from "react-icons/fa";
import { FaRegUser, FaRegHeart, FaOpencart } from "react-icons/fa";
import AuthModel from "./Buyer/AuthModel";
import AuthModalSeller from "./Seller/AuthModelSeller";
import { getUser, logout } from "../Store/State/BuyerAuth/Action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuList, MenuItem, Divider, ListItemIcon, ListItemText } from "@mui/material";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthSellerModalOpen, setIsAuthSellerModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);  // State for popover anchor element

  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Auth Modals
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openAuthSellerModal = () => setIsAuthSellerModalOpen(true);
  const closeAuthSellerModal = () => setIsAuthSellerModalOpen(false);

  // Fetch user details on mount
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  // Navigate based on user role
  useEffect(() => {
    if (auth.user) {
      const { role } = auth.user;
      if (
        role === "BUYER" &&
        ["/login", "/register"].includes(location.pathname)
      ) {
        navigate("/");
        setIsAuthModalOpen(false); // Close Buyer auth modal
      } else if (
        role === "SELLER" &&
        ["/slogin", "/sregister"].includes(location.pathname)
      ) {
        navigate("/seller/dashboard/addproperty");
        setIsAuthSellerModalOpen(false); // Close Seller auth modal
      } else if (!role) {
        // Invalid or missing role, force logout
        localStorage.removeItem("jwt");
        navigate("/login");
        setIsAuthModalOpen(false); // Ensure modals are closed
        setIsAuthSellerModalOpen(false); // Ensure modals are closed
      }
    }
  }, [auth.user, navigate, location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the popover on profile click
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); // Close the popover
  };

 const togglePopover = () => {
   setIsPopoverOpen(!isPopoverOpen); // Toggle popover open/close
 };

  return (
    <>
      <nav className="w-full h-16 flex justify-between items-center px-4 shadow-sm sm:px-40 relative">
        {/* Logo */}
        <div onClick={()=>navigate("/")} className="text-2xl font-bold text-blue-600">
          Estate<span className="text-red-500">Sphere</span>
        </div>

        {/* Large Screen Menu */}
        <div className="hidden sm:flex items-center gap-8">
          {auth.user?.firstName ? (
            // User Logged In
            <div className="flex items-center gap-5">
              <a
                onClick={() => navigate("/buyer/favourite")}
                className="flex items-center gap-2"
              >
                <FaRegHeart className="text-2xl" /> Favorite
              </a>
              <button
                onClick={togglePopover}
                className="bg-blue-300 text-white h-12 w-12 flex justify-center items-center font-semibold text-xl rounded-full"
              >
                {auth.user.firstName[0].toUpperCase()}
              </button>

              {/* Popover for Profile and Logout */}
              {isPopoverOpen && (
                <div className="absolute z-40 top-14 right-10 bg-white shadow-md rounded-md">
                  <MenuList>
                    {/* Profile Menu Item */}
                    <MenuItem
                      className="px-8"
                      onClick={() => {
                        navigate("/buyer/updateprofile");
                        togglePopover();
                      }}
                    >
                      <ListItemIcon>
                        <FaUser
                          style={{ fontSize: "1.2rem", color: "#4CAF50" }}
                        />
                        {/* Green color for Profile */}
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>

                    <Divider />

                    {/* Logout Menu Item */}
                    <MenuItem
                      className="px-8"
                      onClick={() => {
                        handleLogout();
                        togglePopover();
                      }}
                    >
                      <ListItemIcon>
                        <FaSignOutAlt
                          style={{ fontSize: "1.2rem", color: "#f44336" }}
                        />
                        {/* Red color for Logout */}
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </MenuList>
                </div>
              )}
            </div>
          ) : (
            // No User Logged In
            <>
              <a href="/buyer/favourite" className="flex items-center gap-2">
                <FaRegHeart className="text-2xl" /> Favorite
              </a>
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2"
              >
                <FaRegUser className="text-2xl" />
                For Buyer
              </button>
              <button
                onClick={openAuthSellerModal}
                className="flex items-center gap-2"
              >
                <FaOpencart className="text-2xl" />
                For Owner
              </button>
            </>
          )}
        </div>

        {/* Mobile Screen Menu */}
        <div className="sm:hidden flex text-2xl items-center gap-5">
          <a href="/buyer/favourite">
            <FaRegHeart />
          </a>
          {auth.user?.firstName ? (
            <div className="flex items-center gap-3">
              <button onClick={toggleMobileMenu}>
                <FaBars />
              </button>
            </div>
          ) : (
            <>
              <button onClick={openAuthModal}>
                <FaRegUser />
              </button>
              <button onClick={toggleMobileMenu}>
                <FaBars />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 right-0 h-screen w-3/4 bg-white shadow-lg transform translate-x-0 transition-transform duration-500 z-50 sm:hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={toggleMobileMenu} className="text-2xl">
                <FaTimes />
              </button>
            </div>
            <ul className="p-4 space-y-5">
              <li className="flex items-center gap-3">
                <FaRegHeart /> <a href="/buyer/favourite">Favorite</a>
              </li>

              {auth.user?.firstName ? (
                <>
                  {/* User Logged In */}
                  <li
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      navigate("/buyer/updateprofile");
                      toggleMobileMenu(); // Close the menu after navigation
                    }}
                  >
                    <FaUser /> Profile
                  </li>
                  <li
                    className="flex items-center gap-3 cursor-pointer text-red-500"
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu(); // Close the menu after logout
                    }}
                  >
                    <FaSignOutAlt /> Logout
                  </li>
                </>
              ) : (
                <>
                  {/* No User Logged In */}
                  <li
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={openAuthModal}
                  >
                    <FaRegUser /> Buyer Login
                  </li>
                  <li
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={openAuthSellerModal}
                  >
                    <FaOpencart /> Seller Login
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Auth Modals */}
      <AuthModel open={isAuthModalOpen} handleClose={closeAuthModal} />
      <AuthModalSeller
        open={isAuthSellerModalOpen}
        handleClose={closeAuthSellerModal}
      />
    </>
  );
};

export default Navbar;
