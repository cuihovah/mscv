const _ = require('underscore');
const fs = require('fs');
const path = require('path');

module.exports = function(schema, kv){
    if (kv.value.indexOf('&') >= 0) {
        let src = fs.readFileSync(path.resolve('./src/js/encrypted.js'), 'utf-8') + '\n';
        let template = _.template(src);
        let result = template({
            name: schema.name,
            key: kv.name
        });
        return result;
    }
    return '';
}