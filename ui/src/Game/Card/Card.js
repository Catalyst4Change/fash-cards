import React, {useState} from "react";
import PropTypes from 'prop-types' 

const Card = ({ card, answerButtons, flipCard, addOneCorrect, addOneIncorrect}) => {
  const {symbol, image, desc} = card
  const [flip, setFlip] = useState(false)
  const [answered, setAnswered] = useState('')
  
  const makeButtons = () => {
    return answerButtons.map(button => {
      return (
        <button type="button" id={button} onClick={(event) => checkCorrect(event, button, symbol)}>{button}</button>
      )
    })
  }

  const checkCorrect = (event, button, symbol) => {
    event.preventDefault()
    flipCard()
    if (button === symbol) {
      answerCorrect()
    } else {
      answerWrong()
    }
  }
  
  const answerCorrect = () => {
    setAnswered('correct')
    addOneCorrect()
    console.log("correct!")
  }
  
  const answerWrong = () => {
    setAnswered('wrong')
    addOneIncorrect()
    setFlip(!flip)
    console.log('wrong!');
  }

  return (
    <section className=" card-section column"> 
      <div className="card-container column">
        <div className={`card column ${flip ? 'flip' : ''}`}>

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
          {answered && <button>NEXT</button>}
          {!answered && makeButtons()}
        </div>
      </div>
    </section>
  )

}

Card.propTypes = {
  card: PropTypes.object,
  answerButtons: PropTypes.array,
  flipCard: PropTypes.func,
  addOneCorrect: PropTypes.func,
  addOneIncorrect: PropTypes.func
}


export default Card