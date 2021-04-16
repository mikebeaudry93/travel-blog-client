import React from "react";
import "./SiteBg.scss";
import image from "../../assets/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg";

function SiteBg() {
  return (
    <div>
      <div className="black-container"></div>
      <img className="bg-image" src={image} alt="background" />
    </div>
  );
}

export default SiteBg;
