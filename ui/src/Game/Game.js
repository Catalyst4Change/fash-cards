import React, {useRef, useState} from "react";
import PropTypes from 'prop-types'
import Card from "./Card/Card.js";
import CountDown from 'react-countdown'

const Game = ({ cardsData, shuffle, saveCardForLater }) => {  
  const cardsFlipped = useRef(0)
  const correctGuesses = useRef(0)
  const incorrectGuesses = useRef(0)
  const [gameOver, setGameOver] = useState(false)

  const flipCard = () => {
    cardsFlipped.current = cardsFlipped.current + 1
  }
  
  const addOneCorrect = () => {
    correctGuesses.current = correctGuesses.current + 1
  }
  
  const addOneIncorrect = () => {
    incorrectGuesses.current = incorrectGuesses.current + 1
  }
  
  const shuffledCards = shuffle(cardsData)

  const cards = shuffledCards.slice(0,10).map(card => {
    const currentSymbol = card.symbol

    const makeButtons = (currentSymbol) => {
      const answers = []
      answers.push(currentSymbol)
      
      const answerPool = shuffledCards.slice(-200, shuffledCards.length)
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * 200)
        if (!answers.includes(answerPool[random])) {
          answers.push(answerPool[random].symbol)
        }        
      }
      
      shuffle(answers)
      return answers
    }

    const answerButtons = makeButtons(currentSymbol)
    
    return (
      <article className="card-section column"> 
        <Card card={card} answerButtons={answerButtons} flipCard={flipCard} addOneCorrect={addOneCorrect} addOneIncorrect={addOneIncorrect} saveCardForLater={saveCardForLater} />
      </article>
    )
  })

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>GAME OVER!</span>;
    } else {
      return <span>{minutes}:{seconds}</span>;
    }
  }


  return (
    <section className='card-carousel'>
      <span className="countdown column">
      <CountDown date={Date.now() + 180000} renderer={renderer} />
      </span>
      {!gameOver && cards}
    </section>
  )
}

Game.propTypes = {
  cardsData: PropTypes.array,
  shuffle: PropTypes.func,
  saveCardForLater: PropTypes.func
}

export default Game



