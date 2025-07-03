import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import { ChatProvider } from "./context/ChatContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" />
      <Provider store={store}>
        <ChatProvider>
          <App />
        </ChatProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
