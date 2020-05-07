const knex = require('./knex')
  , Table = require('./Table')
  , Mappings = require('./Mappings')
  , Mapping = Mappings.MappedQuestions;

let isInitialized = false
const Answers = new Table({ knex: knex, tableName: knex.TABLES.Answers.name })
  , Questions = new Table({ knex: knex, tableName: knex.TABLES.Questions.name })
  , Respondents = new Table({ knex: knex, tableName: knex.TABLES.Respondents.name })
  , Results = new Table({ knex: knex, tableName: knex.TABLES.Results.name })
  , MappedQuestions = new Mapping();

const init = () => new Promise((resolve, reject) => {
  Answers.init()
    .then(q => Questions.init())
    .then(r => Respondents.init())
    .then(r => Results.init())
    .then(m => MappedQuestions.init())
    .then(done => {
      isInitialized = true;
      console.log('Intialized!');
      resolve();
    })
    .catch((e) => {
      reject(e);
    });
});

module.exports = {
  knex: knex.knex,
  config: knex.config,
  TABLES: knex.TABLES,
  init,
  isInitialized,
  Answers,
  Questions,
  Respondents,
  Results,
  MappedQuestions
};
