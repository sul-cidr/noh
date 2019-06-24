Noh Theater is a React/Redux Application built on top of Jekyll. It uses yarn for Javascript package management and scripts, and webpack for build processes along with Jekyll's own.

## Setup

Run `bundle install` and `yarn`

## Development

`master` branch is our stable version. `develop` is the current working branch. For features, branch off of `develop` and we will periodically merge develop into master for releases/major updates.

`yarn dev` will run both `webpack` and `jekyll serve` in watch state.

`yarn test` will run all jest tests

`yarn test:update` runs `jest -u` to update test snapshots.

`yarn coverage` runs `jest --coverage` to generate a test coverage report

`yarn lint` runs `eslint` with settings per .eslintrc.json.

`yarn parse` will extract the core data from the PI's speadsheets into json files for the app to consume.

`yarn parse:catalog` will extract the catalog of shodan data from the PI's speadsheets into json files that are used to generate static pages for the site.

The project also includes and is set up for prettier. I recommend setting up your text editor to use both eslint and prettier for consistent code formatting. However, to ensure that files that get into the repo are minimally consistently formatted, the repo is set up to run prettier on any git staged js files.

## Adding new JS bundles/entry-points

Noh Theater uses webpack to handle all JS bundling. To add a new bundle, in `webpack.config.js`, add a new key to the `entry` object with a value pointing to the location of the entry file for that bundle (for example: `./webpack/play.jsx`). Webpack will create a new bundle within `src/assets/` that can be linked to within a Jekyll layout or partial.

## Production

`yarn build` runs a production build with webpack along with `jekyll build`

## HTML structure of analytical narratives for sections and plays

Within the `src` folder of the repo, there are two folders that contain the analytic narratives for the sections: `_hashitomi/narratives` and `_kokaji/narratives`. Within each folder are html files, one for each section of each play. The HTML for each narrative should follow a basic format.

Each chunk that should appear within a tab should go into `<section>` tags. Between the section tags, there should be a `<br />` tag. This tag tells the application to split the content there to create the tabs for the analysis.

For example, the following markup creates a narrative with three tabs:

    <section id='intro' title='Introduction' class='tabbed-narrative'>
        <p>
        Intro. Lorem ipsum dolor sit amet, <time datetime='00:00:10.000' title='00:10:98.987'>consectetur</time> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
    </section>
    <br />
    <section id='part1' title='Part I' class='tabbed-narrative'>
        <p>
        Part I. Lorem ipsum dolor sit amet, <time datetime='00:00:20' title='00:11:98.987'>consectetur</time> adipisicing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </section>
    <br   />
    <section id="part2" title="Part II" class="tabbed-narrative">
        <p>
        Part II. Lorem ipsum dolor sit amet, <time datetime='00:00:30.303' title='00:12:98.987'>consectetur</time> adipisicing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
    </section>

Within the content of each narrative, you can link a chunk of text to a specific time in the video using a `<time>` tag. The `datetime` attribute specifies what time the text should jump the video to, while the content of the `title` attribute will show when the user hovers over the text in the browser.

The analytical text for the plays works the same way, but the files are located in the `src/_plays/narratives` directory. For Hashitomi, the narrative is in `hashitomi.html.md`, while for Kokaji, it is in `kokaji.html.md`.
