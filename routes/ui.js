const init = (app, router, db) => {
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Peloton Engineering Survey Results!',
            layout: 'layouts/default',
            questions: db.Questions.all
        });
    });

    app.use(router);
}

module.exports = { init }