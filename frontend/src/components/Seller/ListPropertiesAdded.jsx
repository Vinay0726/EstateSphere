import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Pagination,
  InputAdornment,
} from "@mui/material";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/apiConfig";
import { AiOutlinePlus } from "react-icons/ai";

const ListPropertiesAdded = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/properties/seller`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        setProperties(response.data);
        console.log("property data ",response.data);
        setFilteredProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        toast.error("No token found. Please log in.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/api/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setProperties((prev) =>
        prev.filter((property) => property.id !== propertyId)
      );
      setFilteredProperties((prev) =>
        prev.filter((property) => property.id !== propertyId)
      );
      toast.success("Property deleted successfully!");
    } catch (err) {
      console.error("Error deleting property:", err);
      toast.error("Failed to delete property. Please try again.");
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(
        (property) =>
          property.name.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query)
      );
      setFilteredProperties(filtered);
    }
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  return (
    <Box className="p-4  min-h-screen">
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        gutterBottom
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <AiOutlinePlus style={{ marginRight: "8px" }} />{" "}
        {/* Add icon with styling */}
        Properties Added
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" align="center" color="error">
          {error}
        </Typography>
      ) : (
        <>
          <Box my={3} display="flex" justifyContent="center">
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch color="gray" />
                  </InputAdornment>
                ),
              }}
              style={{ width: "300px" }}
            />
          </Box>

          {filteredProperties.length > 0 ? (
            <>
              <Grid container spacing={2}>
                {currentProperties.map((property) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                    <Card className="shadow-sm" style={{ borderRadius: "8px" }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          property.frontImage       
                        }
                        className="h-60"
                        alt={property.name}
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/300?text=No+Image")
                        }
                      />
                      <CardContent style={{ padding: "8px" }}>
                        <Typography variant="body1" fontWeight="bold" noWrap>
                          {property.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          noWrap
                        >
                          {property.location}, {property.city}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {property.noOfBhk} BHK • {property.areaSize} sq. ft.
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" mt={1}>
                          ₹ {property.price.toLocaleString()}
                        </Typography>
                        <Box mt={1} textAlign="center">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(property.id)}
                          >
                            <FaTrash />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(
                    filteredProperties.length / propertiesPerPage
                  )}
                  page={currentPage}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Box>
            </>
          ) : (
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              mt={4}
            >
              No properties found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ListPropertiesAdded;
