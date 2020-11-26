const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('process.env.NODE_ENV--------', process.env.NODE_ENV)
// module.exports = {
//   mode: 'development',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle2.js'
//   },
//   module: {
//     rules:[
//       { test: /\.txt$/, use: 'raw-loader' },
//       { test: /\.css$/, use: ['style-loader', 'css-loader']},
//       { test: /\.js$/, use: [path.resolve(__dirname, './src/loaders/1.js')]},
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//     })
//   ]
// }

module.exports = (env, arg) => {
  console.log('webpack--------', env, arg)
  return {
    // mode: env.mode == 4 ? 'development' : 'production',
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle2.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': process.env.NODE_ENV_1
      })
    ]
  }
}