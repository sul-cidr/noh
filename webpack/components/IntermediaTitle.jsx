import React from "react";
import PropTypes from "prop-types";

// May need to capitalize title...
const IntermediaTitle = props => (
  <div className="intermedia__element intermedia__element--title">
    <div className="intermedia__label">Shōdan</div>
    <div className="intermedia__value">
      <a href={props.sectionUrl} title={props.section}>
        <span>{props.section}</span>
        <i className="fas fa-chevron-right" />
      </a>
    </div>
  </div>
);

IntermediaTitle.propTypes = {
  section: PropTypes.string.isRequired,
  sectionUrl: PropTypes.string.isRequired
};

export default IntermediaTitle;
