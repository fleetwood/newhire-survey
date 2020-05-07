'use strict';
const utils = require('./../utils');
const express = require('express');
const app = express();
const requireAtRoot = (dir) => require(utils.config.root(dir));
const serverless = require('serverless-http');
const db = require('./../public/data').db
const router = express.Router();
const routes = require('./../routes');

db.init()
  .then(() => {
    app.use('/.netlify/functions/server', router);  // path must route to lambda
    routes.init(app, router, db);
});

module.exports = app;
module.exports.handler = serverless(app);
