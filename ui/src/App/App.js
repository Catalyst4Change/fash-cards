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
        <Route path='/' element={<Home />}/> 
        <Route path='/newgame/*' element={<NewGame />} />
        <Route path='/about' element={<About />} />
        <Route path='/game' element={<Game cardsData={cardsData} shuffle={shuffle} />} />

      </Routes>

      <nav className='column'>
        <button><Link to='/'>Home</Link></button>
        <button><Link to='/about'>About</Link></button>
        <button><Link to='/newgame'>New Game</Link></button>
        <button><Link to='/game'>Start</Link></button>
      </nav>

    </section>
  )
}

export default App;
