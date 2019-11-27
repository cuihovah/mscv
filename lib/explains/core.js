const _ = require('underscore');
const bodyParser = require('./bodyParser.js');
const key = require('./key.js');
const fs = require('fs');
const path = require('path');

module.exports = function(schema){
    let __proj = bodyParser(schema);
    let __key = key(schema);
    let src = fs.readFileSync(path.resolve('./src/js/key.js'), 'utf-8');
    let template = _.template(src);
    let script = template({
        name: schema.name,
        key: __key.name,
        project: JSON.stringify(__proj),
        type: __key.type,
    });
    return script;
}