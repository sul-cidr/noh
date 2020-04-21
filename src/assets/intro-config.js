const playSteps = {
  steps: [
    {
      element: "#stepPlayShodanMap",
      intro:
        "The center of navigation is the Shōdan Map consisting of blocks representing the shōdan’s <a href='/IoI/'>Index of Intermedia</a>. Clicking on a block moves the video to the beginning of that shōdan. Sliding the button through the video timeline at the bottom of the video screen updates the time position within the map. Both interactions result in updating the corresponding summary info in the bottom right table."
    },
    {
      element: "#stepPlayShodanLink",
      intro:
        "Clicking on the red link at the top of the table, leads to its intermedia analysis on the Shōdan Level.",
      position: "left"
    },
    {
      element: "#stepPlayNarrativeLinks",
      intro:
        "Clicking on links with this icon moves the video to the beginning of the related shōdan, whereas clicking on an underlined red shōdan's name leads to its intermedia analysis on the Shōdan Level.",
      position: "right"
    }
  ]
};

const shodanSteps = {
  steps: [
    {
      element: "#stepShodanNarrative",
      intro:
        "Comments, analysis, Text and the Shōdan Map are located on this container. It is divided in two: ‘Aspects’ introduces basic comments about the shōdan, while “Intermedia’ presents its intermedia analysis.",
      position: "top"
    },
    {
      element: "#stepShodanLibretto",
      intro:
        "The Text and Shōdan Map sub-sections can be open or collapsed by clicking on the title or the arrow icon. Moreover, the lines of text are clickable and advance the video and score to their matching position within the shōdan."
    },
    {
      element: "#stepShodanShodanMap",
      intro:
        "On the other hand, clicking on a block in the Shōdan Map updates the video to the beginning of the Intermedia analysis of the corresponding shōdan."
    },
    {
      element: "#stepShodanScore",
      intro: "An intermedia score can be found under the video."
    },
    {
      element: "#stepShodanControls",
      intro:
        "The bar offers two methods of navigating within a shōdan. Clicking on either the backward or forward buttons around ‘Sentence’ updates the video and score by increments of sentences or scrolling this slider for increments in seconds."
    },
    {
      element: "#stepShodanFilters",
      intro: "Users can control the layers displayed in the intermedia score."
    }
  ]
};

function startIntro(steps) {
  var intro = introJs();
  intro.setOptions(steps).start();
}
