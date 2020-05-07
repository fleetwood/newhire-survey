const DEBUG = false
    , data = require('../public/data')
    , table = data.TABLES.Respondents.name;

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
            let seeds = data.respondents;
            seeds.forEach(r => log(`\t Adding ${r.email}`));
            return knex(table).insert(seeds);
        });
};
