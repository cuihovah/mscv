const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const queryFields = require('./queryField.js');
const bodyParser = require('./bodyParser.js');
const key = require('./key.js');

module.exports = function(schema, kv){
    let __key = key(schema);
    if (kv.value.indexOf('<<') >= 0) {
        let src = fs.readFileSync(path.resolve('./src/js/check_and_read.js'), 'utf-8') + '\n';
        let template = _.template(src);
        let result = template({
            name: schema.name,
            key: kv.name,
            id: __key.name,
            type: __key.type,
        });
        return result;
    } else if (kv.value.indexOf('<') >= 0) {
        let src = fs.readFileSync(path.resolve('./src/js/read.js'), 'utf-8') + '\n';
        let template = _.template(src);
        let result = template({
            name: schema.name,
            key: kv.name,
            id: __key.name,
            type: __key.type,
        });
        return result;
    }
    return '';
}