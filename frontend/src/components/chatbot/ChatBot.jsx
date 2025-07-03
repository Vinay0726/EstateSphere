import React, { useState, useEffect } from "react";
import { FaRobot, FaUserEdit } from "react-icons/fa"; // React icon for chatbot
import "../../assets/css/chatbot.css"; // Optional custom styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load the API key from the .env file
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Add a greeting message when the chatbot first loads
  useEffect(() => {
    setMessages([{ sender: "bot", text: "🤖 How can I help you today?" }]);
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput },
    ]);
    setUserInput(""); // Reset user input
    setLoading(true); // Show loading state

    try {
      // Send the request to the Google Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Provide a short, professional description just like chat bot RealEstate Property assistance for the role of ${userInput}.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from Google Gemini API");
      }

      const data = await response.json();
      console.log("chatbot response",data)

      // Add the bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text:
            data?.candidates[0].content.parts[0].text
              .replace(/[\/|]/g,"$1")
              .trim() || "No response received.",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      className="chatbot-container max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
      style={{
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For Internet Explorer
      }}
    >
      <div className="chatbot-header flex items-center space-x-3 text-xl font-semibold text-gray-700 mb-4">
        <FaRobot className="text-blue-500" size={30} />
        <span>Real Estate Assistant</span>
      </div>
      <div className="chatbot-messages mb-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <FaRobot className="text-gray-500" size={24} />
            )}
            {msg.sender === "user" && (
              <FaUserEdit className="text-blue-400" size={24} />
            )}
            <div
              className={`chatbot-message p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-400 text-white ml-auto max-w-[70%]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-3">
            <FaRobot className="text-gray-500" size={24} />
            <div className="chatbot-message bot-message p-3 rounded-lg bg-gray-200 text-gray-700">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="chatbot-input flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask about properties..."
          className="flex-grow p-2 border rounded-lg border-gray-300"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
