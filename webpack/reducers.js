import {
  SET_CURRENT_TIME,
  SET_START_TIME,
  SET_CURRENT_PHRASE_ID,
  SET_SCORE_TOGGLES,
  SET_SIDEBAR_STATE,
  SET_NARRATIVE_TAB
} from "./actions";

const DEFAULT_STATE = {
  currentTime: { time: 0, origin: "DEFAULT_STATE" },
  startTime: 0,
  currentPhraseID: "",
  toggles: {
    isBeatOn: true,
    isTextOn: true,
    isPercussionOn: true,
    isNohkanOn: true,
    isDanceOn: true,
    isPrevSentenceOn: false,
    isNextSentenceOn: true
  },
  sidebarState: {},
  narrativeTab: 0
};

const setCurrentTime = (state, action) =>
  Object.assign({}, state, { currentTime: action.payload });

const setStartTime = (state, action) =>
  Object.assign({}, state, { startTime: action.payload });

const setCurrentPhraseID = (state, action) =>
  Object.assign({}, state, { currentPhraseID: action.payload });

const setScoreToggles = (state, action) =>
  Object.assign({}, state, { toggles: action.payload });

const setSidebarState = (state, action) =>
  Object.assign({}, state, { sidebarState: action.payload });

const setNarrativeTab = (state, action) =>
  Object.assign({}, state, { narrativeTab: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return setCurrentTime(state, action);
    case SET_START_TIME:
      return setStartTime(state, action);
    case SET_CURRENT_PHRASE_ID:
      return setCurrentPhraseID(state, action);
    case SET_SCORE_TOGGLES:
      return setScoreToggles(state, action);
    case SET_SIDEBAR_STATE:
      return setSidebarState(state, action);
    case SET_NARRATIVE_TAB:
      return setNarrativeTab(state, action);
    default:
      return state;
  }
};

export { DEFAULT_STATE };
export default rootReducer;
