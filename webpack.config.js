const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    play: "./webpack/play.jsx",
    section: "./webpack/section.jsx"
  },
  output: {
    path: path.resolve(__dirname, "src/assets/"),
    filename: "[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      }
    })
  ],
  module: {
    loaders: [
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
