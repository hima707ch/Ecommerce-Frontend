import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element, path }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect( ()=>{
    if (isAuthenticated === false) {navigate("/login"); return;}

    if (isAdmin === true &&  user.role !== "admin") {
              navigate("/login")
    }
  } , [user] )

  return (
    <Fragment>
      {loading === false && (
        <Routes>
          <Route
            path = {path}
            element = {isAuthenticated ? element : (<Navigate to="/login" replace = {true} />)}
          />
        </Routes>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
