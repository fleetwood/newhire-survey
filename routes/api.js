const init = (app, router, db) => {
    router.get('/api/question/:id', (req, res) => {
        const result = db.Questions.one({ id: Number(req.params.id) });
        res.send(result);
    });
    router.get('/api/questions', (req, res) => {
        res.send(db.Questions.all);
    });
    
    router.get('/api/answer/:id', (req, res) => {
        const result = db.Answers.one({ id: Number(req.params.id) });
        res.send(result);
    });
    router.get('/api/answers', (req, res) => {
        res.send(db.Answers.all);
    });
    
    router.get('/api/respondent/:id', (req, res) => {
        const result = db.Respondents.one({ id: Number(req.params.id) });
        res.send(result);
    });
    router.get('/api/respondents', (req, res) => {
        res.send(db.Respondents.all);
    });
    
    router.get('/api/result/:id', (req, res) => {
        const result = db.Results.one({ id: Number(req.params.id) });
        res.send(result);
    });
    router.get('/api/results', (req, res) => {
        res.send(db.Results.all);
    });
    
    router.get('/api/mapped-questions', (req, res) => {
        res.send(db.MappedQuestions.all);
    });
    
    router.get('/api/mapped-question/:chartName', (req, res) => {
        res.send(db.MappedQuestions.one(req.params.chartName));
    });

    app.use(router);
}

module.exports = {
    init
}