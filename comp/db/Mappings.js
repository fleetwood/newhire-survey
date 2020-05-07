const _ = require('underscore')
    , knex = require('./knex')
    , db = knex.knex;

const answersByChartName = (chartName) => `
SELECT Answers.id
     , Answers.label
     , COUNT(Results.id) as value
FROM Answers
LEFT JOIN Results on Results.AnswerId = Answers.id
WHERE Answers.chartName = "${chartName}"
GROUP BY Answers.id
`;

class MappedQuestion {
    constructor(question, data) {
        _.extend(this, _.extend({
            style: question.type
            , data
        }, question));

        this.type = this.style
            ? knex.mapQuestionToChart(this.style)
            : knex.TABLES.CHART_TYPES.PIE;
    }

    addItem(item) {
        // TODO: Make sure it hasn't already been added...
        this.data.push(item);
    }
}

class MappedQuestions {
    constructor(params) {
        _.extend(this, _.extend({
            questions: []
        }, params));
    }

    //TODO: resolve this correctly!!!!
    mapRows(rows) {
        console.log(`Mapping rows`);
        let i = 0;
        return new Promise((resolve, reject) => {
            rows.forEach(r => {
                return db.raw(answersByChartName(r.chartName))
                    .then(a => {
                        this.addQuestion(new MappedQuestion(r, a));
                        resolve();
                    })
                    .catch(e => reject(e));
                });
            });
    }

    init() {
        return new Promise((resolve, reject) => {
            console.log(`Initializing Mappings...`);
            return db(knex.TABLES.Questions.name)
                .select('*')
                .then(rows => {
                    this.mapRows(rows)
                    .then(resolve());
                })
                .catch(e => {
                    reject(e);
                });
        });
    };

    get all() {
        return this.questions;
    }

    one(chartName) {
        return _.findWhere(this.questions, { chartName });
    }

    addQuestion(mappedQuestion) {
        //TODO: Make sure this isn't already added.
        this.questions.push(mappedQuestion);
    }
}

module.exports = {
    MappedQuestion,
    MappedQuestions
};