const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    }),
    new MiniCssExtractPlugin()
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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader?modules&sourceMap&importLoaders=1" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }

        ]
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





