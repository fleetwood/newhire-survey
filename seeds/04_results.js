const DEBUG = true
    , data = require('../public/data')
    , table = data.TABLES.Results.name;

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
            let seeds = data.results;
            log(`Adding [${seeds.length}] results`);
            return knex(table).insert(seeds);
        });
};
