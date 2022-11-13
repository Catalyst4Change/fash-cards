import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import About from '../About/About.js';
import fetchData from '../APIcalls/APIcalls.js';
import Start from '../NewGame/Start.js';
import Home from '../Home/Home.js';
import Game from '../Game/Game.js';
import Saved from '../Saved/Saved.js';
import './App.css';

function App() {
  const [page, setPage] = useState('home')
  const [cardsData, setCardsData] = useState([]) 
  // const cardsRef = useRef([])
  const savedCards = useRef([])
  
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
  
  return (
    <section className="App column">

      <h1 className='column'>
        FASH CARDS
      </h1>

      <Routes>
        <Route path="/" element={ <Navigate to="/home" /> } />
        <Route path='/home' element={<Home />}/> 
        <Route path='/start/*' element={<Start />} />
        <Route path='/about' element={<About />} />
        <Route path='/game' element={<Game cardsData={cardsData} shuffle={shuffle} saveCardForLater={saveCardForLater} />} />
        <Route path='/saved' element={<Saved savedCards={savedCards.current} />} />
      </Routes>

      <nav className='column'>
        {page === 'start' && <button onClick={() => setPage('game')}><Link to='/game'>Play</Link></button>}
        {page != 'home' && <button onClick={() => setPage('home')}><Link to='/home'>Home</Link></button>}
        {page === 'home' && <button onClick={() => setPage('about')}><Link to='/about'>About</Link></button>}
        {page === 'home' && <button onClick={() => setPage('start')}><Link to='/start'>Start</Link></button>}

        {page === 'home' && savedCards.length > 0 ? <button onClick={() => setPage('saved')}><Link to='/saved'>Saved Cards</Link></button> : ""}
        <button onClick={() => setPage('saved')}><Link to='/saved'>Saved Cards</Link></button>
      </nav>

    </section>
  )
}

export default App
