const utils = require('./comp/utils')
    , renderError = require('./comp/utils.rendering').renderError
    , db = require('./comp/db');

const init = (app) => {
    ////////////////////////////////////
    // API Endpoints
    let body = {};

    app.get('/api/question/:id', (req, res) => {
        const result = db.Questions.one({id: Number(req.params.id)});
        res.send(result);
    });
    app.get('/api/questions', (req, res) => {
        res.send(db.Questions.all);
    });

    app.get('/api/answer/:id', (req, res) => {
        const result = db.Answers.one({id: Number(req.params.id)});
        res.send(result);
    });
    app.get('/api/answers', (req, res) => {
        res.send(db.Answers.all);
    });

    app.get('/api/respondent/:id', (req, res) => {
        const result = db.Respondents.one({id: Number(req.params.id)});
        res.send(result);
    });
    app.get('/api/respondents', (req, res) => {
        res.send(db.Respondents.all);
    });

    app.get('/api/result/:id', (req, res) => {
        const result = db.Results.one({id: Number(req.params.id)});
        res.send(result);
    });
    app.get('/api/results', (req, res) => {
        res.send(db.Results.all);
    });

    app.get('/api/mapped-questions', (req, res) => {
        res.send(db.MappedQuestions.all);
    });

    app.get('/api/mapped-question/:chartName', (req, res) => {
        res.send(db.MappedQuestions.one(req.params.chartName));
    });
}

module.exports = {
    init
};
