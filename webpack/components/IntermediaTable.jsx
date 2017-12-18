import React from "react";
import PropTypes from "prop-types";
import IntermediaTitle from "./IntermediaTitle";
import IntermediaElement from "./IntermediaElement";

// How do we handle when there isn't a value? Just empty?
const IntermediaTable = props => (
  <div className="intermedia-table">
    <IntermediaTitle section={props.section} play={props.play} />
    <IntermediaElement fieldName="Voices" fieldValue="Waki/Waki Tsure" />
    <IntermediaElement
      fieldName="Type of voice"
      fieldValue="Sung - Non Congruent"
    />
    <IntermediaElement
      fieldName="Text"
      fieldValue="Non congruent - Sashinori"
    />
    <IntermediaElement
      fieldName="Percussion"
      fieldValue="Otsuzumi + Kotsuzumi + Taiko"
    />
    <IntermediaElement
      fieldName="Type of percussion"
      fieldValue="Non Congruent"
    />
    <IntermediaElement fieldName="Nohkan" fieldValue="Yes - Non congruent" />
    <IntermediaElement fieldName="Dance" fieldValue="Yes - Dance to text" />
  </div>
);

IntermediaTable.propTypes = {
  section: PropTypes.string.isRequired,
  play: PropTypes.string.isRequired
};

export default IntermediaTable;
