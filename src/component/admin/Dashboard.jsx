import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart,
  PointElement,
  ArcElement,
  LineElement,
  CategoryScale,
  BarElement,
  LinearScale
} from "chart.js";

import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../action/productAction";
import { getAllOrders } from "../../action/orderAction.js";
import { getAllUsers } from "../../action/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(BarElement);
  Chart.register(PointElement);
  Chart.register(LineElement);
  Chart.register(ArcElement);

  const dispatch = useDispatch();

  const statePro = useSelector((state) => state.product);

  const stateOrder = useSelector((state) => state.allOrders);
  console.log("from dashboard", statePro);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  const { products, loading } = statePro;
  const { orders } = stateOrder;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    console.log("useEff called");
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: ["red", "blue", "yellow"]
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount]
      }
    ]
  };

  let doughnutState;
  if (products) {
    doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products.length - outOfStock]
        }
      ]
    };
  }
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          {products && doughnutState && <Doughnut data={doughnutState} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
