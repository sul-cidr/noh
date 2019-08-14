import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IntermediaTitle from "./IntermediaTitle";
import IntermediaElement from "./IntermediaElement";

class IntermediaTable extends Component {
  findCurrentSectionIndex() {
    // Determine current sectionIndex based on time
    const currentSectionIndex = this.props.sections.findIndex(
      section =>
        this.props.currentTime >= (section.startTime.value || 0) &&
        this.props.currentTime < section.endTime.value
    );
    // findIndex returns -1 if it finds nothing, just return 0 in that case
    return Math.max(currentSectionIndex, 0);
  }

  render() {
    // due to lack of data for start and end time, not always finding current section
    const sectionIndex = this.findCurrentSectionIndex();
    const section = this.props.sections[sectionIndex];
    return (
      <div className="intermedia-table">
        <IntermediaTitle
          section={section.sectionName.value}
          sectionUrl={section.sectionUrl}
        />
        <IntermediaElement
          fieldName="Voices"
          fieldValue={section.numberVoices.value}
        />
        <IntermediaElement
          fieldName="Type of voice"
          fieldValue={section.voice.value}
        />
        <IntermediaElement fieldName="Text" fieldValue={section.text.value} />
        <IntermediaElement
          fieldName="Percussion"
          fieldValue={section.percussion.value}
        />
        <IntermediaElement
          fieldName="Type of percussion"
          fieldValue={section.numberOfPercussion.value}
        />
        <IntermediaElement
          fieldName="Nohkan"
          fieldValue={section.nokhanPresent.value}
        />
        <IntermediaElement
          fieldName="Dance"
          fieldValue={section.dancePresent.value}
        />
      </div>
    );
  }
}

IntermediaTable.propTypes = {
  currentTime: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      play: PropTypes.shape({ value: PropTypes.string }),
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      sectionUrl: PropTypes.string.isRequired,
      intensity: PropTypes.shape({ number: PropTypes.string }),
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number }),
      numberVoices: PropTypes.shape({
        number: PropTypes.string,
        value: PropTypes.string
      }),
      voice: PropTypes.shape({ value: PropTypes.string }),
      text: PropTypes.shape({ value: PropTypes.string }),
      numberOfPercussion: PropTypes.shape({ value: PropTypes.string }),
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

const mapStateToProps = state => ({ currentTime: state.currentTime.time });

export const Unwrapped = IntermediaTable;
export default connect(mapStateToProps)(IntermediaTable);
