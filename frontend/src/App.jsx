import { React } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecommendPage from './pages/RecommendPage';



const App = () => {

	const PrivateRoute = ({ children }) => {
		const token = localStorage.getItem("access_token");
		if (token) { return children; }
		return <Navigate to="/login" replace />;
	};


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