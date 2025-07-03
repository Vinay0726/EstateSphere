import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Store/State/SellerAuth/Action";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { CheckCircle, Cancel, Payment } from "@mui/icons-material";

const PaymentHistory = () => {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([]);

  const id = auth?.user?.id;

  // Fetch user details on mount
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  // Fetch payment history when the component mounts or jwt changes
  useEffect(() => {
    if (id && jwt) {
      axios
        .get(`${API_BASE_URL}/api/payments/seller/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          setPayments(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the payment history:",
            error
          );
        });
    }
  }, [id, jwt]);

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#37474f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1, // Adds spacing between the icon and the text
        }}
      >
        <Payment sx={{ fontSize: "2rem", color: "#009688" }} /> {/* Icon */}
        Payment History
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eceff1" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Customer Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Currency
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Payment Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} hover>
                <TableCell align="center">{payment.id}</TableCell>
                <TableCell align="center">{payment.customerName}</TableCell>
                <TableCell align="center">{payment.amount}</TableCell>
                <TableCell align="center">
                  {payment.currency.toUpperCase()}
                </TableCell>
                <TableCell align="center">
                  {payment.paymentStatus === "Successful" ? (
                    <Chip
                      icon={<CheckCircle style={{ color: "green" }} />}
                      label="Success"
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      icon={<Cancel style={{ color: "red" }} />}
                      label="Failed"
                      color="error"
                      variant="outlined"
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  {new Date(payment.paymentDate).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {payments.length === 0 && (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", my: 4 }}
          >
            No payment history found.
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
};

export default PaymentHistory;
