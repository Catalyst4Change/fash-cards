import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
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
  const [cardsData, setCardsData] = useState([]) 
  const savedCards = useRef([])
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(false)
  const [error, setError] = useState('')

  const {pathname} = useLocation()

  useEffect(() => {
    fetchData().then(data => setCardsData(shuffle(data)))
    .catch(error => setError(error))
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
    const savedCardsCopy = savedCards.current;
    savedCardsCopy.push(card)
    savedCards.current = savedCardsCopy
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
        {error && <h2>{error.message}</h2>}

        {pathname.includes('start') && 
          <Link to='/game'><button onClick={startTimer}>Play</button></Link>}

        {!pathname.includes('home') && 
          <Link to='/home'><button onClick={resetTimer}>Home</button></Link>}

        {pathname.includes('home') && 
          <Link to='/about'><button onClick={resetTimer}>About</button></Link>}

        {!error && pathname.includes('home') && 
          <Link to='/start'><button onClick={resetTimer}>Start</button></Link>}

        {pathname.includes('gameover') && 
          <Link to='/start'><button onClick={resetTimer}>New Game</button></Link>}

        {savedCards.current.length >= 1 && 
          <Link to='/saved'><button onClick={resetTimer}>Saved Cards</button></Link>}

      </nav>

    </section>
  )
}

export default App
