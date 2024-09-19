import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.userDetails);
  console.log("token",token);
  
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
