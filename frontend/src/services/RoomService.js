import { httpClient } from "../config/AxiosHelper";

// Function to get the JWT token from local storage or any other storage mechanism
const getAuthToken = () => {
  return localStorage.getItem("jwt"); // Retrieve the JWT token from local storage
};

// API to create a room
export const createRoomApi = async (roomDetail) => {
  const token = getAuthToken(); // Retrieve the JWT token
  const response = await httpClient.post(
    "/api/v1/rooms",
    roomDetail, // Directly pass roomDetail
    {
      headers: {
        "Content-Type": "application/json", // Set the correct content type
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    }
  );
  return response.data; // Return the API response data
};

// API to join a chat room
export const joinChatApi = async (roomId) => {
  const token = getAuthToken(); // Retrieve the JWT token
  console.log("getting room id", roomId);
  const response = await httpClient.get(`/api/v1/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the JWT token in the headers
    },
  });
  return response.data; // Return the API response data
};

// API to fetch messages from a room
export const getMessagess = async (roomId, size = 50, page = 0) => {
  const token = getAuthToken(); // Retrieve the JWT token
  const response = await httpClient.get(
    `/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    }
  );
  return response.data.content; // Return only the messages array from the response
};

// New API to get room ID by buyerId, sellerId, and propertyId
export const getRoomIdApi = async (buyerId, sellerId, propertyId) => {
  const token = getAuthToken(); // Retrieve the JWT token
  const response = await httpClient.get(
    `/api/v1/rooms/getRoomId?buyerId=${buyerId}&sellerId=${sellerId}&propertyId=${propertyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    }
  );
  return response.data; // Return the room ID from the response
};
