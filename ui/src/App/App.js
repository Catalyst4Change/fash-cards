import React, { useEffect, useState } from 'react';
import APIcalls from '../APIcalls/APIcalls.js';
import fetchData from '../APIcalls/APIcalls.js';
import './App.css';

function App() {
  const [cardsData, setCardsData] = useState([])
  const [savedCards, setSavedCards] = useState([])
  
  useEffect(() => {
    fetchData().then(data => setCardsData(data))
  })

  return (
    <div className="App">
    </div>
  );
}

export default App;
