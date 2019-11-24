const _ = require('underscore');
const queryFields = require('./queryField.js');
const bodyParser = require('./bodyParser.js')
const fs = require('fs');
const path = require('path');

module.exports = function(schema){
    let __queryFields = queryFields(schema);
    let __proj = bodyParser(schema);
    let src = fs.readFileSync(path.resolve('./src/js/query.js'), 'utf-8') + '\n';
    let template = _.template(src);
    let result = template({
        name: schema.name,
        list: JSON.stringify(__queryFields),
        project: JSON.stringify(__proj)
    });
    return result;
}