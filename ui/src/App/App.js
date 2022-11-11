import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import About from '../About/About.js';
import fetchData from '../APIcalls/APIcalls.js';
import Start from '../NewGame/Start.js';
import Home from '../Home/Home.js';
import Game from '../Game/Game.js';
import './App.css';

function App() {
  const [page, setPage] = useState('home')
  const [cardsData, setCardsData] = useState([])
  const [savedCards, setSavedCards] = useState([])
  
  useEffect(() => {
    fetchData().then(data => setCardsData(data))
  },[])

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
  
    return array;
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
        <Route path='/game' element={<Game cardsData={cardsData} shuffle={shuffle} />} />

      </Routes>

      <nav className='column'>
        {page === 'start' && <button onClick={() => setPage('game')}><Link to='/game'>Play</Link></button>}
        {page != 'home' && <button onClick={() => setPage('home')}><Link to='/home'>Home</Link></button>}
        {page === 'home' && <button onClick={() => setPage('about')}><Link to='/about'>About</Link></button>}
        {page === 'home' && <button onClick={() => setPage('start')}><Link to='/start'>Start</Link></button>}
      </nav>

    </section>
  )
}

export default App
