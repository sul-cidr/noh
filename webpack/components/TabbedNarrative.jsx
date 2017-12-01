/* eslint-disable react/no-array-index-key */

import React from "react";
import PropTypes from "prop-types";
import { Markup } from "interweave";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class TabbedNarrative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      narrative: props.narrative
    };
  }

  componentWillMount() {
    this.parseNarrative();
  }

  parseNarrative() {
    // return a list of strings broken on <br>
    const chunks = this.state.narrative.split("<br>");
    return chunks;
  }

  panelTitles() {
    // does this handle multi word titles?
    const chunks = this.parseNarrative();
    const re = /title='[\w\s]+'/;
    const titles = [];
    for (let i = 0; i < chunks.length; i += 1) {
      const titleString = re.exec(chunks[i]);
      const pieces = titleString[0].split("=");
      const title = pieces[1].replace("'", "").replace("'", "");
      titles.push(title);
    }
    return titles;
  }

  render() {
    const chunks = this.parseNarrative();
    const titles = this.panelTitles();
    const narrativeTabList = titles.map(title => (
      <Tab key={title}>{title}</Tab>
    ));
    const narrativeTabs = chunks.map((chunk, index) => (
      <TabPanel key={index}>
        <Markup content={chunk} />
      </TabPanel>
    ));
    return (
      <Tabs>
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
