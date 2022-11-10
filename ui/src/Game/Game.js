import React from "react";
import PropTypes from 'prop-types'

const Game = ({ cardsData }) => {

  const cards = cardsData.map(card => {
    return (
      <div className="card">
        <h3>{card.symbol}</h3>
        <img className="card-image" src={card.image} />
        <div className="card-options">
          <div className="card-option">💾</div>
          <div className="card-option">🔄</div>
        </div>
        
      </div>
    )

  });

  return (
    <section>
      {cards}
    </section>
  )
}

Game.propTypes = {
  cardsData: PropTypes.array
}

export default Game
