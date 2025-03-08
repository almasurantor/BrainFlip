import { useState } from "react";
import Flashcard from "./Flashcard";
import { flashcards } from "../data/flashcards";

function FlashcardContainer() {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex(Math.floor(Math.random() * flashcards.length));
  };

  return (
    <div className="container">
      <Flashcard {...flashcards[index]} />
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default FlashcardContainer;
