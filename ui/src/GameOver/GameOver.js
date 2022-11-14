import PropTypes from 'prop-types'
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const GameOver = ({cardsFlipped, correctGuesses, resetTimer}) => {

  const navigate = useNavigate()

  useEffect(() => {
    resetTimer()
    navigate("/gameover")
  },[])
  
  return (
    <section className="column">
      <h2>Game Over</h2>
      <p>Congratulations, you got {correctGuesses} out of {cardsFlipped} correct for {Math.floor((correctGuesses / cardsFlipped) * 100)}% correct!</p>
      <p>Start a new game or study your saved cards.</p>
    </section>
  )
}

GameOver.propTypes = {
  cardsFlipped: PropTypes.number,
  correctGuesses: PropTypes.number,
  resetTimer: PropTypes.func
}


export default GameOver