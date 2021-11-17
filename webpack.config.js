const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: APP_DIR +'/index.ts',
  output: {
    path: BUILD_DIR,
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
