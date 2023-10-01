import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { React, useEffect, useState } from "react";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./styles.css";

import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/product/ProductDetails.jsx";
import Product from "./component/product/Products.jsx";
import Search from "./component/product/Search.jsx";
import Login from "./component/user/Login";

import { getProducts } from "./action/productAction";

import { useDispatch, useSelector } from "react-redux";
import store from "./store";
import { loadUser, logout } from "./action/userAction";

import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/user/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Payment from "./component/cart/Payment";
import OrderSuccess from "./component/cart/OrderSucess";
import MyOrders from "./component/order/MyOrder";
import OrderDetails from "./component/order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UserList";
import UpdateUser from "./component/admin/UpdateUser";
import NewProduct from "./component/admin/NewProduct";

export default function App() {
  const { isAuthenticated, user } = useSelector((s) => s.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "https://n8wktq-8080.csb.app/api/v1/stripeapikey"
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {console.log("isauth", isAuthenticated, "user", user)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <ProtectedRoute path="/account" element={<Profile />} />
        <ProtectedRoute path="/me/update" element={<UpdateProfile />} />
        <ProtectedRoute path="/password/update" element={<UpdatePassword />} />
        <ProtectedRoute path="/shipping" element={<Shipping />} />
        <ProtectedRoute path="/orders" element={<MyOrders />} />
        <ProtectedRoute path="/order/:id" element={<OrderDetails />} />
        <ProtectedRoute
          exact
          path="/order/confirm"
          element={<ConfirmOrder />}
        />
        <ProtectedRoute path="/sucess" element={<OrderSuccess />} />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/process/payment" element={<Payment />} />
          </Elements>
        )}

        {/* Admin */}
        <ProtectedRoute
          isAdmin={true}
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <ProtectedRoute
          isAdmin={true}
          path="/admin/products"
          element={<ProductList />}
        />

        <ProtectedRoute
          isAdmin={true}
          path="/admin/orders"
          element={<OrderList />}
        />

        <ProtectedRoute
          isAdmin={true}
          path="/admin/order/:id"
          element={<ProcessOrder />}
        />

        <ProtectedRoute
          isAdmin={true}
          path="/admin/users"
          element={<UsersList />}
        />

        <ProtectedRoute
          isAdmin={true}
          path="/admin/user/:id"
          element={<UpdateUser />}
        />

        <ProtectedRoute
          isAdmin={true}
          path="/admin/product"
          element={<NewProduct />}
        />

        <Footer />
      </Router>
    </div>
  );
}
