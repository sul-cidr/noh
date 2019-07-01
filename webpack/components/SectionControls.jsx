import React from "react";
import PropTypes from "prop-types";

const SectionControls = props => (
  <div className="section-controls-container">
    <a href={props.prevSectionURL}>
      <button
        className="score-controls__filters-button"
        disabled={props.prevSectionURL === ""}
      >
        Previous section
      </button>
    </a>
    <a href={props.nextSectionURL}>
      <button
        className="score-controls__filters-button"
        disabled={props.nextSectionURL === ""}
      >
        Next Section
      </button>
    </a>
  </div>
);

SectionControls.propTypes = {
  prevSectionURL: PropTypes.string.isRequired,
  nextSectionURL: PropTypes.string.isRequired
};

export default SectionControls;
