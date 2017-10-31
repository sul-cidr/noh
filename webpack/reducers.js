import { SET_CURRENT_TIME } from './actions';

const DEFAULT_STATE = {
  currentTime: 0
};

const setCurrentTime = (state, action) =>
  Object.assign({}, state, { currentTime: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return setCurrentTime(state, action);
    default:
      return state;
  }
};

export default rootReducer;
