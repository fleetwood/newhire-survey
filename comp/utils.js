/////////////////////////////
// REQUIRES
const config = require('./config');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const sqlString = require('sqlstring');
const _ = require('underscore');

/////////////////////////////
// PROTOTYPING
const isUndefined = (type) => {
    return (typeof type === 'undefined');
}

if (isUndefined(String.escapeRegExp)) {
    Object.defineProperty(String.prototype, 'escapeRegExp', {
        value() {
            return this.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }
    });
}

if (isUndefined(String.replaceAll)) {
    Object.defineProperty(String.prototype, 'replaceAll', {
        value(pattern, token) {
            return this.replace(new RegExp(pattern.escapeRegExp(), 'g'), token);
        }
    });
}

if (isUndefined(String.toJson)) {
    Object.defineProperty(String.prototype, 'toJson', {
        value() {
            try {
                return JSON.parse(this);
            }
            catch (e) {
                log(e);
                return {};
            }
        }
    });
}

if (isUndefined(String.toHtmlBr)) {
    /**
     * Replaces '\r\n', '\r', '\n' with <br/>
     */
    Object.defineProperty(String.prototype, 'toHtmlBr', {
        value() {
            return this
                .replaceAll('\r\n', '<br />')
                .replaceAll('\r', '<br />')
                .replaceAll('\n', '<br />');
        }
    });
}

if (isUndefined(Object.toJsonString)) {
    Object.defineProperty(Object.prototype, 'toJsonString', {
        value() {
            return JSON.stringify(this, null, 2);
        }
    });
}

if (isUndefined(Array.sortBy)) {
    /**
     * @param {String} property
     * @returns {Array}
     * 
     * @description Sorts the array by the property. Default ascending, unless set to DESC
     */
    Object.defineProperty(Array.prototype, 'sortBy', {
        value(property) {
            return _.sortBy(this, property);
        }
    })
}

if (isUndefined(Array.dedupe)) {
    Object.defineProperty(Array.prototype, 'dedupe', {
        value(prop) {
            const removeDuplicates = (myArr, prop) => {
                return myArr.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
                });
            };
            return removeDuplicates(this, prop);
        }
    })
}

if (isUndefined(Array.limit)) {
    /**
     * @param {Number} threshold Number of items to return
     * @param {String} sort Sort property (Optional)
     * @param {String} dir Sort direction (Optional)
     * @see {Array.sortBy}
     */
    Object.defineProperty(Array.prototype, 'limit', {
        value(threshold, sort = null, dir = null) {
            let results = [];
            let arr = sort ? this.sortBy(sort,dir) : this;
            while(threshold>0) {
                results.push(arr[threshold-1]);
                threshold--;
            }
            return results;
        }
    })
}

if (isUndefined(Array.mock)) {
    /**
     * Select a random item from the array
     */
    Object.defineProperty(Array.prototype, 'mock', {
        value(limit, mock) {
            for(var i = 0; i < limit; i++) {
                this.push(mock());
            }
            return this;
        }
    });
}

if (isUndefined(Array.random)) {
    /**
     * Select a random item from the array. If limit is set, 
     * will return an array of random items from the array.
     * @param {num} limit Number of items to return
     */
    Object.defineProperty(Array.prototype, 'random', {
        /**
         * Select a random item from the array. If limit is set, 
         * will return an array of random items from the array.
         * @param {num} limit Number of items to return
         */
        value(limit = 1) {
            if (limit == 1) {
                return this[rand(0, this.length-1)];
            }
            let results = [];
            while(limit-=1 > 0) {
                results.push(this.random());
            }
            return results;
        }
    });
}

if(isUndefined(fs.readFileAsync)) {
    // make Promise version of fs.readFile()
    fs.readFileAsync = function (filename, enc = 'utf8') {
        return new Promise(function (resolve, reject) {
            fs.readFile(filename, enc, function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    };
}

if(isUndefined(fs.writeFileAsync)) {
    // make Promise version of fs.readFile()
    fs.writeFileAsync = function (filename, data, enc = 'utf8') {
        return new Promise(function (resolve, reject) {
            try {
                fs.writeFileSync(filename, data, {encoding:enc,flag:'w'});
                resolve(filename);
            }
            catch(error) {
                reject(error);
            }
        });
    };
}
/////////////////////////////
// METHODS

/**
 * @param {Number} x
 * @param {Number} y
 * @description y must be greater than x
 */
const rand = (x = 0, y = 9) => {
    return Math.floor(Math.random() * (y - x) + x);
};

/**
 * 
 * @param {Number} num Number to check
 * @param {Boolean} pos Force a positive integer return (_Default: true_)
 * @returns {Num} Original number, or 0 if _pos_ is true, -1 if false
 * @description Safely return an integer from a non-number value.
 */
const asNum = (num, pos = true) => {
    if (isNaN(num)) {
        return pos ? 0 : -1
    }
    return pos && num < 0 ? num * -1 : num;
}

/**
 * 
 * @param {String} str Safely check for null or undefined strings
 * @returns {String} Original string or null
 */
const stringOrNull = (str) => {
    return str.length ? str.toString() : null;
}

/**
 * 
 * @param {String} filename Absolute path to file
 * @returns {Promise}
 */
const getFile = (filename) => {
    return fs.readFileAsync(filename, 'utf8');
}

/**
 * Salt provides format using provided separator. Lower defaults to _true_.
 * @param {String} salt
 * @param {Boolean} lower default:true
 */
const guid = (salt = 'XXXXXX-99999-XXXXXX', lower = true) => {
    let sep = salt.match(/[^0-9a-zA-Z\d\s:]/);
    sep = sep && sep[0] ? sep[0] : '-';
    const vals = salt.split(sep)
        , alpha = (lower ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('')
        , pad = (val, len) => {
            let res = val.toString();
            while (res.length < len) {
                res = `0${res}`;
            }
            return res;
        };
    return vals.map(r =>
        isNaN(r)
            ? r.split('').map(rm => alpha[rand(0, alpha.length)]).join('')
            : pad(rand(0, r), r.toString().length)
    ).join(sep);
};

const absolutePath = (filepath) => path.join(__dirname, filepath);

/**
 * For formatting dates.
 * @property {String} dateFormats.YYYYMMDD YYYY-MM-DD
 * @property {String} dateFormats.MMDDYYYY MM/DD/YYYY
 * @property {String} dateFormats.MMDD MM/DD
 */
const dateFormats = {
    YYYYMMDD: 'YYYY-MM-DD',
    MMDDYYYY: 'MM/DD/YYYY',
    MMDD: 'MM/DD'
};

const log = (str) => console.log(str);

module.exports = {
    _,
    absolutePath,
    asNum,
    config,
    dateFormats,
    fs,
    getFile,
    guid,
    log,
    moment,
    path,
    rand,
    stringOrNull,
    sqlString
}
