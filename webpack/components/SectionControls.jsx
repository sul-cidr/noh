import React from "react";
import PropTypes from "prop-types";

const SectionControls = props => (
  <div className="section-controls-container">
    <a href={props.prevSectionURL}>
      <button
        className="section-controls__button"
        disabled={props.prevSectionURL === ""}
      >
        Previous section
      </button>
    </a>
    <a href={props.nextSectionURL}>
      <button
        className="section-controls__button"
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
