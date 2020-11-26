const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle2.js'
  },
  module: {
    rules:[
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.js$/, use: [path.resolve(__dirname, './src/loaders/1.js')]},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}