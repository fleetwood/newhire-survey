const DEBUG = false
  , data = require('../public/data')
  , table = data.TABLES.Answers.name;

const log = str => {
  if (DEBUG) {
    console.log(str);
  }
}

log(`SEEDING ${table}...`);
exports.seed = function (knex) {
  let i = 0;
  // Deletes ALL existing entries
  return knex(table).del()
    .then(function () {
      let seeds = data.answers;
      seeds.forEach(a => log(`\tAnswer: "${a.label}"...`));
      return knex(table).insert(seeds);
    });
};
