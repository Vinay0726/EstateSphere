import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { API_BASE_URL } from "../../config/apiConfig";

const QRScanner = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
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
        console.log("response data", response.data);
        setProperty(response.data);
      } catch (err) {
        setError("Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!property) {
    return <div>No property details available</div>;
  }

  return (
    <div className="container p-6 flex flex-col justify-center items-center">
      <h3 className="mb-2 text-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
        Scan QR Code
      </h3>

      <div id="qr-code">
        <QRCode
          size={350}
          value={`Property Name: ${property.name}
Seller Name: ${property.seller.firstName} ${property.seller.lastName}
Seller Email: ${property.seller.email}
Property Type: ${property.propertyType}
Transaction Type: ${property.transactionType}
Location: ${property.city}
Address: ${property.address}
Area Size: ${property.areaSize} sqft
No. of BHK: ${property.noOfBhk}
Price: Rs ${property.price}
Amenities: ${property.amenities.join(", ")}
Description: ${property.description}
`}
        />
      </div>
    </div>
  );
};

export default QRScanner;
