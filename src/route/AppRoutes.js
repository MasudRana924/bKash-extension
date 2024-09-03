import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotifactionConfigure from "../pages/configuration/NotifactionConfigure";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Dashboard from "../pages/dashboard/Dashboard";
import RecentTransaction from "../pages/transactions/RecentTransaction";
import SearchTransactions from "../pages/transactions/SearchTransactions";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify/otp" element={<VerifyOtp />} />

      {/* Protected routes using PrivateRoute */}
      <Route path="/*" element={<PrivateRoute> 
          <Routes>
            <Route path="/main/*" element={<Dashboard />}>
              <Route index element={<RecentTransaction />} />
              <Route path="recent" element={<RecentTransaction />} />
              <Route path="search" element={<SearchTransactions />} />
            </Route>
            <Route path="/configure" element={<NotifactionConfigure />} />
          </Routes>
        </PrivateRoute>} 
      />
      
      {/* Fallback to login if no route matches */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;












// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import NotifactionConfigure from "./../components/configure/NotifactionConfigure";
// import Login from "./../components/auth/Login";
// import Register from "./../components/auth/Register";
// import VerifyOtp from "./../components/auth/VerifyOtp";
// import Dashboard from "./../components/dashboard/Dashboard";
// import RecentTransaction from "../components/transactions/RecentTransaction";
// import SearchTransactions from "../components/transactions/SearchTransactions";
// import { useSelector } from "react-redux";
// const AppRoutes = () => {
//   const { token } = useSelector(
//     (state) => state.userDetails
// );
//   return (
//     <Routes>
      
//         {
//           token ? (<>
//           <Route path="/main/*" element={<Dashboard />}>
//           <Route index element={<RecentTransaction />} />
//           <Route path="recent" element={<RecentTransaction />} />
//           <Route path="search" element={<SearchTransactions />} />
//         </Route></>):(
//                 <Route path="/*" element={<Navigate to="/login" />} />
//               )
//         }
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/verify/otp" element={<VerifyOtp />} />
//       <Route path="/configure" element={<NotifactionConfigure />} />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
