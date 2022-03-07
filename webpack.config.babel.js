import path from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';
import Webpack  from 'webpack';

export default {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "web-face-sdk.min.js",
    library: {
      name: 'Blockv',
      type: 'var',
      export: 'default',
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new Webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
