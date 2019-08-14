import React from "react";
import PropTypes from "prop-types";
import { Markup } from "interweave";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class TabbedNarrative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chunks: null,
      titles: null
    };

    /* This function is triggered on all tab changes, as well as some other
    * events. It is used to scroll the visible tab panel to the top upon
    * activation, if necessary. */
    this.handleDomRef = tabsRef => {
      if (tabsRef !== null) {
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
        <Markup content={chunk} />
      </TabPanel>
    ));
    return (
      <Tabs domRef={this.handleDomRef}>
        <TabList>{narrativeTabList}</TabList>
        {narrativeTabs}
      </Tabs>
    );
  }
}

TabbedNarrative.propTypes = {
  narrative: PropTypes.string.isRequired
};

export default TabbedNarrative;
