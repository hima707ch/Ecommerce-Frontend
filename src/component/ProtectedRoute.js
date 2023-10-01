import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Routes>
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Redirect to="/login" />;
              }

              if (isAdmin === true && user.role !== "admin") {
                return <Redirect to="/login" />;
              }

              return <Component {...props} />;
            }}
          />
        </Routes>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
