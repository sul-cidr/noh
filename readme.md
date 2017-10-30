Noh Theater is a React/Redux Application built on top of Jekyll. It uses yarn for Javascript package management and scripts, and webpack for build processes along with Jekyll's own.

## Setup

Run `bundle install` and `yarn`

## Development

`master` branch is our stable version. `develop` is the current working branch. For features, branch off of `develop` and we will periodically merge develop into master for releases/major updates. 

`yarn dev` will run both webpack and jekyll serve in watch state.

`yarn test` will run all jest tests

`yarn test:update` runs `jest -u` to update test snapshots.

`yarn coverage` runs `jest --coverage` to generate a test coverage report

`yarn lint` run `eslint` with settings per .eslintrc.json.

The project also includes and is set up for prettier. I recommend setting up your text editor to use both eslint and prettier for consistent code formatting.

## Production

`yarn build` runs a production build with webpack along with `jekyll build`
