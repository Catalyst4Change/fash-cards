import React, {useState} from "react";
import PropTypes from 'prop-types'

const Card = ({ symbol, image, desc, makeButtons, checkCorrect }) => {
  const [flip, setFlip] = useState(false)


  return (
    <section className=" card-section column"> 
      <div className="card-container column">
        <div key={symbol} className={`card column ${flip ? 'flip' : ''}`}>

          <div className="front">
            <div className="card-image-container column"> 
              <img className="card-image" src={image} />
            </div>
          </div>

          <div className="back">
            <div className="card-description column"> 
              <p>{desc}</p>
            </div>
          </div>
        </div>  
      </div>

      <div className="card-options">
        <div className="card-option">💾</div>
        <div className="card-option">🔄</div>
      </div>
      {makeButtons(symbol)}
    </section>
  )

}

Card.propTypes = {
  card: PropTypes.object,
  makeButtons: PropTypes.func,
  checkCorrect: PropTypes.func
}


export default Card