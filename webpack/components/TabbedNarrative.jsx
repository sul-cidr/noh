/* eslint-disable react/no-array-index-key */

import React from "react";
import PropTypes from "prop-types";
import { Markup } from "interweave";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class TabbedNarrative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      chunks: null,
      titles: null
    };

    this.handleDomRef = this.handleDomRef.bind(this);
  }

  componentWillMount() {
    const [chunks, titles] = this.parseNarrative();
    this.setState({ chunks, titles });
  }

  /* As an alternative to using findDOMNode() to locate the dummy narrative
   * <div> to scroll up to, use the domRef function callback provided by
   * react-tabs. This function is triggered on every mount event, which
   * includes all tab changes when the component is in controlled mode. */
  handleDomRef(tabsRef) {
    if (tabsRef !== null) {
      /* Assumption: the children of the Tabs component element are always the
       * TabList (a <ul>), followed by the TabPanel <div>s in index order */
      tabsRef.childNodes[this.state.activeTab + 1].firstChild.scrollIntoView();
    }
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
      titles.push(title);
    }

    return [chunks, titles];
  }

  render() {
    const narrativeTabList = this.state.titles.map(title => (
      <Tab key={title}>{title}</Tab>
    ));
    const narrativeTabs = this.state.chunks.map((chunk, index) => (
      <TabPanel key={index}>
        <div className="narrative-scroll_target" />
        <Markup content={chunk} />
      </TabPanel>
    ));
    return (
      <Tabs
        domRef={this.handleDomRef}
        selectedIndex={this.state.activeTab}
        onSelect={activeTab => this.setState({ activeTab })}
      >
        <TabList>{narrativeTabList}</TabList>
        {narrativeTabs}
      </Tabs>
    );
  }
}

TabbedNarrative.propTypes = {
  narrative: PropTypes.string
};

TabbedNarrative.defaultProps = {
  narrative: ""
};

export default TabbedNarrative;
