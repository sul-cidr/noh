import React from "react";
import PropTypes from "prop-types";

const Line = props => (
  <p className={props.active ? "active" : ""}>{props.text}</p>
);

Line.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default Line;
