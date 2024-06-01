import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css"


function TinderCards() {
  const [people, setPeople] = useState([
    {
      name: 'bradley',
      url: `/images/mbape.png`
    },
    {
      name: "ivan",
      url: `${process.env.PUBLIC_URL}/images/mbape.png`
    }
  ]);

  return (
    <div>
      <h1>Tinder Cards</h1>
      {people.map(person => (
        <TinderCard
          className="swipe"
          key={person.name}
          preventSwipe={['up','down']}

        >
          <div 
            className="card" 
            style={{ backgroundImage: `url(${person.url})` }}
          >
            <h3>{person.name}</h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}

export default TinderCards;
