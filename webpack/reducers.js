import { SET_CURRENT_TIME, SET_IS_PLAYING } from './actions';

const DEFAULT_STATE = {
  currentTime: 0,
  isPlaying: false
};

const setCurrentTime = (state, action) =>
  Object.assign({}, state, { currentTime: action.payload });

const setIsPlaying = (state, action) =>
  Object.assign({}, state, { isPlaying: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return setCurrentTime(state, action);
    case SET_IS_PLAYING:
      return setIsPlaying(state, action);
    default:
      return state;
  }
};

export default rootReducer;
