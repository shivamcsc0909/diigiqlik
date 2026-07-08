import React from 'react';
import Card from './Card';

const CardSection = ({ cards }) => {
  return (
    <div className="portfolio-grid-4">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default CardSection;
