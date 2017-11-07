import { SET_CURRENT_TIME } from './actions';

export default function setCurrentTime(word) {
  return { type: SET_CURRENT_TIME, payload: word };
};
