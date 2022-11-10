import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from '../About/About.js';
import fetchData from '../APIcalls/APIcalls.js';
import NewGame from '../NewGame/NewGame.js';
import Home from '../Home/Home.js';
import Game from '../Game/Game.js';
import './App.css';

function App() {
  const [cardsData, setCardsData] = useState([])
  const [savedCards, setSavedCards] = useState([])
  
  useEffect(() => {
    fetchData().then(data => setCardsData(data))
  })

  return (
    <section className="App">
      <h1>
        FASH CARDS
      </h1>

      <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/newgame' element={<NewGame />} />
        <Route path='/about' element={<About />} />
        <Route path='/game' element={<Game cardsData={cardsData} />} />

      </Routes>

      <nav>
        <button><Link to='/'>Home</Link></button>
        <button><Link to='/about'>About</Link></button>
        <button><Link to='/newgame'>New Game</Link></button>
        <button><Link to='/game'>Start</Link></button>
      </nav>

    </section>
  )
}

export default App;
