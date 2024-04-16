import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InputCard from '../components/InputCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	// The cards state contains all the users travel destination preferences
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();

	// called only once from within use effect for loading user's already filled data in home page 
	const get_user_prefs = async () => {
		const resp = await fetch("http://localhost:4000/get-prefs", {
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("access_token")
			}
		})
		if (!resp.ok) {
			// most likely the token expired or was not valid
			navigate("/login", { replace: true });
		}
		const respJson = await resp.json();
		setCards(respJson.data);
	}

	// called right before going to the recommend page to save all the user's preferences
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
				// most likely the token expired or was not valid
				navigate("/login", { replace: true });
			}
		} catch (err) {
			console.error("errored while adding preferences")
		}
	}

	// called when the page loads 1st time to get all the user's preferences 
	// that user already filled out
	// and show them in cards
	useEffect(() => {
		try {
			get_user_prefs();
		} catch (err) {
			console.error("errored while getting user preference");
		}
	}, []);

	// all the functions for editing cards below are sent to InputCard component
	// which sends all of them to respective input type components (DestinaionInput and TagInput)

	// Function to add a new empty card
	const addCard = () => {
		const newCard = {
			destination_name: '',
			destination_type: [],
			activities: []
		};
		setCards([...cards, newCard]); // Add the new card to the existing cards array
	};

	const removeCard = (index) => {
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
