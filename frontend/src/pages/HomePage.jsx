import React from 'react';
import Header from '../components/Header';
import Card from '../components/InputCard';

const HomePage = () => {
  const cards = [
    {
      title: 'Card 1',
      description: 'This is a card description.',
    },
    {
      title: 'Card 2',
      description: 'Another card description.',
    },
    // Add more cards as needed
  ];

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 flex flex-col items-center">
        {cards.map((card, index) => (
          <div key={index} className="mb-8 w-full max-w-md">
            <Card title={card.title} description={card.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;