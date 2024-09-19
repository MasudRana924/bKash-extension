import React from "react";
import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import Dashboard from "./../pages/dashboard/Dashboard";
import SearchTransactions from "./../pages/transactions/SearchTransactions";
import Login from "./../pages/auth/Login";
import Register from "./../pages/auth/Register";
import VerifyOtp from "./../pages/auth/VerifyOtp";
import NotifactionConfigure from "./../pages/configuration/NotifactionConfigure";
import PrivateRoute from "./PrivateRoute";
const AppRoutes = () => {
  const { token } = useSelector((state) => state.userDetails);
  console.log("token", token);
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/main"
        element={
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        }
      ></Route>
      <Route
        exact
        path="/search"
        element={
          <PrivateRoute>
            <SearchTransactions/>
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify/otp" element={<VerifyOtp />} />
      <Route path="/configure" element={<NotifactionConfigure />} />
    </Routes>
  );
};

export default AppRoutes;
