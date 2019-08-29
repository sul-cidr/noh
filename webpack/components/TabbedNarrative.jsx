import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Markup } from "interweave";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { setNarrativeTab } from "../actionCreators";

class TabbedNarrative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chunks: null,
      titles: null
    };

    const hookupMouseovers = function hookupMouseovers() {
      document.querySelectorAll("[data-highlight-dans]").forEach(targetElem => {
        targetElem.addEventListener("mouseover", ({ target }) => {
          const sectionIndices = target.attributes[
            "data-highlight-dans"
          ].value.split(",");
          sectionIndices.forEach(index => {
            document
              .querySelector(`[data-index="${index}"]`)
              .classList.add("shodan-map__item--highlight");
          });
        });
        targetElem.addEventListener("mouseout", ({ target }) => {
          const sectionIndices = target.attributes[
            "data-highlight-dans"
          ].value.split(",");
          sectionIndices.forEach(index => {
            document
              .querySelector(`[data-index="${index}"]`)
              .classList.remove("shodan-map__item--highlight");
          });
        });
      });
    };

    /* This function is triggered on all tab changes, as well as some other
    * events. It is used to scroll the visible tab panel to the top upon
    * activation, if necessary. */
    this.handleDomRef = tabsRef => {
      if (tabsRef !== null) {
        hookupMouseovers();
        const { parentElement } = tabsRef;
        parentElement.scrollTop = 0;
      }
    };
  }

  componentWillMount() {
    const [chunks, titles] = this.parseNarrative();
    this.setState({ chunks, titles });
  }

  parseNarrative() {
    const nar = document.createElement("div");
    nar.innerHTML = this.props.narrative;
    const sections = nar.querySelectorAll("section");
    const chunks = Array.from(sections).map(elt => elt.outerHTML);

    const re = /title=['"][\w\s]+['"]/;
    const titles = [];
    for (let i = 0; i < chunks.length; i += 1) {
      const titleString = re.exec(chunks[i]);
      const pieces = titleString[0].split("=");
      const title = pieces[1].slice(1, -1);
      chunks[i] = chunks[i].replace(`title="${title}"`, "");
      titles.push(title);
    }
    return [chunks, titles];
  }

  render() {
    const narrativeTabList = this.state.titles.map(title => (
      <Tab key={title}>{title}</Tab>
    ));
    const narrativeTabs = this.state.chunks.map(chunk => (
      <TabPanel key={chunk}>
        <Markup tagName="div" allowAttributes content={chunk} />
      </TabPanel>
    ));
    const { updateNarrativeTab } = this.props;
    let { narrativeTab } = this.props;
    narrativeTab = Math.min(narrativeTab, this.state.titles.length - 1);
    return (
      <Tabs
        domRef={this.handleDomRef}
        selectedIndex={narrativeTab}
        onSelect={index => updateNarrativeTab(index)}
      >
        <TabList>{narrativeTabList}</TabList>
        {narrativeTabs}
      </Tabs>
    );
  }
}

TabbedNarrative.propTypes = {
  narrative: PropTypes.string.isRequired,
  narrativeTab: PropTypes.number.isRequired,
  updateNarrativeTab: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateNarrativeTab: index => dispatch(setNarrativeTab(index))
});

const mapStateToProps = state => ({
  narrativeTab: state.narrativeTab
});

export const Unwrapped = TabbedNarrative;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedNarrative);
