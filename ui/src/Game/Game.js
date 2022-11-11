import React, {useState} from "react";
import PropTypes from 'prop-types'
import Card from "./Card/Card.js";

const Game = ({ cardsData, shuffle }) => {

  const shuffledCards = shuffle(cardsData)

  const makeButtons = (currentSymbol) => {
    const answerButtons = []
    answerButtons.push(currentSymbol)
    
    shuffledCards.slice(-3,shuffledCards.length).map(card => {
      answerButtons.push(card.symbol)
    })

    const shuffledButtons = shuffle(answerButtons).map(button => {
      return (
        <button 
        onClick={event => checkCorrect(event, currentSymbol)}
        key={button} 
        id={button}>{button}</button>
      )
    })

    return shuffledButtons
  }

  const checkCorrect = (event, currentSymbol) => {
    event.preventDefault() 

    if (event.target.id === currentSymbol) {
      answerCorrect()
      console.log("correct!");
    } else {
      answerWrong()
      console.log('wrong!');
    }
  }

  const answerCorrect = () => {

  }

  const answerWrong = () => {
    // setFlip(!flip)
  }

  const cards = shuffledCards.slice(0,10).map(card => {
    console.log(card);
    return (
      <section key={card} className="card-section column"> 
        <Card card={card} makeButtons={makeButtons} checkCorrect={checkCorrect} />
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


