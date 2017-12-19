import React from "react";
import PropTypes from "prop-types";

// May need to capitalize title...
const IntermediaTitle = props => (
  <div className="intermedia__element intermedia__element--title">
    <div className="intermedia__label">Section</div>
    <div className="intermedia__value">
      <a href={`/${props.play}/${props.section}`}>{props.section}</a>
    </div>
  </div>
);

IntermediaTitle.propTypes = {
  play: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired
};

export default IntermediaTitle;
