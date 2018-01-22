import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IntermediaTitle from "./IntermediaTitle";
import IntermediaElement from "./IntermediaElement";

class IntermediaTable extends Component {
  currentSection() {
    return this.props.sections.find(
      section =>
        this.props.currentTime >= section.startTime.value &&
        this.props.currentTime < section.endTime.value
    );
  }
  render() {
    // due to lack of data for start and end time, not always finding current section
    const section = this.currentSection() || this.props.sections[0];
    return (
      <div className="intermedia-table">
        <IntermediaTitle
          section={section.sectionName.value}
          play={this.props.play}
        />
        <IntermediaElement
          fieldName="Voices"
          fieldValue={section.numberVoices.value || "0"}
        />
        <IntermediaElement
          fieldName="Type of voice"
          fieldValue={section.voice.value || "0"}
        />
        <IntermediaElement
          fieldName="Text"
          fieldValue={section.text.value || "0"}
        />
        <IntermediaElement
          fieldName="Percussion"
          fieldValue={section.percussion.value || "0"}
        />
        <IntermediaElement
          fieldName="Type of percussion"
          fieldValue={section.numberOfPercussion.value || "0"}
        />
        <IntermediaElement
          fieldName="Nohkan"
          fieldValue={section.nokhanPresent.value || "0"}
        />
        <IntermediaElement
          fieldName="Dance"
          fieldValue={section.dancePresent.value || "0"}
        />
      </div>
    );
  }
}

IntermediaTable.propTypes = {
  play: PropTypes.string.isRequired,
  currentTime: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      play: PropTypes.shape({ value: PropTypes.string }),
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      intensity: PropTypes.shape({ number: PropTypes.string }),
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number }),
      numberVoices: PropTypes.shape({
        number: PropTypes.string,
        value: PropTypes.string
      }),
      voice: PropTypes.shape({ value: PropTypes.string }),
      text: PropTypes.shape({ value: PropTypes.string }),
      numberOfPercussion: PropTypes.shape({ number: PropTypes.string }),
      percussion: PropTypes.shape({ value: PropTypes.string }),
      nokhanPresent: PropTypes.shape({
        present: PropTypes.string,
        value: PropTypes.string
      }),
      dancePresent: PropTypes.shape({
        present: PropTypes.string,
        value: PropTypes.string
      }),
      captions: PropTypes.Array,
      narrative: PropTypes.shape({ value: PropTypes.string })
    })
  ).isRequired
};

const mapStateToProps = state => ({ currentTime: state.currentTime });

export const Unwrapped = IntermediaTable;
export default connect(mapStateToProps)(IntermediaTable);
