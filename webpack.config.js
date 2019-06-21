const path = require("path");

module.exports = {
  entry: {
    play: "./webpack/play.jsx",
    section: "./webpack/section.jsx"
  },
  output: {
    path: path.resolve(__dirname, "_site/"),
    filename: "assets/[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "env"]
        }
      }
    ]
  }
};
