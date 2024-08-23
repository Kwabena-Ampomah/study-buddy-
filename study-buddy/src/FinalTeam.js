import React from 'react';
import './FinalTeam.css'; // Create this CSS file for styling

const FinalTeam = ({ swipedRight }) => {
  return (
    <div className="finalTeam">
      <h2>Your Final Team:</h2>
      {swipedRight.length > 0 ? (
        <div className="teamGrid">
          {swipedRight.map((person) => (
            <div key={person.name} className="teamMember">
              <img src={person.url} alt={person.name} />
              <h3>{person.name}</h3>
              <p>{person.pos}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No players selected.</p>
      )}
    </div>
  );
};

export default FinalTeam;
