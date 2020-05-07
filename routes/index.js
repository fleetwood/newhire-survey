const path = require('path')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, favicon = require('serve-favicon')
, peloIcon = path.resolve(__dirname,'./../peloton.ico')
, hbs = require('./hbs')
, ui = require('./ui')
, api = require('./api')
;

const init = (app, router, db) => {
  app.use((req, res, next) => {
    req.rawBody = '';
    req.on('data', (chunk) => req.rawBody += chunk);
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(favicon(peloIcon));

  hbs.init(app);
  ui.init(app, router, db);
  api.init(app, router, db);
}

module.exports = {
  init
};