import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  FaHome,
  FaMoneyBillWave,
  FaCity,
  FaRulerCombined,
  FaBed,
  FaHandshake,
  FaComments,
  FaHandshakeSlash,
  FaDumbbell,
  FaParking,
  FaFutbol,
  FaTint,
  FaBolt,
  FaWifi,
  FaVideo,
  
} from "react-icons/fa";
import {
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import { MdViewInAr } from "react-icons/md";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import MapBox from "./MapBox";
import useChatContext from "../../context/ChatContext";
import { createRoomApi, getRoomIdApi, joinChatApi } from "../../services/RoomService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Store/State/BuyerAuth/Action";
import toast from "react-hot-toast";
import PropertyRecommendation from "./PropertyRecommendation";


const PropertyDetailsId = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const buyerId = auth?.user?.id;



  // Fetch user details on mount
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  //for chatroom
  const [detail, setDetail] = useState({
    buyerId: "",
    propertyId: "",
    sellerId: "",
    userName: "",
  });

  const { roomId, setReceiverId, setRoomId, setCurrentUser, setConnected } =
    useChatContext();

  const navigate = useNavigate();
   const propertyId = property?.id;
   const sellerId = property?.seller?.id;

  //for getting properties
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const response = await axios.get(
          `${API_BASE_URL}/api/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperty(response.data);

        setActiveImage(`${response.data.bedImage}`); // Default big image
      } catch (err) {
        setError("Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();

    //getting room id
   
   if (buyerId && propertyId && sellerId) {
     const fetchRoomId = async () => {
       try {
         const token = localStorage.getItem("jwt");
         const response = await axios.get(
           `${API_BASE_URL}/api/v1/rooms/getRoomId`,
           {
             params: {
               buyerId,
               propertyId,
               sellerId,
             },
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
         );
         console.log("getting id", response.data);
         setCurrentUser(auth?.user?.firstName || "Unknown User");
         setRoomId(response.data); // Assuming `roomId` is returned directly.
         setError(null);
       } catch (err) {
         if (err.response && err.response.status === 404) {
           console.log("Room not found!");
         } else {
           setError("An error occurred while fetching the room ID.");
         }
       }
     };

     fetchRoomId();
   } else {
     console.log("Buyer ID, Property ID, and Seller ID are required!");
   }

  }, [id,roomId, buyerId, propertyId, sellerId]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center h-screen text-red-500">
        {error}
      </Box>
    );
  }

  if (!property) {
    return (
      <Box className="flex justify-center items-center h-screen text-gray-500">
        No property details available
      </Box>
    );
  }

  const imageList = [
    { name: "Bedroom", url: property.bedImage },
    { name: "Hall", url: property.hallImage },
    { name: "Kitchen", url: property.kitchenImage },
  ];

  


  const validateForm = () => {
    if (!buyerId || !property?.id || !property?.seller?.id) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };

  





  //join room if already created
  async function joinChat() {
    if (validateForm()) {
      //join chat

      try {
        const room = await joinChatApi(roomId);
        toast.success("joined..");
        setCurrentUser(auth?.user?.firstName || "Unknown User");
        setRoomId(room.roomId);
        setReceiverId(sellerId);
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
  }
  //for creating room

  const createRoom = async () => {
    if (validateForm()) {
      const roomData = {
        buyerId: buyerId,
        propertyId: property.id,
        sellerId: property.seller.id,
      };

      try {
        const response = await createRoomApi(roomData);
        console.log("Room Created Successfully:", response);

        toast.success("Room Created Successfully!");

        setCurrentUser(auth?.user?.firstName || "Unknown User");
        setRoomId(response.roomId);
        setReceiverId(sellerId)
        setConnected(true);
        navigate("/chat");
        // Navigate to the chat room or perform other actions
        // navigate("/chat"); // Uncomment and implement navigation logic if needed
      } catch (error) {
        console.error("Error creating room:", error);
        joinChat();
        if (error.response && error.response.status === 400) {
         clg(error.response.data || "Room already exists!");
          
        } else {
          toast.error("Error in creating room");
        }
      }
    }
  };

  return (
    <Box className="px-8 sm:px-40 space-y-16 ">
      {/* Main Section: Image and Property Details */}
      <Grid container spacing={3} marginTop={2}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Card className="p-4 shadow-sm border border-gray-100 rounded-lg">
            {/* Property Title */}
            <Box className="text-center mb-4">
              <Typography
                variant="h5"
                className="font-bold text-indigo-600 tracking-wide"
              >
                {property.name}
              </Typography>
              <Box className="w-12 h-1 mt-2 mx-auto bg-indigo-500 rounded"></Box>
            </Box>

            {/* Property Image Section */}
            <Box className="relative">
              {/* Main Image */}
              <img
                src={activeImage}
                alt="Property"
                className="w-full h-[400px] object-cover rounded-lg shadow-md border border-gray-300"
              />

              {/* AR/VR Icon Overlay */}
              <Box className="absolute bottom-24 right-4 bg-black bg-opacity-75 p-2 rounded-md flex items-center space-x-2">
                <MdViewInAr
                  onClick={() => navigate(`/buyer/virtualtour/${property.id}`)}
                  className="text-white w-6 h-6"
                />
              </Box>

              {/* Thumbnails */}
              <Grid container spacing={1} className="mt-3">
                {imageList.map((image, index) => (
                  <Grid
                    item
                    xs={4}
                    key={index}
                    className="cursor-pointer group"
                    onClick={() =>
                      setActiveImage(image.url ? `${image.url}` : activeImage)
                    }
                  >
                    <Box className="flex flex-col items-center">
                      <img
                        src={
                          image.url
                            ? `${image.url}`
                            : "https://via.placeholder.com/150"
                        }
                        alt={image.name}
                        className="w-full h-16 object-cover rounded-md border border-gray-300 transition-transform transform group-hover:scale-105 group-hover:shadow-lg"
                      />
                      <Typography
                        variant="caption"
                        className="mt-1 text-gray-600 group-hover:text-indigo-500 font-medium"
                      >
                        {image.name}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Card>
        </Grid>

        {/* Property Details Section */}
        <Grid item xs={12} md={6}>
          <Card className="p-8 shadow-sm border border-gray-100 pb-48 rounded-lg bg-white">
            {/* Header */}
            <Box className="text-center   py-8 px-16 ">
              <Typography
                variant="h5"
                className="font-bold text-indigo-700 tracking-wide"
              >
                Property Details
              </Typography>
              <Box className="w-20 h-1 mt-2 mx-auto bg-indigo-500 rounded"></Box>
            </Box>

            {/* Description */}
            <Typography
              variant="h5"
              letterSpacing={"1px"}
              className="font-extrabold text-indigo-700 tracking-wide px-4 py-6"
            >
              {property.description}
            </Typography>

            {/* Details Grid */}
            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
              {/* Property Type */}
              <Box className="flex items-center">
                <FaHome className="text-indigo-500 text-2xl mr-3" />
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-500 uppercase tracking-wide"
                  >
                    Type
                  </Typography>
                  <Typography variant="h6" className="font-bold">
                    {property.propertyType}
                  </Typography>
                </Box>
              </Box>

              {/* Transaction Type */}
              <Box className="flex items-center">
                <FaHandshake className="text-indigo-500 text-2xl mr-3" />
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-500 uppercase tracking-wide"
                  >
                    Transaction Type
                  </Typography>
                  <Typography variant="h6" className="font-bold">
                    {property.transactionType}
                  </Typography>
                </Box>
              </Box>

              {/* Location */}
              <Box className="flex items-center">
                <FaCity className="text-indigo-500 text-2xl mr-3" />
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-500 uppercase tracking-wide"
                  >
                    Location
                  </Typography>
                  <Typography variant="h6" className="font-bold">
                    {property.city}
                  </Typography>
                </Box>
              </Box>

              {/* Area Size */}
              <Box className="flex items-center">
                <FaRulerCombined className="text-indigo-500 text-2xl mr-3" />
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-500 uppercase tracking-wide"
                  >
                    Area Size
                  </Typography>
                  <Typography variant="h6" className="font-bold">
                    {property.areaSize} sqft
                  </Typography>
                </Box>
              </Box>

              {/* BHK */}
              <Box className="flex items-center">
                <FaBed className="text-indigo-500 text-2xl mr-3" />
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-500 uppercase tracking-wide"
                  >
                    BHK
                  </Typography>
                  <Typography variant="h6" className="font-bold">
                    {property.noOfBhk}
                  </Typography>
                </Box>
              </Box>

              {/* Price */}
              <Box className="flex items-center">
                <FaMoneyBillWave className="text-green-500 text-2xl mr-3" />
                <Box>
                  <Typography
                    variant="subtitle1"
                    className="text-gray-500 uppercase tracking-wide"
                  >
                    Price
                  </Typography>
                  <Typography variant="h6" className="font-bold text-green-600">
                    ₹{property.price}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Seller Details Section */}
      <Card className="p-8 pb-16 shadow-sm mt-6 border border-gray-100 rounded-lg bg-gradient-to-r from-white to-blue-50">
        {/* Header */}
        <Typography
          variant="h5"
          className="font-extrabold text-indigo-700 tracking-wide text-center"
        >
          Seller Details
        </Typography>
        <Box className="w-24 h-1 mt-2 mx-auto bg-indigo-500 rounded"></Box>

        {/* Seller Info */}
        <Box className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          {/* Seller Name */}
          <Box className="flex items-center text-lg text-gray-700 font-medium">
            <FaUser className="mr-3 text-indigo-500 text-2xl" />
            {property.seller.firstName} {property.seller.lastName}
          </Box>

          {/* Email Info */}
          <Box className="flex items-center text-lg text-gray-700 font-medium">
            <FaEnvelope className="mr-3 text-blue-500 text-2xl" />
            {property.seller.email}
          </Box>

          {/* Connect Button */}
          <Button
            onClick={createRoom}
            variant="contained"
            color="primary"
            className="flex items-center justify-center gap-2 text-lg py-3 px-6 font-bold bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-md rounded-full transition-transform transform hover:scale-105 active:scale-95"
          >
            <FaComments className="text-white" /> {/* Chat Icon */}
            Connect
          </Button>
        </Box>
      </Card>
      <div className="flex flex-col sm:flex-row w-full space-x-6">
        {/* Amenities Section */}
        <Card className="p-8 sm:w-1/2 h-72 pb-16 shadow-sm mt-6 border border-gray-100 rounded-lg bg-gradient-to-r from-white to-blue-50">
          {/* Amenities Header */}
          <Typography
            variant="h5"
            className="font-extrabold text-indigo-700 tracking-wide text-center mb-6"
          >
            Amenities
          </Typography>
          <Box className="w-24 h-1 mt-2 mx-auto bg-indigo-500 rounded"></Box>

          {/* Amenities List */}
          <Grid container spacing={4} className="mt-6">
            {property.amenities.map((amenity, index) => {
              // Define a mapping of amenities to icons
              const amenityIcons = {
                Gym: <FaDumbbell />,
                Parking: <FaParking />,
                Playground: <FaFutbol />,
                "24/7 Water": <FaTint />,
                "24/7 Electricity Supply": <FaBolt />,
                "24/7 Wi-Fi": <FaWifi />,
                "24/7 CCTV": <FaVideo />,
              };
              // Get the icon for the current amenity or null if not found
              const amenityIcon = amenityIcons[amenity] || null;

              return (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  key={index}
                  className="flex items-center justify-between transition-transform transform hover:scale-110 p-4 rounded-lg"
                >
                  <Box className="flex items-center space-x-3">
                    {/* Icon or blank if no matching amenity */}
                    <Box className="text-indigo-600 text-3xl p-2">
                      {amenityIcon}
                    </Box>
                    <Typography className="text-lg font-semibold text-gray-700">
                      {amenity}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Card>

        {/* MapBox Section */}
        <div className="sm:w-1/2 mt-6">
          <MapBox latitude={property.latitude} longitude={property.longitude} />
        </div>
      </div>
      <div>
        <PropertyRecommendation
          propertyType={property.propertyType}
          transactionType={property.transactionType}
          maxAreaSize={property.areaSize}
          city={property.city}
          maxP={property.price}
        />
      </div>
    </Box>
  );
};

export default PropertyDetailsId;
