import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "../Game/Game.js";
import Home from "../Home/Home.js";

const Start = () => {

  return (
    <section>
      <p>
        You have 3 minutes to guess as many hate-symbols as you can. Good luck!
      </p>
      <p>
        press 🔄 to flip the card and learn about that symbol's origins
      </p>
        
      <p>
        press 💾 to save a card to your Study Deck
      </p>

      <Routes>
        <Route to='/game' element={<Game />} />
        <Route to='/' element={<Home />} />
      </Routes>
    </section>
  )
}

export default Start