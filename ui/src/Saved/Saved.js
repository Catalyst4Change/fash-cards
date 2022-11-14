import React, {useRef, useState} from "react"
import PropTypes from 'prop-types'

const Saved = ({ savedCards }) => {  

  const cards = savedCards.map((card, index) => {
    const {symbol, image, desc} = card  

    return (
      <div key={"saved" + index} className="column">
        <div className={" saved card  column "}>
          <div className="saved card-image-container column"> 
            <h3 className="column">{symbol}</h3>
            <img className=" card-image" src={image} />
          </div>
            <p>{desc}</p>
        </div>
      </div>
    )
  })

  return (
    <section className='card-carousel'>
      <h2 className="countdown column">
        Your saved cards:
      </h2>
      {cards}
    </section>
  )
}

Saved.propTypes = {
  savedCards: PropTypes.array,
}

export default Saved



