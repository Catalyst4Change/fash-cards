import React, {useState} from "react";
import PropTypes from 'prop-types'
import Card from "./Card/Card.js";

const Game = ({ cardsData, shuffle }) => {  
  const [answerButtons, setAnswerButtons] = useState([])
  const shuffledCards = shuffle(cardsData)

  
  
  
  
  const cards = shuffledCards.slice(0,10).map(card => {
    const currentSymbol = card.symbol
    const makeButtons = (currentSymbol) => {
      const answers = []
      answers.push(currentSymbol)
      
      shuffledCards.slice(-3,shuffledCards.length).map(card => {
        answers.push(card.symbol)
      })
  
      shuffle(answers)
      return answers
    }
    const answerButtons = makeButtons(currentSymbol)
    return (
      <section key={currentSymbol} className="card-section column"> 
        <Card card={card} answerButtons={answerButtons} />
      </section>
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


