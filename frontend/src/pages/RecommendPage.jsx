import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import RecomCard from '../components/RecomCard';
import { useNavigate } from 'react-router-dom';

const RecommendPage = () => {
	const [recom_cards, setRcomCards] = useState([]);
	const navigate = useNavigate();

	const handleBackToLanding = () => {
		navigate('/');
	};

	// fetch all the recommendations once as soon as the page loads
	useEffect(() => {
		const fetchRecomendations = async () => {
			const resp = await fetch('http://localhost:4000/recommend', {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("access_token")
				},
			});
			if (!resp.ok) {
				// most likely the token expired or was not valid
				navigate("/login", { replace: true })
			}
			const recomData = await resp.json();
			setRcomCards(recomData.data);
			console.log(recomData);
		}
		fetchRecomendations();
	}, [])

	return (
		<div>
			<Header isRecommend={false}>
				<button
					onClick={handleBackToLanding}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Back to Landing
				</button>
			</Header>
			<div className="container mx-auto py-8 mt-[100px]">
				<h4 className="text-4xl font-bold mb-10 text-center">Recommendations For You</h4>
				<div className='flex gap-10 flex-wrap'>
					{
						recom_cards.map((card, index) => (
							<div key={index} className="mb-8 w-full max-w-md">
								<RecomCard data={card} />
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default RecommendPage;