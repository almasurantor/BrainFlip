import { useState } from "react";
import "../App.css";

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <h2>{flipped ? answer : question}</h2>
    </div>
  );
}

export default Flashcard;
