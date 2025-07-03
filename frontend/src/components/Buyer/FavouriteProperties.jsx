import { FaTrashAlt } from "react-icons/fa";
import { API_BASE_URL } from "../../config/apiConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Store/State/BuyerAuth/Action";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FavoriteProperties = () => {
  const [favorites, setFavorites] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const navigate=useNavigate();

  const dispatch = useDispatch();

  const userId=auth?.user?.id;

  // Fetch user details on mount
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  // Fetch favorite properties
  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      console.log("User ID:", userId);
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${API_BASE_URL}/api/favorites?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

 const deleteFavorite = async (propertyId) => {
   try {
     const token = localStorage.getItem("jwt");
     await axios.delete(
       `${API_BASE_URL}/api/favorites?userId=${userId}&propertyId=${propertyId}`,
       {
         headers: { Authorization: `Bearer ${token}` },
       }
     );
     toast.success("Removed from favorites!");

     // Reload the page
     window.location.reload();
   } catch (error) {
     console.error("Error deleting favorite:", error);
     toast.error("Failed to remove property!");
   }
 };


  return (
    <div className="p-16 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900  mb-6">
        Your Favorites
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            {/* Property Image */}
            <div className="relative group cursor-pointer">
              <img
                src={
                  favorite.property.frontImage
                    ? favorite.property.frontImage.replace(
                        "F:\\EstateSphere\\images\\",
                        `${API_BASE_URL}/images/view/`
                      )
                    : "https://via.placeholder.com/300"
                }
                alt={favorite.property.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() =>
                    navigate(`/buyer/property/${favorite.property.id}`)
                  }
                  className="text-white font-semibold px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
            {/* Property Details */}
            <div className="p-4">
              <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                {favorite.property.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {favorite.property.city}
              </p>
              <p className="font-bold text-blue-600 dark:text-blue-400 mt-2">
                ₹
                {new Intl.NumberFormat("en-IN").format(favorite.property.price)}
              </p>
            </div>
            {/* Delete Button */}
            <button
              onClick={() => deleteFavorite(favorite.property.id)}
              className="mt-auto flex items-center justify-center bg-red-500 text-white rounded-b-lg px-4 py-3 hover:bg-red-600 transition"
            >
              <FaTrashAlt className="mr-2" />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProperties;
