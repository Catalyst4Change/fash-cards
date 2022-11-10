import React from "react";
import PropTypes from 'prop-types'
import useState from "react";

const Game = ({ cardsData, shuffle }) => {
  const [flip, setFlip] = useState(false)

  const shuffledCards = shuffle(cardsData)

  const makeButtons = (currentSymbol) => {
    const answerButtons = []
    answerButtons.push(currentSymbol)
    console.log(answerButtons);
    
    shuffledCards.slice(-3,shuffledCards.length).map(card => {
      answerButtons.push(card.symbol)
    })
    console.log(answerButtons);

    const shuffledButtons = shuffle(answerButtons).map(button => {
      return (
        <button 
        onClick={event => checkCorrect(event, currentSymbol)}
        key={button} 
        id={button}>{button}</button>
      )
    })

    return shuffledButtons
  }

  const checkCorrect = (event, currentSymbol) => {
    if (event.target.id === currentSymbol) {
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
    () => setFlip(!flip)
  }

  const cards = shuffledCards.slice(0,10).map(card => {
    return (
      <section className=" card-section column"> 
        <div className="card-container column">
          <div key={card.symbol} className={`card column ${flip ? 'flip' : ''}`}>

            <div className="front">
              <div className="card-image-container column"> 
                <img className="card-image" src={card.image} />
              </div>
            </div>

            <div className="back">
              <div className="card-description column"> 
                <p>{card.desc}</p>
              </div>
            </div>
          </div>  
        </div>

        <div className="card-options">
          <div className="card-option">💾</div>
          <div className="card-option">🔄</div>
        </div>
        {makeButtons(card.symbol)}
      </section>
    )
  })

  return (
    <section className='card-carousel'>
      {cards}
    </section>
  )
}

Game.propTypes = {
  cardsData: PropTypes.array,
  shuffle: PropTypes.func
}

export default Game


