const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env, arg) => {
  return {
    mode: 'development',
    entry: {
      'main': './src/index.js',
      'util': './src/util.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   publicPath: '../',
              // }
            },
            'css-loader'
          ]
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      // new ExtractTextPlugin({
      //   filename: 'style.css'
      // })
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name]-test.css',
        insert: function (linkTag) {
          var reference = document.querySelector('#css');
          if (reference) {
            reference.parentNode.insertBefore(linkTag, reference);
          }
        },
        attributes: {
          id: 'target',
          'data-target': 'example'
        }
      })
    ]
  }
}