const DEBUG = false
  , data = require('../public/data')
  , table = data.TABLES.Questions.name;

const log = str => {
  if (DEBUG) {
    console.log(str);
  }
}

exports.seed = function (knex) {
  log(`SEEDING ${table}...`);
  // Deletes ALL existing entries
  return knex(table).del()
    .then(function () {
      // Inserts seed entries
      let seeds = data.questions;
      return knex(table).insert(seeds);
    });
};
