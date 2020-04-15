import React from "react";
import PropTypes from "prop-types";

// May need to capitalize title...
const IntermediaTitle = props => (
  <div className="intermedia__element intermedia__element--title">
    <div className="intermedia__label">Shōdan</div>
    <div
      className="intermedia__value"
      data-intro="Clicking on the red link at the top of the table, leads to its intermedia analysis on the Shōdan Level."
    >
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
