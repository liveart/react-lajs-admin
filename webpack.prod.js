const webpack = require('webpack');
const path = require('path');

module.exports = env => ({
  context: __dirname,

  entry: './client/src/',

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'client/public/dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime', 'transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: true,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
});
