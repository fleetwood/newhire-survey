const _ = require('underscore');

class Table {
    /**
     * 
     * @param knex Location to knex
     * @param tableName Name of the table
     */
    constructor(options) {
        _.extend(this, {_initalized: false,_results: []});
        _.extend(this, options);
    }

    init() {
        return new Promise((resolve, reject) => {
            console.log(`Initializing ${this.tableName}...`);
            return this.knex
                .select({ from: this.tableName })
                .then(results => {
                    this._all = results;
                    this._initalized = true;
                    console.log(`\tInitialized ${this.all.length} ${this.tableName}`);
                    resolve();
                })
                .catch(e => {
                    console.error(`Error in Table '${this.tableName}: ${e.message}`);
                    reject(e);
                });
        });
    }

    get initialized() {
        return this._initalized;
    }

    get all() {
        return this._all || [];
    }

    one(param) {
        try {
            return _.findWhere(this.all, param);
        }
        catch (e) {
            console.error(`Failed one(${param}: ${e.message})`);
            return {};
        }
    }
}

module.exports = Table;