import React from "react";
import "./loader.scss";

function Loader() {
  return (
    <div className="loader-page">
      <div className="loader-container">
        <div className="ball" id="ball-1"></div>
        <div className="ball" id="ball-2"></div>
        <div className="ball" id="ball-3"></div>
      </div>
    </div>
  );
}

export default Loader;
