import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import "./TinderCards.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxPHjSUhbPYJVKwh35lsgPU3ea4QDtt54",
  authDomain: "study-buddy-4d493.firebaseapp.com",
  projectId: "study-buddy-4d493",
  storageBucket: "study-buddy-4d493.appspot.com",
  messagingSenderId: "608775470734",
  appId: "1:608775470734:web:9fd95e23472c52ff8f53df",
  measurementId: "G-KQ63CF5WEL"
};

// Initialize Firebase and get the Firestore instance
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function TinderCards() {
  const [people, setPeople] = useState([]);
  const [swipedRight, setSwipedRight] = useState([]);
  const [swipedLeft, setSwipedLeft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [additionalPlayers, setAdditionalPlayers] = useState([]);
  const [swipeCount, setSwipeCount] = useState(0);
  const [pairs, setPairs] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'people'), (snapshot) => {
      const allPeople = snapshot.docs.map(doc => doc.data());

      const positions = {
        CB: 2,
        LB: 1,
        RB: 1,
        CM: 3,
        LW: 1,
        RW: 1,
        ST: 1,
        GK: 1
      };
      const positionGroups = {
        CB: [],
        LB: [],
        RB: [],
        CM: [],
        LW: [],
        RW: [],
        ST: [],
        GK: []
      };

      allPeople.forEach(person => {
        const pos = person.pos;
        if (positionGroups[pos]) {
          positionGroups[pos].push(person);
        }
      });

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const selectedPlayers = [];
      const usedPlayers = new Set();
      const playerPairs = {};

      for (const [pos, count] of Object.entries(positions)) {
        let shuffledPlayers = shuffleArray(positionGroups[pos]);
        shuffledPlayers = shuffledPlayers.filter(player => !usedPlayers.has(player.name));
        const playersToAdd = shuffledPlayers.slice(0, count);

        if (playersToAdd.length > 1) {
          playerPairs[playersToAdd[0].name] = playersToAdd[1].name;
        }

        playersToAdd.forEach(player => usedPlayers.add(player.name));
        selectedPlayers.push(...playersToAdd);
      }

      setPairs(playerPairs);
      setPeople(selectedPlayers);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const swiped = (direction, nameToDelete) => {
    if (direction === 'right') {
      const rightPerson = people.find(person => person.name === nameToDelete);
      if (rightPerson) {
        setSwipedRight(swipedRight => [...swipedRight, rightPerson]);
      }
    } else if (direction === 'left') {
      const leftPerson = people.find(person => person.name === nameToDelete);
      if (leftPerson) {
        setSwipedLeft(swipedLeft => [...swipedLeft, leftPerson]);

        
        const pairedPlayerName = pairs[nameToDelete];
        if (pairedPlayerName) {
          const pairedPlayer = people.find(person => person.name === pairedPlayerName);
          if (pairedPlayer) {
            setSwipedRight(swipedRight => [...swipedRight, pairedPlayer]);
          }
        }
      }
    }

    setPeople(people => people.filter(person => person.name !== nameToDelete));
    setSwipeCount(swipeCount + 1); 

    // Show results after 11 swipes
    if (swipeCount + 1 >= 11) {
      findAdditionalPlayers();
      setShowResults(true);
    }
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  //Fix the findadditional players
  
  const findAdditionalPlayers = () => {
    // Collect positions of players swiped left
    const swipedLeftPositions = new Set(swipedLeft.map(person => person.pos));
    console.log("Swiped Left Positions: ", Array.from(swipedLeftPositions).join(", "));
    const swipedRightNames = new Set(swipedRight.map(person => person.name));
    console.log("Swiped Right Names: ", Array.from(swipedRightNames).join(", "));
    const potentialAdditionalPlayers = people.filter(player => 
      !swipedRightNames.has(player.name) && swipedLeftPositions.has(player.pos)
    );
    console.log("Potential Additional Players: ", potentialAdditionalPlayers.map(p => `${p.name} (${p.pos})`).join(", "));
    const selectRandomPlayers = (players, count) => {
      const shuffled = players.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    const numAdditionalPlayers = 3;
    const additionalPlayers = selectRandomPlayers(potentialAdditionalPlayers, numAdditionalPlayers);
  
    console.log("Additional Players Found: ", additionalPlayers.map(p => `${p.name} (${p.pos})`).join(", "));
    setAdditionalPlayers(additionalPlayers);
  };
  
  
  
  
  return (
    <div>
      <h1>Swipe-Squad</h1>
      {loading ? (
        <p>Loading...</p>
      ) : showResults ? (
        <div>
          <h2>Final Team:</h2>
          <ul>
            {swipedRight.map(person => (
              <li key={person.name}>{person.name}</li>
            ))}
          </ul>
          <h2>Additional Players:</h2>
          <ul>
            {additionalPlayers.length > 0 ? (
              additionalPlayers.map(person => (
                <li key={person.name}>{person.name}</li>
              ))
            ) : (
              <h4>Are we playing a match? Because it feels like we’re in perfect formation?</h4>
            )}
          </ul>
          <p>Trash: {Array.from(new Set(swipedLeft.map(person => person.name))).join(", ")}</p>
          <p>Keepers: {Array.from(new Set(swipedRight.map(person => person.name))).join(", ")}</p>
        </div>
      ) : (
        <div className="tinderCards_cardContainer">
          {people.map((person) => (
            <TinderCard
              className="swipe"
              key={person.name}
              preventSwipe={['up', 'down']}
              onSwipe={(dir) => swiped(dir, person.name)}
              onCardLeftScreen={() => outOfFrame(person.name)}
              flickOnSwipe={true}
              swipeThreshold={0.1}
            >
              <div
                className="card"
                style={{ backgroundImage: `url(${person.url})` }}
              >
                <h3>{person.name}</h3>
                <h1>{person.pos}</h1>
              </div>
            </TinderCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default TinderCards;

