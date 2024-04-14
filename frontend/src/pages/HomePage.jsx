import React, { useState } from 'react';
import Header from '../components/Header';
import InputCard from '../components/InputCard';

const HomePage = () => {
  // Initialize the cards state with the initial cards array
  const [cards, setCards] = useState([
    {
      title: 'Card 1',
      description: 'This is a card description.',
    },
    {
      title: 'Card 2',
      description: 'Another card description.',
    },
    // Initialize with more cards if necessary
  ]);

  // Function to add a new card
  const addCard = () => {
    const newCard = {
      title: '',
      description: '',
    };
    setCards([...cards, newCard]); // Add the new card to the existing cards array
  };

  const removeCard = (index) => {
    const newCards = cards.filter((card, cardIndex) => cardIndex !== index);
    setCards(newCards);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 flex flex-col items-center">
        {cards.map((card, index) => (
          <div key={index} className="mb-8 w-full max-w-md">
            <InputCard title={card.title} description={card.description} onDelete={() => removeCard(index)} />
          </div>
        ))}
        <button
          className="mt-4 w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addCard}
        >
          Add Card
        </button>
      </div>
    </div>
  );
};

export default HomePage;
