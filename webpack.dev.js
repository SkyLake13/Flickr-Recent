const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: common.dist,
    inline: true, // Enable watch and live reload
    host: "localhost",
    port: 8080
  }
});