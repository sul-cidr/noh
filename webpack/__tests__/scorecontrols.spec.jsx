import React from "react"
import { Provider } from "react-redux"
import { shallow, mount } from "enzyme"
import configureMockStore from "redux-mock-store"
import ScoreControls, {
  Unwrapped as UnwrappedScoreControls
} from "../components/ScoreControls"
import { phrases } from "./__fixtures__/phrases.json"

describe("<ScoreControls>", () => {
  let wrapper
  let store

  beforeEach(() => {
    const mockStore = configureMockStore()
    const initialState = { currentTime: { time: 0, origin: "ScoreControls" } }
    store = mockStore(initialState)
    wrapper = mount(
      <Provider store={store}>
        <ScoreControls
          phrases={phrases}
          duration={2000}
          updateScoreToggles={jest.fn()}
          updateStartTime={jest.fn()}
        />
      </Provider>
    )
  })

  it("renders as expected by default", () => {
    const component = shallow(
      <UnwrappedScoreControls
        updateScoreToggles={jest.fn()}
        updateStartTime={jest.fn()}
        phrases={phrases}
        currentTime={0}
        duration={2000}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it("renders as expected by default at the end of the duration time", () => {
    const component = shallow(
      <UnwrappedScoreControls
        updateStartTime={jest.fn()}
        updStartTime={jest.fn()}
        phrases={phrases}
        currentTime={1500}
        duration={2000}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it("renders as expected by default with a store", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("handles checkbox changes", () => {
    const action = { type: "SET_SCORE_TOGGLES", payload: {} }
    wrapper.find("input").forEach(input => {
      input.simulate("change")
      expect(store.getActions()[0].type).toEqual(action.type)
    })
  })

  it("handles filters popup", () => {
    const popup = wrapper.find("div.score-controls__filters-popup").first()
    const button = wrapper.find("button.score-controls__filters-button").first()
    expect(popup.getDOMNode().className).toContain("hidden")
    button.simulate("click")
    expect(popup.getDOMNode().className).not.toContain("hidden")
  })

  it("handles prev button", () => {
    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: phrases[0].startTime.value, origin: "ScoreControls" }
    }
    const button = wrapper.find("button.sentence-control__prev").first()
    button.simulate("click")
    expect(store.getActions()[1]).toEqual(action)
  })

  it("handles next button", () => {
    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: phrases[1].startTime.value, origin: "ScoreControls" }
    }
    const button = wrapper.find("button.sentence-control__next").first()
    button.simulate("click")
    expect(store.getActions()[1]).toEqual(action)
  })
})
