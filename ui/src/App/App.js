import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import About from '../About/About.js';
import fetchData from '../APIcalls/APIcalls.js';
import Start from '../NewGame/Start.js';
import Home from '../Home/Home.js';
import Game from '../Game/Game.js';
import Saved from '../Saved/Saved.js';
import './App.css';
import GameOver from '../GameOver/GameOver.js';
import CountDown from 'react-countdown'


const App = () => {
  const [page, setPage] = useState('home')
  const [cardsData, setCardsData] = useState([]) 
  // const cardsRef = useRef([])
  const savedCards = useRef([])
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(false)



  console.log(page);
  
  useEffect(() => {
    fetchData().then(data => setCardsData(shuffle(data)))
  },[])

  const shuffle = (array) => {
    let currentIndex = array.length
    let randomIndex
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const saveCardForLater = (card) => {
    console.log("saved!")
    const savedCardsCopy = savedCards.current;
    savedCardsCopy.push(card)
    savedCards.current = savedCardsCopy
    console.log(savedCards.current)
  }
  
  const goToPage = (event, page) => {
    setPage(page)
    console.log(event.target.href)
  }

  const startTimer = () => {
    setTimer(true)
  }

  const resetTimer = () => {
    setTimer(false)
  }

  // countdown


  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setGameOver(true)
      return <span>GAME OVER!</span>;
    } else {
      return <span>{minutes}:{seconds}</span>;
    }
  }
  

  return (
    <section className="App column">

      <h1 className='column'>
        FASH CARDS
      </h1>
      {timer && 
        <span className="countdown column">
          <CountDown date={Date.now() + 60000} renderer={renderer} />
        </span>}

      <Routes>
        <Route path="/" element={ <Navigate to="/home" /> } />
        <Route path='/home' element={<Home />}/> 
        <Route path='/start/*' element={<Start />} />
        <Route path='/about' element={<About />} />
        <Route path='/game' element={<Game cardsData={cardsData} shuffle={shuffle} saveCardForLater={saveCardForLater} gameOver={gameOver} resetTimer={resetTimer} />} />
        <Route path='/saved' element={<Saved savedCards={savedCards.current} />} />
        <Route path='/gameover' element={<GameOver resetTimer={resetTimer} />} />
      </Routes>

      <nav className='column'>
        {page === 'start' && 
          <button onClick={(event) => {goToPage(event, 'game'); startTimer()}}>
            <Link to='/game'>Play</Link>
          </button>}

        {page !== 'home' && 
          <button onClick={(event) => goToPage(event, 'home')}>
            <Link to='/home'>Home</Link>
          </button>}

        {page === 'home' && 
          <button onClick={(event) => goToPage(event, 'about')}>
            <Link to='/about'>About</Link>
          </button>}

        {page === 'home' && 
          <button onClick={(event) => goToPage(event, 'start')}>
            <Link to='/start'>Start</Link>
          </button>}

        {page === 'gameover' && 
          <button onClick={(event) => goToPage(event, 'start')}>
            <Link to='/start'>Start</Link>
          </button>}

        {savedCards.current.length >= 1 && 
          <button onClick={(event) => goToPage(event, 'saved')}>
            <Link to='/saved'>Saved Cards</Link>
          </button>}
      </nav>

    </section>
  )
}

export default App
