import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../action/orderAction";

const OrderSuccess = () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

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
      "https://n8wktq-8080.csb.app/api/v1/payment/session",
      {
        sessionId: sessionId
      }
    );

    console.log(data);
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

      console.log(order);

      dispatch(createOrder(order));
    }
  }

  useEffect(() => {
    getSession();
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
