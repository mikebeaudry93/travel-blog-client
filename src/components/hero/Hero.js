import React from "react";
import "./Hero.scss";

function Hero() {
  return (
    <div className="container hero-container">
      <div className="title-box">
        <h1>Welcome to</h1>
        <div>
          <h1> Travel Logger</h1>
        </div>
      </div>
      <h2>
        <span>Customize</span> your {""}
        <span className="gucci-swag">Travel Experience</span>
      </h2>
      <p className="form-p-text">
        Document your favourite travel experiences and never forget them again.
        Logging them will not only bring back great memories but also help you
        remeber all the details when you want to share them. Bring back that
        nostalgic feeling of being on a beach in the middle of nowhere, or
        hiking up an immeasurable mountain in the valleys of British Columbia.
        Remeber the beauty of our planet and share your stories so that everyone
        can appreciate what the world has to offer.
      </p>
    </div>
  );
}

export default Hero;
