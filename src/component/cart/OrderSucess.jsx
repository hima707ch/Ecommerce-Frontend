import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../action/orderAction";

const OrderSuccess = () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
console.log(sessionId);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  async function getSession() {
    const { data } = await axios.post(
      "/api/v1/payment/session",
      {
        sessionId: sessionId
      }
    );

    console.log("cartItems",cartItems);
    if (data.payment_status === "paid") {
      const order = {
        shippingInfo,
        itemInfo: cartItems,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shippingCharges,
        totalPrice: totalPrice
      };

      order.paymentInfo = {
        id: data.payment_intent,
        status: data.payment_status
      };

      console.log("order",order);

      dispatch(createOrder(order));
    }
  }

  useEffect(() => {
    getSession();
    console.log("ram from order success")
  }, []);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
