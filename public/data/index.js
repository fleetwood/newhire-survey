const json = require('./results.json')
    , db = require('./../../comp/db')
    , _ = require('underscore');

let qID = 0
    , aID = 0
    , rID = 0
    , sID = 0;

let answers = []
    , questions = []
    , respondents = []
    , results = [];

json.questions.forEach(q => {
    let rank = 0;
    questions.push({
        id: ++qID,
        label: q.label,
        chartName: q.chartName,
        type: q.type
    });

    if (q.answers) {
        q.answers.forEach(a => {
            answers.push({
                id: ++aID,
                label: a,
                chartName: q.chartName,
                rank: rank++
            });
        });
    }
});

json.results.forEach(result => {
    respondents.push({
        id: ++rID,
        email: result[0],
        team: result[1],
        level: result[2],
        volunteer: result[16]
    });
    for(let i = 0; i < questions.length; i++) {
        let question = questions[i]
            ,   current = result[i]
            ,   questionId = question.id
            ,   respondentId = rID;

        let hasAssociatedAnswer = (
            current !== '' &&
            question.type !== db.TABLES.QuestionTypes.TEXT
        );

        const addResult = (item) => {
            if (item && Array.isArray(item)) {
                item.forEach(r => addResult(r));
            }
            else if(item) {
                results.push(_.extend({
                    id: sID
                    , RespondentId: respondentId
                    , QuestionID: questionId
                }, item));
            }
        }

        const associateAnswer = (chartName, label) => {
            let answer = _.findWhere(answers, {chartName, label});
            if (!answer) {answers.push({
                    id: ++aID,
                    label,
                    chartName,
                    rank: -1
                });
            }
            addResult({AnswerId: aID});
        }

        if (hasAssociatedAnswer) {
            let chartName = question.chartName;
            if (question.type === db.TABLES.QuestionTypes.MULTI) {
                let array = current.split(',');
                array.forEach(a => associateAnswer(chartName, a.replace(/^ /, '')));
            }
            else {
                associateAnswer(chartName, current);
            }
        }
        else {
            addResult({text: current});
        }
    }
    console.log(`Total results: ${results.length}`);
});

module.exports = {
    questions,
    answers,
    respondents,
    results,
    TABLES: db.TABLES,
    db
};
