import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { getUser } from "../../Store/State/SellerAuth/Action";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Grid,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { CloudUpload } from "@mui/icons-material";

import { toast } from "react-toastify";

const AddProperties = () => {
  const [formData, setFormData] = useState({
    name: "",
    propertyType: "",
    transactionType: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    areaSize: "",
    noOfBhk: "",
    price: "",
    description: "",
    amenities: [],
    sellerId: "",
    frontImage: null,
    bedImage: null,
    hallImage: null,
    kitchenImage: null,
  });
  // const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sellerId: auth.user.id,
      }));
    }
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const updatedAmenities = checked
        ? [...prevFormData.amenities, value]
        : prevFormData.amenities.filter((amenity) => amenity !== value);
      return { ...prevFormData, amenities: updatedAmenities };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        toast.error("You must be logged in to add a property.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/properties/addProperty`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      toast.success("Property added successfully!");

      if (response && response.status === 200) {
        setFormData({
          name: "",
          propertyType: "",
          transactionType: "",
          city: "",
          address: "",
          latitude: "",
          longitude: "",
          areaSize: "",
          noOfBhk: "",
          price: "",
          description: "",
          amenities: [],
          sellerId: auth.user.id,
          frontImage: null,
          bedImage: null,
          hallImage: null,
          kitchenImage: null,
        });
      }
    } catch (err) {
      console.error("Error adding property:", err);
      toast.error("Error adding property!");
    }
    
  };

  return (
    <div className="p-5">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 border rounded-md shadow-lg bg-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Property
        </h2>

        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {/* Property Type */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <MenuItem value="Flat">Flat</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Plot">Plot</MenuItem>
                <MenuItem value="PG">PG</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Transaction Type */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                required
              >
                <MenuItem value="Sell">Sell</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="PG">PG</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* City */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <MenuItem value="Nagpur">Nagpur</MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Amravati">Amravati</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              required
            />
          </Grid>
          {/* Location */}
          <Grid item xs={6}>
            <TextField
              label="Latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              fullWidth
              required
            />{" "}
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {/* Area Size */}
          <Grid item xs={6}>
            <TextField
              label="Area Size (in sqft)"
              type="number"
              name="areaSize"
              value={formData.areaSize}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {/* Number of BHK */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Number of BHK</InputLabel>
              <Select
                name="noOfBhk"
                value={formData.noOfBhk}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">1 BHK</MenuItem>
                <MenuItem value="2">2 BHK</MenuItem>
                <MenuItem value="3">3 BHK</MenuItem>
                <MenuItem value="4">4 BHK</MenuItem>
                <MenuItem value="N/A">N/A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Price */}
          <Grid item xs={6}>
            <TextField
              label="Price (in INR)"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
            />
          </Grid>
          {/* Amenities */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <label className="block font-medium mb-2">Amenities</label>
              <FormGroup row>
                {[
                  "Gym",
                  "Parking",
                  "Playground",
                  "24/7 Water",
                  "24/7 Electricity Supply",
                  "24/7 Wi-Fi",
                  "24/7 CCTV",
                ].map((amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        value={amenity}
                        onChange={handleCheckboxChange}
                        checked={formData.amenities.includes(amenity)}
                        icon={
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              border: "2px solid #ccc",
                              background: "#fff",
                            }}
                          />
                        }
                        checkedIcon={
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: "#4caf50",
                              color: "#fff",
                            }}
                          >
                            ✓
                          </span>
                        }
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          color: formData.amenities.includes(amenity)
                            ? "#4caf50"
                            : "#000",
                        }}
                      >
                        {amenity}
                      </span>
                    }
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
          {/* File Uploads */}
          <Grid container spacing={3}>
            {[
              { label: "Front Image", name: "frontImage" },
              { label: "Bed Image", name: "bedImage" },
              { label: "Hall Image", name: "hallImage" },
              { label: "Kitchen Image", name: "kitchenImage" },
            ].map((file, index) => (
              <Grid item xs={6} key={index}>
                <div className="flex flex-col  items-center mt-6 ml-6">
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    color="default"
                    className="flex justify-center items-center gap-4"
                  >
                    <CloudUpload />
                    <span>Upload {file.label}</span>
                    <input
                      type="file"
                      name={file.name}
                      onChange={(e) => handleFileChange(e, file.name)}
                      hidden
                    />
                  </Button>
                  {formData[file.name] && (
                    <div className="text-sm text-gray-600 mt-1">
                      <strong>Selected file:</strong> {formData[file.name].name}
                    </div>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <div className="mt-6 flex justify-center">
          <Button
            type="submit"
            color="success"
            variant="contained"
            className="px-8"
          >
            Add Property
          </Button>
        </div>
        {/* {successMessage && (
          <div className="mt-4 flex justify-center">
            <Alert
              severity="success"
              className="max-w-md w-full shadow-lg"
              style={{ borderRadius: "8px" }}
            >
              <AlertTitle>Success</AlertTitle>
              {successMessage}
            </Alert>
          </div>
        )} */}
      </form>
    </div>
  );
};

export default AddProperties;
