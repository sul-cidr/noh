import React from "react";
import PropTypes from "prop-types";
import { Markup } from "interweave";

// This component needs to take a string of HTML, parse it,
// determine if it has tabs, and render accordingly

const Narrative = props => (
  <div className="narrative">
    <Markup content={props.narrative} />
  </div>
);

Narrative.propTypes = {
  narrative: PropTypes.string
};

Narrative.defaultProps = {
  narrative: ""
};

export default Narrative;
