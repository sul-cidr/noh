import React from "react";
import PropTypes from "prop-types";
import { Markup } from "interweave";

const NonTabbedNarrative = props => <Markup content={props.narrative} />;

NonTabbedNarrative.propTypes = {
  narrative: PropTypes.string
};

NonTabbedNarrative.defaultProps = {
  narrative: ""
};

export default NonTabbedNarrative;
