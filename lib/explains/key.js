const _ = require('underscore');
const bodyParser = require('./bodyParser.js');
// const fs = require('fs');
// const path = require('path');

module.exports = function(schema, lang = 'js'){
    let result = _.find(schema.kv, function(x){
        return x.key === '*';
    });
    return result;
}