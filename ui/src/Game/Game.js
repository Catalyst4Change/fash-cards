import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card.js";
import GameOver from "../GameOver/GameOver.js";

const Game = ({
  cardsData,
  shuffle,
  saveCardForLater,
  gameOver,
  resetTimer,
}) => {
  const cardsFlipped = useRef(0);
  const correctGuesses = useRef(0);
  const incorrectGuesses = useRef(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  // const [carouselIndex, setCarouselIndex] = useState(0)

  const flipCard = () => {
    cardsFlipped.current = cardsFlipped.current + 1;
  };

  const addOneCorrect = () => {
    correctGuesses.current = correctGuesses.current + 1;
  };

  const addOneIncorrect = () => {
    incorrectGuesses.current = incorrectGuesses.current + 1;
  };

  const nextSlide = () => {
    setCarouselIndex(carouselIndex + 1);
  };

  const makeButtons = (currentSymbol) => {
    const answers = [];
    answers.push(currentSymbol);

    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * 200);
      if (!answers.includes(cardsData[random])) {
        answers.push(cardsData[random].symbol);
      }
    }

    shuffle(answers);
    return answers;
  };

  const cards = cardsData.map((card, index) => {
    const currentSymbol = card.symbol;

    const answerButtons = makeButtons(currentSymbol);

    return (
      <article
        className={`card-section column  ${
          index === carouselIndex ? "focus" : "hidden"
        }`}
        key={`card${index}`}
      >
        <Card
          card={card}
          cardNumber={index}
          answerButtons={answerButtons}
          flipCard={flipCard}
          addOneCorrect={addOneCorrect}
          addOneIncorrect={addOneIncorrect}
          saveCardForLater={saveCardForLater}
          nextSlide={nextSlide}
        />
      </article>
    );
  });

  return (
    <section className="carousel-container">
      <div className="carousel column">
        <div className="carousel-item column">
          {!gameOver && cards}
          {gameOver && (
            <GameOver
              cardsFlipped={cardsFlipped.current}
              correctGuesses={correctGuesses.current}
              resetTimer={resetTimer}
            />
          )}
        </div>
      </div>
    </section>
  );
};

Game.propTypes = {
  cardsData: PropTypes.array,
  shuffle: PropTypes.func,
  saveCardForLater: PropTypes.func,
  gameOver: PropTypes.bool,
  resetTimer: PropTypes.func,
};

export default Game;
