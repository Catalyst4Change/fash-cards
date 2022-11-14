import React, {useState} from "react";
import PropTypes from 'prop-types' 

const Card = ({ card, cardNumber, answerButtons, flipCard, addOneCorrect, addOneIncorrect, saveCardForLater, nextSlide}) => {
  const {symbol, image, desc} = card
  const [flip, setFlip] = useState(false)
  const [answered, setAnswered] = useState('')
  const [saved, setSaved] = useState(false)

  
  const makeButtons = () => {
    return answerButtons.map((button, index) => {
      return (
        <button key={"button" + index} id={button} onClick={(event) => checkCorrect(event, button, symbol)}>{button}</button>
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

  const justChecking = () => {
    setFlip(!flip)
  }

  const saveCard = () => {
    setSaved(true)
    saveCardForLater(card)
  }

  return (
    <section className="card-section column"> 
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

      <div className="column">
        <div className="card-options">
          {!saved && <span className="card-option-emoji" onClick={saveCard}>💾</span>}
          {saved && <span className="card-option-emoji">✅</span>}
          
          <span className="card-option-emoji" onClick={justChecking}>🔄</span>

        </div>

        <div className=" card-answers column">
          {answered && <button onClick={nextSlide}>NEXT</button>}
          {!answered && makeButtons()}
        </div>
      </div>
    </section>
  )
}

Card.propTypes = {
  card: PropTypes.object,
  cardNumber: PropTypes.number,
  answerButtons: PropTypes.array,
  flipCard: PropTypes.func,
  addOneCorrect: PropTypes.func,
  addOneIncorrect: PropTypes.func,
  saveCardForLater: PropTypes.func,
  nextSlide: PropTypes.func
}

export default Card