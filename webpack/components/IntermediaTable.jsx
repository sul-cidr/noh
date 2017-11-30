import React from "react";

const IntermediaTable = () => (
  // Should be refactored to generator automatically
  <div class="intermedia-table">
    <div class="intermedia__element intermedia__element--title">
      <div class="intermedia__label">Section</div>
      <div class="intermedia__value"><a href="#">Kuse</a></div>
    </div>
    <div class="intermedia__element">
      <div class="intermedia__label">Voices</div>
      <div class="intermedia__value">Waki/Waki Tsure</div>
    </div>
    <div class="intermedia__element">
      <div class="intermedia__label">Type of voice</div>
      <div class="intermedia__value">Sung - Non Congruent</div>
    </div>
    <div class="intermedia__element">
      <div class="intermedia__label">Text</div>
      <div class="intermedia__value">Non congruent - Sashinori</div>
    </div>
    <div class="intermedia__element">
      <div class="intermedia__label">Percussion</div>
      <div class="intermedia__value">Otsuzumi + Kotsuzumi + Taiko</div>
    </div>
    <div class="intermedia__element">
      <div class="intermedia__label">Type of percussion</div>
      <div class="intermedia__value">Non Congruent</div>
    </div>
    <div class="intermedia__element">
      <div class="intermedia__label">Nohkan</div>
      <div class="intermedia__value">Yes - Non congruent</div>
    </div>
    <div class="intermedia__element">
      <div class="intermedia__label">Dance</div>
      <div class="intermedia__value">Yes - Dance to text</div>
    </div>
  </div>
);

export default IntermediaTable;
