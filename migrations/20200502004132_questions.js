const db = require('./../comp/db');
const TABLES = db.TABLES
    ,   Questions = TABLES.Questions
    ,   Answers = TABLES.Answers
    ,   Respondents = TABLES.Respondents
    ,   Results = TABLES.Results
    , pkid = (t) => t.integer(TABLES.id).unsigned()
    , label = (t) => t.text(TABLES.label)
    , chartName = (t) => t.text(TABLES.chartName);

exports.up = function (knex) {
    return knex.schema
        .createTable(Questions.name, function (t) {
            pkid(t)
        ,   label(t)
        ,   chartName(t)
        ,   t.text(Questions.type)
        })
        .createTable(Answers.name, function(t) {
            pkid(t)
        ,   label(t)
        ,   chartName(t)
        ,   t.integer(Answers.rank)
        })
        .createTable(Respondents.name, function(t) {
            pkid(t)
        ,   t.text(Respondents.email)
        ,   t.text(Respondents.team)
        ,   t.text(Respondents.level)
        ,   t.text(Respondents.volunteer)
        })
        .createTable(Results.name, function(t) {
            pkid(t)
        ,   t.integer(Results.respondentId)
        ,   t.integer(Results.questionId)
        ,   t.integer(Results.answerId)
        ,   t.text(Results.text)
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists(Results.name)
        .dropTableIfExists(Respondents.name)
        .dropTableIfExists(Answers.name)
        .dropTableIfExists(Questions.name);
};
