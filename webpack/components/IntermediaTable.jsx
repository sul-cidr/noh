import React from "react";
import PropTypes from "prop-types";
import IntermediaTitle from "./IntermediaTitle";

const IntermediaTable = props => (
  // Should be refactored to generator automatically
  <div className="intermedia-table">
    <IntermediaTitle section={props.section} play={props.play} />

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

IntermediaTable.propTypes = {
  section: PropTypes.string.isRequired,
  play: PropTypes.string.isRequired
};

export default IntermediaTable;
