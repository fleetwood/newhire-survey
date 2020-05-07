const path = require('path')
    , express = require('express')
    , hbs = require('express-hbs')
    , root = (dir) => path.resolve(__dirname, './../', dir)
    , partialsDir = root('./views/partials')
    , viewsDir = root('./views/')
    , publicDir = root('./public');

const init = (app) => {
    // set up handlebars ready for tabs
    app.engine('hbs', hbs.express4({ partialsDir }));
    app.set('view engine', 'hbs');
    app.set('views', viewsDir);
    app.use(express.static(publicDir));

    hbs.registerHelper('guid', function (options) {
        return utils.guid('XXXXXXXX');
    });
    hbs.registerHelper('eq', function (a, b) {
        return a === b;
    });
}

module.exports = { init };