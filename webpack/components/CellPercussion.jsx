import React from "react";
import PropTypes from "prop-types";

const CellPercussion = props => (
  <div className="cell cell--14">{props.text}</div>
);

CellPercussion.propTypes = {
  text: PropTypes.string.isRequired
};

export default CellPercussion;
