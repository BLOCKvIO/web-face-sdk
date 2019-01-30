const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new CopyWebpackPlugin([
      {context: "src", from: "**/*"}
    ], {
      ignore: ["*.js", "*.scss"]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin()
    ],
    usedExports: true,
    sideEffects: true
  },
  devtool: 'source-map',
  // Compile support for ES6 classes
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }, 'eslint-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};





