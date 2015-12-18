import path from 'path';
import {HotModuleReplacementPlugin, NoErrorsPlugin} from 'webpack';

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './app/src/main',
  ],
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: '/',
    pathInfo: true,
    publicPath: '/scripts/',
  },
  resolve: {
    alias: {
      actions: path.join(__dirname, '..', '/app/src/actions'),
      data: path.join(__dirname, '..', '/app/data'),
      reducers: path.join(__dirname, '..', '/app/src/reducers'),
      components: path.join(__dirname, '..', '/app/src/components'),
      utils: path.join(__dirname, '..', '/app/src/utils'),
    },
  },
};
