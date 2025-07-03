import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Store/State/SellerAuth/Action";
import { API_BASE_URL } from "../../config/apiConfig";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import useChatContext from "../../context/ChatContext";
import { joinChatApi } from "../../services/RoomService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  console.log("getting rooms", rooms);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState({});
  const [buyers, setBuyers] = useState({}); // State for buyer details
  const navigate=useNavigate();

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const sellerId = auth?.user?.id;

  //for chatroom
  const [detail, setDetail] = useState({
    buyerId: "",
    propertyId: "",
    sellerId: "",
    userName: "",
  });

  const { roomId, userName, setRoomId, setCurrentUser, setConnected } =
    useChatContext();


  // Fetch user details on mount
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  // Fetch rooms by seller ID
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/rooms/getRoomsBySellerId`,
          {
            params: { sellerId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) {
      fetchRooms();
    }
  }, [sellerId]);

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async (propertyId) => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${API_BASE_URL}/api/properties/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperties((prev) => ({
          ...prev,
          [propertyId]: response.data,
        }));
      } catch (err) {
        console.error(
          `Failed to fetch property details for ${propertyId}:`,
          err
        );
      }
    };

    const uniquePropertyIds = [
      ...new Set(rooms.map((room) => room.propertyId)),
    ];
    uniquePropertyIds.forEach((propertyId) => {
      if (!properties[propertyId]) {
        fetchPropertyDetails(propertyId);
      }
    });
  }, [rooms]);

  // Fetch buyer details

  useEffect(() => {
    const fetchBuyerDetails = async (buyerId) => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${API_BASE_URL}/api/user/${buyerId}/name`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBuyers((prev) => ({
          ...prev,
          [buyerId]: response.data,
        }));
      } catch (err) {
        console.error(`Failed to fetch buyer details for ${buyerId}:`, err);
      }
    };

    // Extract unique buyer IDs from the rooms array
    const uniqueBuyerIds = [...new Set(rooms.map((room) => room.buyerId))];

    uniqueBuyerIds.forEach((buyerId) => {
      if (!buyers[buyerId]) {
        fetchBuyerDetails(buyerId);
      }
    });
  }, [rooms, buyers]);

  if (loading)
    return <p className="text-center text-gray-500 mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  
  //join room if already created
  async function joinChat(roomId) {
    //join chat
    try {
      const room = await joinChatApi(roomId);
      toast.success("joined..");
      setCurrentUser(auth?.user?.firstName || "Unknown User");
      setRoomId(room.roomId);
      setConnected(true);
      navigate("/chat");
    } catch (error) {
      if (error.status == 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Error in joining room");
      }
      console.log(error);
    }
  }
  return (
    <div className="p-6 px-6 sm:mx-16 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        List of Rooms
      </h2>

      {rooms.length > 0 ? (
        <ul className="space-y-6">
          {rooms.map((room) => {
            const property = properties[room.propertyId];
            const buyer = buyers[room.buyerId];
            return (
              <li
                key={room.roomId}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-in-out flex flex-col sm:flex-row justify-between items-start sm:items-center transform hover:scale-105"
              >
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                  <div className="flex flex-col sm:w-1/3">
                    <p className="text-xl text-gray-800 font-semibold">
                      <span className="text-gray-500">Room ID:</span>{" "}
                      {room.roomId}
                    </p>
                    <p className="text-xl text-gray-800 font-semibold">
                      <span className="text-gray-500">Buyer Name:</span>{" "}
                      {buyer ? `${buyer}` : "Loading..."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:w-1/3 mt-4 sm:mt-0">
                    {property && (
                      <>
                        <p className="text-xl text-gray-800 font-semibold">
                          <span className="text-gray-500">Property Name</span>{" "}
                          {property.name}
                        </p>
                        <img
                          src={`${property.frontImage}`}
                          alt={property.name}
                          className="w-36 h-36 object-cover mt-2 rounded-lg shadow-sm transform hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 sm:mt-0">
                  <button
                     onClick={() => joinChat(room.roomId)}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
                  >
                    <IoChatboxEllipsesOutline className="mr-2 text-2xl" />
                    <span className="text-lg">Connect</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-600 text-xl">
          No rooms found for this seller.
        </p>
      )}
    </div>
  );
};

export default RoomList;
