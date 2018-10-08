
const path = require('path');
const fs = require('fs');

module.exports = {

  /**
   * Minimal build setup.
   * Create your app bundle.
   */

  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'resources', 'scripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc')))
        }
      }
    ]
  },

  /**
   * Minimal development setup.
   * Serves files in ./public folder.
   * Refresh browser automatically when your bundle changes.
   */

  devServer: {
    publicPath: '/resources/scripts/',
    contentBase: path.join(__dirname),
    port: 3000
  }

};