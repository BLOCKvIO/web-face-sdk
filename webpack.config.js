
//
// WebPack config file

var webpack = require('webpack');

module.exports = {
  plugins: [],
  module: {
    rules: []
  }
}

// The library's starting file
module.exports.entry = "./src/index.js";

// The final app's JS output file
module.exports.output = {
  path: __dirname + "/dist/",
  filename: "web-face-sdk.min.js",
  libraryExport: 'default',
  libraryTarget: "var",
  library:"Blockv"
};

// Output a sourcemap
module.exports.devtool = "source-map";

// Compile support for ES6 classes and React etc
module.exports.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [require("@babel/preset-env")]
  }
});

// Ensure only one file is produced, even if async requiring is used
module.exports.plugins.push(new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}));