import express from 'express';
import morgan from 'morgan';

import webpack from 'webpack';
import WebpackConfig from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';

const HOST = 'http://dev.engage.local';

const APP_PORT = 3000;

const ROOT = express.static('app/public');
const DATA_ROOT = express.static('app/data/topics.json');
const BS_STYLE_ROOT = express.static('tmp/bootstrap.css');
const BS_JS_ROOT = express.static('tmp/bootstrap.js');
const JQ_JS_ROOT = express.static('tmp/jquery.js');

// Serve the Relay app
const appCompiler = webpack(WebpackConfig);
const app = new WebpackDevServer(appCompiler, {
  contentBase: '/app/public/',
  hot: true,
  publicPath: WebpackConfig.output.publicPath,
  quiet: false,
  noInfo: false,
  stats: { colors: true },
  historyApiFallback: true,
});

// Serve static resources
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/', ROOT);
app.use('/data/topics.json', DATA_ROOT);
app.use('/css/bootstrap.css', BS_STYLE_ROOT);
app.use('/scripts/bootstrap.js', BS_JS_ROOT);
app.use('/scripts/jquery.js', JQ_JS_ROOT);
app.use('/user/:uuid', ROOT);
app.listen(APP_PORT, () => {
  console.log(`App is now running on ${HOST}:${APP_PORT}`); // eslint-disable-line no-console
});
