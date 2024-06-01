import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import "./TinderCards.css";

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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'people'), (snapshot) => {
      setPeople(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("Removing: " + nameToDelete);
    setPeople(people => people.filter(person => person.name !== nameToDelete));
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div>
      <h1>Swipe-Squad</h1>
      <div className="tinderCards_cardContainer">
        {people.map((person, index) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
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
    </div>
  );
}

export default TinderCards;
