const _ = require('underscore');
const queryFields = require('./queryField.js');
const bodyParser = require('./bodyParser.js');
const key = require('./key.js');
const fs = require('fs');
const path = require('path');

module.exports = function(schema, kv, lang = 'js'){
    let __key = key(schema);
    if (kv.value.indexOf('>>') >= 0) {
        let src = fs.readFileSync(path.resolve(`./src/${lang}/check_and_write.${lang}`), 'utf-8') + '\n';
        let template = _.template(src);
        let result = template({
            name: schema.name,
            key: kv.name,
            id: __key.name,
            type: __key.type,
        });
        return result;
    } else if (kv.value.indexOf('>') >= 0) {
        let src = fs.readFileSync(path.resolve(`./src/${lang}/write.${lang}`), 'utf-8') + '\n';
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