import path from 'path';
import {HotModuleReplacementPlugin, NoErrorsPlugin} from 'webpack';

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './app/scripts/index',
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
        loaders: [
          'react-hot',
          'babel?cacheDirectory&optional[]=runtime&stage=0&plugins=./build/babelRelayPlugin',
        ],
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
      data: path.join(__dirname, '/app/data'),
      reducers: path.join(__dirname, '/app/reducers'),
      routes: path.join(__dirname, '/app/routes'),
      utils: path.join(__dirname, '/app/scripts/utils'),
    },
  },
};
