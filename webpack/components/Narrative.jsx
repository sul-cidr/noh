import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TabbedNarrative from "./TabbedNarrative";
import NonTabbedNarrative from "./NonTabbedNarrative";
import { setStartTime } from "../actionCreators";
import { getTime } from "../utils";

class Narrative extends Component {
  constructor(props) {
    super(props);

    this.state = {
      narrative: props.narrative,
      tabbed: this.checkIfTabbed()
    };

    this.narrativeOnClick = this.narrativeOnClick.bind(this);
  }

  componentWillMount() {
    this.checkIfTabbed(this.state.narrative, this.state.tabIndicator);
  }

  checkIfTabbed() {
    const re = /tabbed-narrative/;
    if (re.exec(this.props.narrative) != null) {
      return true;
    }
    return false;
  }

  narrativeOnClick(event) {
    if (event.target.tagName === "TIME") {
      this.props.updateStartTime(getTime(event.target));
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
  updateStartTime: time => dispatch(setStartTime(time))
});

export const Unwrapped = Narrative;
export default connect(null, mapDispatchToProps)(Narrative);
