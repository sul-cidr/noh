import React from "react";
import PropTypes from "prop-types";

// May need to capitalize title...
const IntermediaTitle = props => (
  <div className="intermedia__element intermedia__element--title">
    <div className="intermedia__label">Section</div>
    <div className="intermedia__value">
      <a href={props.sectionUrl}>{props.section}</a>
    </div>
  </div>
);

IntermediaTitle.propTypes = {
  section: PropTypes.string.isRequired,
  sectionUrl: PropTypes.string.isRequired
};

export default IntermediaTitle;
