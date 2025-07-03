import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./components/Loader";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import Chatbot from "./components/chatbot/ChatBot";
import { IoClose } from "react-icons/io5";
import BuyerRouter from "./routers/BuyerRouter";
import SellerRouter from "./routers/SellerRouter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "./components/chatroom/ChatPage";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);

  const location = useLocation();

  // Define routes where Navbar and Footer are not needed
  const hideNavbarFooterRoutes = ["/seller/*"];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.some((route) =>
    location.pathname.startsWith(route.replace("*", ""))
  );

  useEffect(() => {
    // Simulate a loading delay (e.g., data fetching or initialization)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* Toast Container */}
          <ToastContainer />
          {/* Conditionally Render Navbar */}
          {!shouldHideNavbarFooter && <Navbar />}

          <Routes>
            {/* Default homepage */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<HomePage />} />
            <Route path="/register" element={<HomePage />} />
            <Route path="/slogin" element={<HomePage />} />
            <Route path="/sregister" element={<HomePage />} />
            <Route path="/buyer/*" element={<BuyerRouter />} />
            <Route path="/seller/*" element={<SellerRouter />} />
            
           {/* chat room */}
             <Route path="/chat" element={<ChatPage />} />
            
          </Routes>

          {/* Conditionally Render Footer */}
          {!shouldHideNavbarFooter && <Footer />}

          {/* Chatbot Button */}
          <button
            onClick={toggleChatbot}
            className="fixed z-20 flex justify-center items-center bottom-12 right-6 p-3 rounded-full shadow-xl hover:border-1"
          >
            <div>
              <img
                src="/chatbot.png"
                className="h-20 w-20"
                alt="Chatbot Icon"
              />
            </div>
          </button>

          {/* Chatbot Popup */}
          {showChatbot && (
            <div
              className="fixed bottom-20 right-20 bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden"
              style={{ zIndex: 1000 }}
            >
              {/* Close Button */}
              <div className="flex justify-end p-2 border-none">
                <button
                  onClick={toggleChatbot}
                  className="text-xl p-1 rounded-full"
                  aria-label="Close Chatbot"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <Chatbot />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
