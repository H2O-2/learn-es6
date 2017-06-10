var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/src/chapter-01.js",
  output: {
    path: __dirname + "/lib/",
    filename: "chapter-01.js"
  },

  module: {
    loaders: [        
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime']
        }
      },
    ]
  }
}