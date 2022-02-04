const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PUBLIC_DIR = path.resolve(__dirname, 'public');
const DIST_DIR = path.resolve(__dirname, 'dist/bouncing-balls');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: APP_DIR +'/index.ts',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html',
    chunks: "all",
  })]
};

module.exports = config;
