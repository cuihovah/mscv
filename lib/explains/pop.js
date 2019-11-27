const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const key = require('./key.js')

module.exports = function(schema, kv){
    if (kv.value.indexOf('-') >= 0) {
        let __key = key(schema);
        let src = fs.readFileSync(path.resolve('./src/js/pop.js'), 'utf-8') + '\n';
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