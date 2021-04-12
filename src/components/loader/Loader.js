import React from "react";
import "./loader.scss";

function Loader() {
  return (
    <div className="loader-page">
      <div class="loader-container">
        <div class="ball" id="ball-1"></div>
        <div class="ball" id="ball-2"></div>
        <div class="ball" id="ball-3"></div>
      </div>
    </div>
  );
}

export default Loader;
