const config = require('./../config')
  , _ = require('underscore')
  , filename = config.root('./utils/db/engineering_survey.db')
  , migrations = config.root('./migrations')
  , knexConfig = {
      client: 'sqlite3',
      connection: { filename },
      migrations,
      useNullAsDefault: true
    }
  , knex = require('knex')(knexConfig);

const id = `id`
  , label = 'label'
  , type = 'type'
  , chartName = 'chartName'
  , fkId = (key) => `${key}Id`;

const TABLES = {
  id
  , label
  , type
  , chartName
  , Answers: {
    name: 'Answers'
    , id
    , label
    , chartName
    , rank: 'rank'
  }
  , QuestionTypes: {
    TEXT: 'text'
    , SINGLE: 'single'
    , SCALE: 'scale'
    , MULTI: 'multiple'
  }
  , Questions: {
    name: 'Questions'
    , id
    , label
    , type
    , chartName
  }
  , Respondents: {
    name: 'Respondents'
    , id
    , email: 'email'
    , team: 'team'
    , level: 'level'
    , volunteer: 'volunteer'
  }
  , Results: {
    name: 'Results'
    , id
    , respondentId: fkId('Respondent')
    , questionId: fkId('Question')
    , answerId: fkId('Answer')
    , text: 'text'
  }
  , CHART_TYPES: {
    PIE: 'pie'
    , HORZ: 'horizontalBar'
    , BAR: 'bar'
  }
};


/**
 * 
 * @param fields Properties to select, default '*'
 * @param from Table to select from
 * @param where Conditionals
 */
const select = (params) => new Promise((resolve, reject) => {
  let options = _.extend({
    fields: '*',
    where: {}
  }, params);
  knex
    .select(options.fields)
    .from(options.from)
    .where(options.where)
    .then(r => resolve(r))
    .catch(e => reject(e));
});

/**
 * @param QuestionTypes questionType 
 */
const mapQuestionToChart = questionType => {
  let types = {}
    , QuestionTypes = TABLES.QuestionTypes
    , ChartTypes = TABLES.CHART_TYPES;

    types[QuestionTypes.TEXT] = ChartTypes.TEXT;
    types[QuestionTypes.SINGLE] = ChartTypes.PIE;
    types[QuestionTypes.MULTI] = ChartTypes.HORZ;
    types[QuestionTypes.SCALE] = ChartTypes.BAR;
  return types[questionType] || 'text';
}

module.exports = {
  knex,
  config,
  select,
  mapQuestionToChart,
  TABLES
}