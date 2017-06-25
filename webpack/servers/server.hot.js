import config from 'config';
import cors from 'cors';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../configs/config.hot';
import { api } from './api';
import database from './db';
import renderHTML from './renderHTML';

require('css-modules-require-hook')({
  generateScopedName: '[hash:base64:5]',
  camelCase: true
});

const app = express();
const compiler = webpack(webpackConfig);

app.use(cors());
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true
}));
app.use(webpackHotMiddleware(compiler));

app.use('/api/v1', api());

app.use('/*', (req, res) => renderHTML(req, res));

app.listen(config.uri.port, config.hostname, (error) => {
  if (error) {
    console.error(error);
  } else {
    database.connect(config.database.connectionString())
      .then(() => console.info(`==> 🌎 App running on http://${config.uri.hostname}:${config.uri.port}/`));
  }
});
