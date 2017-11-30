const path = require("path");

module.exports = {
  entry: {
    playerFirst: "./webpack/playerFirst.jsx",
    playerSecond: "./webpack/playerSecond.jsx",
    play: "./webpack/play.jsx",
    score: "./webpack/score.jsx"
  },
  output: {
    path: path.resolve(__dirname, "src/assets/"),
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "env", "es2017"]
        }
      }
    ]
  }
};
