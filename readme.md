# Noh as Intermedia

Noh as Intermedia is a React/Redux application built on top of Jekyll. It uses yarn for Javascript package management and scripts, and webpack for build processes along with Jekyll's own.

## Setup

Run `bundle install --path vendor/bundle` and `yarn`

## Development

`master` branch is our stable version. `develop` is the current working branch. For features, branch off of `develop` and we will periodically merge develop into `master` for releases/major updates.

`yarn dev` will run both `webpack` and `jekyll serve` in watch state.

`yarn test` will run all jest tests.

`yarn test:update` runs `jest -u` to update test snapshots.

`yarn coverage` runs `jest --coverage` to generate a test coverage report.

`yarn lint` runs `eslint` with settings per .eslintrc.json.

`yarn parse` will extract the core data from the PI's speadsheets into json files for the app to consume.

`yarn parse:catalog` will extract the catalogs of shōdan and kata (movement) data from the PI's speadsheets into json files that are used to generate static pages for the site.

`contents` is the branch that is deployed to the staging version of the site. Additions and edits to the long-form static scholarly content of the site -- play narratives, essays, descriptions -- are made to the markdown and HTML files here. The `develop` branch is merged into `contents` before deploying a site update.

The project also includes and is set up for prettier. We recommend setting up your text editor to use both eslint and prettier for consistent code formatting. However, to ensure that files that get into the repo are minimally consistently formatted, the repo is set up to run prettier on any git staged js files.

## Adding new JS bundles/entry-points

Noh as Intermedia uses webpack to handle all JS bundling. To add a new bundle, in `webpack.config.js`, add a new key to the `entry` object with a value pointing to the location of the entry file for that bundle (for example: `./webpack/play.jsx`). Webpack will create a new bundle within `src/assets/` that can be linked to within a Jekyll layout or partial.

## Production

`yarn build` runs a production build with webpack along with `jekyll build`.

## HTML structure of analytical narratives for sections and plays

Within the `src` folder of the repo, there are two folders that contain the analytic narratives for the sections: `_hashitomi/narratives/` and `_kokaji/narratives/`. Within each folder are html files, one for each section of each play. The HTML for each narrative should follow a basic format.

Each chunk that should appear within a tab should go into `<section>` tags. This tag tells the application to split the content there to create the tabs for the analysis.

For example, the following markup creates a narrative with three tabs:

    <section id='intro' title='Introduction' class='tabbed-narrative'>
        <p>
        Intro. Lorem ipsum dolor sit amet, <time datetime='00:00:10.000' title='00:10:98.987'>consectetur</time> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
    </section>
    <section id='part1' title='Part I' class='tabbed-narrative'>
        <p>
        Part I. Lorem ipsum dolor sit amet, <time datetime='00:00:20' title='00:11:98.987'>consectetur</time> adipisicing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </section>
    <section id="part2" title="Part II" class="tabbed-narrative">
        <p>
        Part II. Lorem ipsum dolor sit amet, <time datetime='00:00:30.303' title='00:12:98.987'>consectetur</time> adipisicing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
    </section>

The analytical text for the plays works the same way, but the files are located in the `src/_plays/narratives/` directory. For Hashitomi, the narrative is in `hashitomi.html`, while for Kokaji, it is in `kokaji.html`.

Templates are available for inserting various components into the "Level 0" static scholarly content (tabs, tables, images, video and audio players) and into the "Level 1" and "Level 2" interactive portions of the site (video links, tabs, tables of contents). See the [wiki](https://github.com/sul-cidr/noh/wiki/List-of-HTML-components) for further documentation.
