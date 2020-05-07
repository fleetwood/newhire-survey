const config = require('./comp/config')
    , browserSync = require('browser-sync')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , express = require('express')
    , favicon = require('serve-favicon')
    , hbs = require('express-hbs')
    , http = require('http')
    , path = require('path')
    , utils = require('./comp/utils')
    , app = express()
    , db = require('./public/data').db
    // route
    , index = require('./routes/index')
    , api = require('./api');

app.use(function (req, res, next) {
    req.rawBody = '';
    req.on('data', (chunk) => req.rawBody += chunk);
    next();
});

app.use(favicon(path.join(__dirname, './', 'peloton.ico')))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up handlebars ready for tabs
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/');
app.use(express.static('public/'));

hbs.registerHelper('guid', function(options) {
    return utils.guid('XXXXXXXX');
});
hbs.registerHelper('eq', function (a,b) {
    return a === b;
});

function listening() {
    index.init(app, db.MappedQuestions.all);
    api.init(app);

    if (config.nodemon) {
        browserSync({
            files: [
                'public/**/*.{html,js,css}',
                'public/**/**/*.{js}',
                'comp/**/**/*.{js}',
                'comp/**/*.{js}',
                '**/*.{js}',
                '*.{js}',
                'views/**/*.{html,hbs}'
            ],
            online: false,
            open: false,
            port: Number(config.port) + 1,
            proxy: config.siteUrl,
            ui: false
        });
    }
};

db.init()
    .then(done => {
        app.listen(config.port, listening);
    })
    .catch(e => {
        console.error(`Unable to initialize db! ${e.message}`);
    });
