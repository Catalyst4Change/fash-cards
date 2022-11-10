import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from '../About/About.js';
import fetchData from '../APIcalls/APIcalls.js';
import NewGame from '../NewGame/NewGame.js';
import './App.css';

function App() {
  const [cardsData, setCardsData] = useState([])
  const [savedCards, setSavedCards] = useState([])
  
  useEffect(() => {
    fetchData().then(data => setCardsData(data))
  })

  return (
    <div className="App">
      <header>
        FASH CARDS
      </header>

      <div className='logo'>
        logo
      </div>

      <nav>
        <ul>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/newgame'>New Game</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path='/newgame' element={<NewGame />} />
        <Route path='/about' element={<About path='/about' />} />
      </Routes>
    </div>
  )
}

export default App;
