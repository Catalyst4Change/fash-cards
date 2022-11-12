import React, {useRef, useState} from "react"
import PropTypes from 'prop-types'
import Card from "../Game/Card/Card.js"

const Saved = ({ savedCards }) => {  

  const cards = savedCards.map(card => {
    const currentSymbol = card.symbol
    
    return (
      <article className="card-section column"> 
        <Card card={card} />
      </article>
    )
  })

  return (
    <section className='card-carousel'>
      <span className="countdown column">
      </span>
      {cards}
    </section>
  )
}

Saved.propTypes = {
  savedCards: PropTypes.array,
}

export default Saved



