import PropTypes from 'prop-types'
import React, { useEffect } from "react";

const GameOver = ({cardsFlipped, correctGuesses, resetTimer}) => {

  useEffect(() => {
    resetTimer()
  },[])
  
  return (
    <section className="column">
      <h2>Game Over</h2>
      <p>Congratulations, you got {correctGuesses} out of {cardsFlipped} correct for {Math.floor((correctGuesses / cardsFlipped) * 100)}% correct!</p>
      <p>Click here to learn more about the ADL and it's work.</p>
      <p>Start a new game or study your saved cards.</p>
      <a className='column' href='https://www.adl.org' target="_blank" >
        <button>Learn more about ADL</button>
      </a>
    </section>
  )
}

GameOver.propTypes = {
  cardsFlipped: PropTypes.number,
  correctGuesses: PropTypes.number,
  resetTimer: PropTypes.func
}


export default GameOver