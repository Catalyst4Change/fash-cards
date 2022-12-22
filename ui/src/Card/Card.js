import React, { useState } from "react"

const Card = ({
  card,
  cardNumber,
  answerButtons,
  flipCard,
  addOneCorrect,
  addOneIncorrect,
  saveCardForLater,
  nextSlide,
}) => {
  const { symbol, image, desc } = card
  const [flip, setFlip] = useState(false)
  const [answered, setAnswered] = useState("")
  const [saved, setSaved] = useState(false)

  const makeButtons = () => {
    return answerButtons.map((button, index) => {
      return (
        <button
          key={"button" + index}
          id={button}
          onClick={(event) => checkCorrect(event, button, symbol)}
        >
          {button}
        </button>
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
    setAnswered("correct")
    addOneCorrect()
    console.log("correct!")
  }

  const answerWrong = () => {
    setAnswered("incorrect")
    addOneIncorrect()
    setFlip(!flip)
    console.log("incorrect!")
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
        <div className={`card column ${flip ? "flip" : ""}`}>
          <div className="front">
            <div className="card-image-container column">
              <img className="card-image" src={image} alt="card" />
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
        <div className="card-options row centerx">
          {!saved && (
            <span className="card-option-emoji" onClick={saveCard}>
              💾
            </span>
          )}
          {saved && <span className="card-option-emoji">✅</span>}

          {answered === "correct" && (
            <div className="card-answer-feedback correct-answer">Correct!</div>
          )}
          {answered === "incorrect" && (
            <div className="card-answer-feedback incorrect-answer">
              Incorrect!
            </div>
          )}
          <span className="card-option-emoji" onClick={justChecking}>
            🔄
          </span>
        </div>
        <div className="card-answers column">
          {answered && <button onClick={nextSlide}>NEXT</button>}
          {!answered && makeButtons()}
        </div>
      </div>
    </section>
  )
}

export default Card
