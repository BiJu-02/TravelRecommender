import {React, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecommendPage from './pages/RecommendPage';



const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      setLoading(false);
    }
  }, []);
  const PrivateRoute = ({ children }) => {
    console.log("is logged in(state)", isLoggedIn);
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  if (loading) { // Show a loading indicator or return null while checking auth
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/recommend"
          element={
            <PrivateRoute>
              <RecommendPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;