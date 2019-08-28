import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TabbedNarrative from "./TabbedNarrative";
import NonTabbedNarrative from "./NonTabbedNarrative";
import { setCurrentTime } from "../actionCreators";
import { getTime } from "../utils";

class Narrative extends Component {
  constructor(props) {
    super(props);

    this.state = {
      narrative: props.narrative,
      // there are no non-tabbed narratives...
      tabbed: /tabbed-narrative/.exec(this.props.narrative) != null
    };

    this.narrativeOnClick = this.narrativeOnClick.bind(this);
  }

  narrativeOnClick(event) {
    if (event.target.tagName === "TIME") {
      this.props.updateStartTime(getTime(event.target));
    } else if (["H1", "H2", "H3", "H4", "H5"].includes(event.target.tagName)) {
      event.target.classList.toggle("collapsible-closed");
    }
  }

  render() {
    let narrative = null;
    if (this.state.tabbed) {
      narrative = <TabbedNarrative narrative={this.state.narrative} />;
    } else {
      narrative = <NonTabbedNarrative narrative={this.state.narrative} />;
    }
    return (
      <div
        onClick={event => this.narrativeOnClick(event)}
        role="presentation"
        onKeyPress={null}
        className="narrative"
      >
        {narrative}
      </div>
    );
  }
}

Narrative.propTypes = {
  narrative: PropTypes.string,
  updateStartTime: PropTypes.func
};

Narrative.defaultProps = {
  narrative: "",
  updateStartTime: null
};

const mapDispatchToProps = dispatch => ({
  updateStartTime: time =>
    dispatch(setCurrentTime({ time, origin: "Narrative" }))
});

export const Unwrapped = Narrative;
export default connect(
  null,
  mapDispatchToProps
)(Narrative);
