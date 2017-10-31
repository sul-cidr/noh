/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import PropTypes from 'prop-types';

const SimpleVideo = props => <video id="player" src={props.src} controls />;

SimpleVideo.propTypes = {
  src: PropTypes.string
};

SimpleVideo.defaultProps = {
  src: ''
};

export default SimpleVideo;
