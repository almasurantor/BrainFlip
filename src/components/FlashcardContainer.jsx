import { useState } from "react";
import Flashcard from "./Flashcard";
import { flashcards } from "../data/flashcards";

function FlashcardContainer() {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [cardOrder, setCardOrder] = useState(flashcards.map((_, idx) => idx));

  const currentCard = flashcards[cardOrder[index]];

  const handleAnswerSubmit = () => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentCard.answer.trim().toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setFeedback("✅ Correct!");
      setScore(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setFeedback("❌ Incorrect. Try again!");
      setStreak(0);
    }

    setUserAnswer("");
  };

  const nextCard = () => {
    if (index < cardOrder.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
    resetFeedback();
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(cardOrder.length - 1);
    }
    resetFeedback();
  };

  const shuffleCards = () => {
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setIndex(0);
    resetFeedback();
  };

  const resetFeedback = () => {
    setFeedback("");
    setUserAnswer("");
  };

  return (
    <div className="container">
      <Flashcard {...currentCard} />
      <div className="controls">
        <button onClick={prevCard}>⬅️ Back</button>
        <button onClick={nextCard}>➡️ Next</button>
        <button onClick={shuffleCards}>🔀 Shuffle</button>
      </div>

      <div className="input-area">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer..."
        />
        <button onClick={handleAnswerSubmit}>Submit</button>
      </div>

      <div className="feedback">{feedback}</div>

      <div className="scoreboard">
        <p>Score: {score}</p>
        <p>Current Streak: {streak}</p>
        <p>Longest Streak: {maxStreak}</p>
      </div>
    </div>
  );
}

export default FlashcardContainer;
