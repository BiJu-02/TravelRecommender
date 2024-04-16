import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InputCard from '../components/InputCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	// Initialize the cards state with the initial cards array
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();

	const get_user_prefs = async () => {
		const resp = await fetch("http://localhost:4000/get-prefs", {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("access_token")
			}
		})
		if (!resp.ok) {
			navigate("/login", { replace: true });
		}
		const respJson = await resp.json();
		// setCards(data)
		console.log(respJson.data);
		setCards(respJson.data);
	}

	const update_user_prefs = async () => {
		console.log("update_prefs called", cards);
		try {
			const resp = await fetch("http://localhost:4000/update-prefs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("access_token")
				},
				body: JSON.stringify({prefs: cards})
			});
			if (!resp.ok) {
				navigate("/login", { replace: true });
				console.log("response not ok for adding prefs");
			}
		} catch (err) {
			console.error("errored while adding preferences")
		}
	}

	useEffect(() => {
		try {
			get_user_prefs();
		} catch (err) {
			console.error("errored while getting user preference");
		}
	}, []);

	// Function to add a new card
	const addCard = () => {
		const newCard = {
			destination_name: '',
			destination_type: [],
			activities: []
		};
		setCards([...cards, newCard]); // Add the new card to the existing cards array
	};

	const removeCard = (index) => {
		// update destination data in homepage here

		const newCards = cards.filter((card, cardIndex) => cardIndex !== index);
		setCards(newCards);
	};

	const updateDestName = (index, newName) => {
		const newCards = [...cards];
		newCards[index].destination_name = newName;
		setCards(newCards);

	}

	const updateDestType = (index, newTypes) => {
		const newCards = [...cards];
		newCards[index].destination_type = newTypes;
		setCards(newCards);
	}

	const updateActivities = (index, newActivities) => {
		const newCards = [...cards];
		newCards[index].activities = newActivities;
		setCards(newCards);
	}

	return (
		<div>
			<Header onRecommend={update_user_prefs} isRecommend={true} />
			<div className="container mx-auto py-8 flex flex-col items-center mt-[100px]">
				{cards?.map((card, index) => (
					<div key={index} className="mb-8 w-full max-w-md z-0">
						<InputCard destinationName={card.destination_name} destinationType={card.destination_type} activities={card.activities} currentIdx={index} updateFuncs={[updateDestName, updateDestType, updateActivities]} onDelete={() => removeCard(index)} />
					</div>
				))}
				<button
					className="mt-4 w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={addCard}
				>
					Add Destinations
				</button>
			</div>
		</div>
	);
};

export default HomePage;
