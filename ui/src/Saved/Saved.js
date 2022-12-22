import React from "react";

const Saved = ({ savedCards }) => {
  const cards = savedCards.map((card, index) => {
    const { symbol, image, desc } = card;

    return (
      <div key={"saved" + index} className="column">
        <div className={" saved card  column "}>
          <div className="saved card-image-container column">
            <h3 className="column">{symbol}</h3>
            <img className=" card-image" src={image} alt="card" />
          </div>
          <p>{desc}</p>
        </div>
      </div>
    );
  });

  return (
    <section className="card-carousel">
      <h2 className="countdown column">Your saved cards:</h2>
      {cards}
    </section>
  );
};

export default Saved;
