import React from "react";

const IntermediaTable = () => (
  // Should be refactored to generator automatically
  <div className="intermedia-table">
    <div className="intermedia__element intermedia__element--title">
      <div className="intermedia__label">Section</div>
      <div className="intermedia__value">
        <a href="/hashitomi/kiri/">Kuse</a>
      </div>
    </div>
    <div className="intermedia__element">
      <div className="intermedia__label">Voices</div>
      <div className="intermedia__value">Waki/Waki Tsure</div>
    </div>
    <div className="intermedia__element">
      <div className="intermedia__label">Type of voice</div>
      <div className="intermedia__value">Sung - Non Congruent</div>
    </div>
    <div className="intermedia__element">
      <div className="intermedia__label">Text</div>
      <div className="intermedia__value">Non congruent - Sashinori</div>
    </div>
    <div className="intermedia__element">
      <div className="intermedia__label">Percussion</div>
      <div className="intermedia__value">Otsuzumi + Kotsuzumi + Taiko</div>
    </div>
    <div className="intermedia__element">
      <div className="intermedia__label">Type of percussion</div>
      <div className="intermedia__value">Non Congruent</div>
    </div>
    <div className="intermedia__element">
      <div className="intermedia__label">Nohkan</div>
      <div className="intermedia__value">Yes - Non congruent</div>
    </div>
    <div className="intermedia__element">
      <div className="intermedia__label">Dance</div>
      <div className="intermedia__value">Yes - Dance to text</div>
    </div>
  </div>
);

export default IntermediaTable;
