const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: "src/favicon/**",
          to: "",
          flatten: true
        },
        {
          from: "data/**",
          to: "",
          flatten: false
        },
        {
          from: "node_modules/vanilla-back-to-top/dist/vanilla-back-to-top.min.js",
          to: "assets"
        },
        {
          from: "node_modules/intro.js/minified/intro.min.js",
          to: "assets"
        },
        {
          from: "node_modules/intro.js/minified/introjs.min.css",
          to: "assets"
        }
      ],
      { copyUnmodified: true }
    )
  ]
};
