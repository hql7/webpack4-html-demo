const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, { publicPath: config.output.publicPath })
);

app.listen(1112, function() {
  console.log('port 1111 open');
});
