import React, {useState} from "react";
import PropTypes from 'prop-types'

const Card = ({ card, answerButtons}) => {
  const {symbol, image, desc} = card
  const [flip, setFlip] = useState(false)
  
  const makeButtons = () => {
    return answerButtons.map(button => {
      return (
        <button type="button" onClick={() => checkCorrect(button, symbol)}>{button}</button>
      )
    })
  }

  const checkCorrect = (button, symbol) => {
    
    if (button === symbol) {
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
    setFlip(!flip)
  }


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
        <div className="column">
         {makeButtons()}
        </div>
      </div>
    </section>
  )

}

Card.propTypes = {
  card: PropTypes.object,
  answerButtons: PropTypes.array
}


export default Card