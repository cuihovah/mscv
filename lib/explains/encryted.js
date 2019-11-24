const _ = require('underscore');
const queryFields = require('./queryField.js');
const bodyParser = require('./bodyParser.js');

module.exports = function(kv){
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