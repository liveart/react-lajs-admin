const webpack = require('webpack');
const node_dir = __dirname + '/node_modules';

module.exports = {
  context: __dirname + "/client/src",

  entry: {
    javascript: "./index.jsx"
  },

  output: {
    filename: "app.js",
    path: __dirname + "/client/dist",
  },

  resolve: {
    alias: {
      react: node_dir + '/react',
      reactDom: node_dir + '/react-dom',
      velocity: node_dir + '/velocity-animate'
    },
    extensions: ['', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
          plugins: ["transform-runtime"]
        }
      }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
