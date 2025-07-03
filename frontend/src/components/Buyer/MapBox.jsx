import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapBox = ({ latitude, longitude }) => {
  const lat = latitude; // Latitude of the center
  const lng = longitude; // Longitude of the center

  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([lat, lng], 14);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Marker for the current location
    L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();

    // Fetch nearby places using Overpass API (including gym, hospital, pharmacy, etc.)
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node[amenity=hospital](around:1000,${lat},${lng});node[amenity=gym](around:3000,${lat},${lng});node[amenity=pharmacy](around:1000,${lat},${lng});node[amenity=restaurant](around:2000,${lat},${lng});node[amenity=cafe](around:2000,${lat},${lng});node[amenity=atm](around:1500,${lat},${lng});node[amenity=bank](around:1500,${lat},${lng});node[amenity=school](around:2000,${lat},${lng});node[leisure=park](around:3000,${lat},${lng}););out;`;

    fetch(overpassUrl)
      .then((response) => response.json())
      .then((data) => {
        // Add markers for each place
        data.elements.forEach((element) => {
          const { lat, lon, tags } = element;

          // Customize marker color and icon based on the type
          let icon;
          if (tags.amenity === "hospital") icon = "✙"; // Hospital icon
          else if (tags.amenity === "gym") icon = "🏋️"; // Gym icon
          else if (tags.amenity === "pharmacy") icon = "💊"; // Pharmacy icon
          else if (tags.amenity === "restaurant")
            icon = "👨‍🍳"; // Restaurant icon
          else if (tags.amenity === "cafe") icon = "🍔"; // Cafe icon
          else if (tags.amenity === "atm") icon = "💳"; // ATM icon
          else if (tags.amenity === "bank") icon = "🏦"; // Bank icon
          else if (tags.amenity === "school") icon = "🏫"; // School icon
          else if (tags.leisure === "park") icon = "🌳"; // Park icon
          else icon = "❓"; // Unknown type icon

          // Create a custom Leaflet icon with text (icon emoji)
          const customIcon = L.divIcon({
            className: "custom-icon",
            html: `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: ${
        tags.amenity === "hospital"
          ? "#7abaff" // Lighter blue for hospital
          : tags.amenity === "gym"
          ? "#ffbc75" // Lighter orange for gym
          : tags.amenity === "pharmacy"
          ? "#a7e5a1" // Lighter green for pharmacy
          : tags.amenity === "restaurant"
          ? "#f7a6a1" // Lighter red for restaurant
          : tags.amenity === "cafe"
          ? "#ffeb66" // Lighter yellow for cafe
          : tags.amenity === "atm"
          ? "#5cc0d1" // Lighter blue for ATM
          : tags.amenity === "bank"
          ? "#8db7db" // Lighter blue for bank
          : tags.amenity === "school"
          ? "#a387f2" // Lighter purple for school
          : tags.leisure === "park"
          ? "#a1e4b7" // Lighter green for park
          : "#b2b2b2" // Default gray for unknown types
      };
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      line-height: 1;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease; /* Smooth transition */
    ">
      ${icon}
    </div>
  `,
          });

          // Add marker to the map with a popup
          L.marker([lat, lon], { icon: customIcon })
            .addTo(map)
            .bindPopup(
              `<b>${tags.name || "Unknown Place"}</b><br>Type: ${tags.amenity}`
            );
        });
      })
      .catch((error) => {
        console.error("Error fetching data from Overpass API:", error);
      });

    // Cleanup map on component unmount
    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return (
    <div>
      <h2 className="text-indigo-600 text-xl p-2 bg-gray-100 font-bold font-serif">
        Nearby Places Map
      </h2>
      <div
        id="map"
        style={{ height: "300px", width: "100%", border: "1px solid #ccc" }}
      ></div>
    </div>
  );
};

export default MapBox;
