/* global introJs */
const playSteps = {
  steps: [
    {
      element: "#stepPlayShodanMap",
      intro:
        "The center of navigation is the Shōdan Map consisting of blocks representing the shōdan’s <a href='/IoI/'>Index of Intermedia</a>. Shōdan are grouped into <em>dan</em>, which are marked with individual color backgrounds. Hovering over a <em>dan</em> or <em>shōdan</em> shows their name. Clicking on a block moves the video to the beginning of that <em>shōdan</em> in a play. Sliding the time marker in the video updates the time position within the map. Both interactions result in updating the corresponding summary info in the bottom-right table."
    },
    {
      element: "#stepPlayShodanLink",
      intro:
        "Clicking on the red name of the <em>shōdan</em> leads to its detailed intermedia analysis on the Shōdan Level.",
      position: "left"
    },
    {
      element: "#stepPlayNarrativeLinks",
      intro:
        "When in Act I or II tabs, clicking on links with this icon <i class='fas fa-forward'></i> moves the video to the beginning of the associated <em>shōdan</em>. Clicking on a regular link, with a red underlined name of a <em>shōdan</em>, opens a new tab with its detailed intermedia analysis on the Shōdan Level. Rolling over the text highlights the associated blocks in the Shōdan Map.",
      position: "right"
    }
  ]
};

const sectionSteps = {
  steps: [
    {
      element: "#stepShodanNarrative",
      intro:
        "The ‘Aspects’ tab describes the content of individual layers, while ‘Intermedia’ analyzes their interaction.",
      position: "top"
    },
    {
      element: "#stepShodanLibretto",
      intro:
        "The Text sub-section can be opened or collapsed when text is present. The lines of text are clickable to advance the video and score to the line's corresponding position in time."
    },
    {
      element: "#stepShodanShodanMap",
      intro:
        "The Shōdan Map can be opened and collapsed. Clicking on a block switches to that <em>shōdan</em> and updates the video position to its beginning. "
    },
    {
      element: "#stepShodanScore",
      intro:
        "The Intermedia Score updates as the video plays. Hovering over the starting cell in the TEXT line shows who performs it. The vocal parts are marked with green for Shite, orange for Waki, yellow for Wakizure, and red for Jiutai. The PERCUSSION line combines  the parts of kotsuzumi and ōtsuzumi or only of the taiko part, if it is present. Their notation is introduced with the instruments. DANCE line shows names of kata preceded by the <a href='/staging/stage/#Squares'> number indicating the position on stage</a>. NOHKAN line gives names of patterns played. "
    },
    {
      element: "#stepShodanFilters",
      intro:
        "By clicking on FILTERS, the user can choose which layers of the score to display, and whether to include previous and next measures."
    },
    {
      element: "#stepShodanControls",
      intro:
        "The <em>shōdan</em> can be advanced by measure or by using the timeline slider."
    }
  ]
};

window.startIntroPlay = function startIntroPlay() {
  const intro = introJs();
  intro.setOptions(playSteps).start();
};

window.startIntroSection = function startIntroSection() {
  const intro = introJs();
  intro.setOptions(sectionSteps).start();
};
