const _ = require('underscore');
const assert = require('assert');

const globalFuncArray = [
    require('./explains/core.js'),
    require('./explains/query.js')
];

const funcArray = [
    require('./explains/encrypted.js'),
    require('./explains/check.js'),
    require('./explains/push.js'),
    require('./explains/pop.js'),
    require('./explains/read.js'),
    require('./explains/write.js')
];

module.exports = function(schema){
    let result = '';
    result += _.map(globalFuncArray, function(func){
        assert(typeof func === 'function', 'The type of func must be a function');
        return func(schema);
    }).join('');
    for (let kv of schema.kv) {
        result += _.map(funcArray, function(func){
            assert(typeof func === 'function', 'The type of func must be a function');
            return func(schema, kv);
        }).join('');
    }
    return result;
}