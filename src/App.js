import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { React, useEffect } from "react";

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
import { loadUser } from "./action/userAction";

import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/user/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";

export default function App() {
  const { isAuthenticated, user } = useSelector((s) => s.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated /* isAuth */ && <UserOptions user={user} />}
        {console.log("isauth", isAuthenticated, "user", user)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ProtectedRoute path="/account" element={<Profile />} />
        <ProtectedRoute path="/me/update" element={<UpdateProfile />} />

        <Footer />
      </Router>
    </div>
  );
}
