import React, { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import Modal from "react-modal"; // Import React Modal

import useChatContext from "../../context/ChatContext";
import { baseURL } from "../../config/AxiosHelper";
import { getMessagess } from "../../services/RoomService";
import { timeAgo } from "../../config/helper";
import { GiToken } from "react-icons/gi";
import PaymentPage from "../Buyer/PaymentPage";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Store/State/BuyerAuth/Action";

Modal.setAppElement("#root"); // Required for accessibility

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    receiverId,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Modal state


  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  

  // Fetch user details on mount
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, navigate]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const messagesData = await getMessagess(roomId);
        setMessages(messagesData.reverse()); // Reverse the messages to show older ones above
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }

    if (connected) {
      loadMessages();
    }
  }, [connected, roomId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to the chat server!");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [connected, roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );

      setMessages((prev) => [
        ...prev,
        { ...message, timeStamp: new Date().toISOString() },
      ]);
      setInput("");
    }
  };

  const handleLogout = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

 
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col">
      <header className="w-full bg-gradient-to-r from-gray-400 via-gray-600 to-gray-700 py-5 shadow-md flex justify-between items-center px-6">
        <h1 className="text-xl font-bold text-purple-300">
          Room: <span className="text-white">{roomId}</span>
        </h1>
        <h1 className="text-xl font-bold text-green-300">
          User: <span className="text-white">{currentUser}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 text-white px-5 py-1 rounded-lg shadow-md transition-all"
        >
          Leave Room
        </button>
      </header>

      <main
        ref={chatBoxRef}
        className="py-4 px-6 w-3/4 mx-auto h-[calc(100%-210px)] overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-400 rounded-xl shadow-lg border border-gray-700"
      >
        {Array.isArray(messages) &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center ${
                message.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`my-3 p-4 max-w-xs rounded-2xl shadow-md ${
                  message.sender === currentUser
                    ? "bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white"
                    : "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-gray-200"
                }`}
              >
                <div className="flex flex-row gap-3 items-center">
                  <img
                    className="h-12 w-12 rounded-full shadow-md border border-gray-500"
                    src={"https://avatar.iran.liara.run/public/43"}
                    alt="User Avatar"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">{message.sender}</p>
                    <p className="text-base">{message.content}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      {timeAgo(message.timeStamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </main>

      <div className="mt-6 w-full flex justify-center">
        <div className="flex items-center gap-4 w-11/12 sm:w-3/4 lg:w-2/3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-4 px-8 rounded-full shadow-xl border border-gray-700">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            type="text"
            placeholder="Type your message..."
            className="flex-grow bg-transparent text-black placeholder-gray-400 px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <div className="flex gap-3">
            {auth?.user?.role === "BUYER" && (
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="p-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-full shadow-lg hover:scale-105 transform transition-all"
                title="Make Payment"
              >
                <RiMoneyRupeeCircleLine size={22} />
              </button>
            )}
            {auth?.user?.role === "SELLER" && (
              <button
                onClick={() => navigate("/seller/dashboard/paymenthistory")}
                className="p-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-full shadow-lg hover:scale-105 transform transition-all"
                title="Make Payment"
              >
                <RiMoneyRupeeCircleLine size={22} />
              </button>
            )}

            <button
              onClick={sendMessage}
              className="p-3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-full shadow-lg hover:scale-105 transform transition-all"
              title="Send Message"
            >
              <MdSend size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onRequestClose={() => setIsPaymentModalOpen(false)}
        className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl w-96 p-8 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
      >
        <h2 className="text-xl flex justify-center items-center gap-3 font-extrabold text-gray-800 mb-6 text-center">
          Make a Token Payment <GiToken className="text-yellow-400" />
        </h2>

        <PaymentPage sellerId={receiverId} />
      </Modal>
    </div>
  );
};

export default ChatPage;
