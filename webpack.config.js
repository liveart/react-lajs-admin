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
        loaders: ["babel-loader"]
      }
    ]
  }
};
