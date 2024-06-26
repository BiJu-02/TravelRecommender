import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Header = ({ onRecommend, isRecommend }) => {
	const navigate = useNavigate();


	const handleLogout = async () => {
		await logout();
		navigate('/login');
	};

	const handleRecommend = () => {
		// call function from homepage
		onRecommend();
		navigate('/recommend');
	};

	const handleBack = () => {
		navigate("/");
	}

	return (
		<nav className="bg-gray-800 text-white py-4 fixed top-0 left-0 w-full z-10">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">Travel Buddy</h1>
				<nav>
					{isRecommend &&
						<button
							onClick={handleRecommend}
							className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
						>
							Recommend
						</button>
					}
					{!isRecommend &&
						<button
							onClick={handleBack}
							className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
						>
							Preferences
						</button>
					}
					<button
						onClick={handleLogout}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
					>
						Logout
					</button>
				</nav>
			</div>
		</nav>
	);
};

export default Header;