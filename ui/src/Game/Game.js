import React, {useState} from "react";
import PropTypes from 'prop-types'
import Card from "./Card/Card.js";

const Game = ({ cardsData, shuffle }) => {  
  const [cardsFlipped, setCardsFlipped] = useState(0)
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)

  const flipCard = () => {
    setCardsFlipped(cardsFlipped + 1)
  }
  
  const addOneCorrect = () => {
    setCorrectGuesses(correctGuesses + 1)
  }
  
  const addOneIncorrect = () => {
    setIncorrectGuesses(incorrectGuesses + 1)
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
        <Card card={card} answerButtons={answerButtons} flipCard={flipCard} addOneCorrect={addOneCorrect} addOneIncorrect={addOneIncorrect}/>
      </article>
    )
  })

  return (
    <section className='card-carousel'>
      {cards}
    </section>
  )
}

Game.propTypes = {
  cardsData: PropTypes.array,
  shuffle: PropTypes.func
}

export default Game


