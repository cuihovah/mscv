const _ = require('underscore');
const queryFields = require('./queryField.js');
const bodyParser = require('./bodyParser.js');

module.exports = function(kv){
    if (kv.value.indexOf('>>') >= 0) {
        let src = fs.readFileSync(path.resolve('./src/js/check_and_write.js'), 'utf-8') + '\n';
        let template = _.template(src);
        let result = template({
            name: schema.name,
            key: kv.name,
            id: key.name
        });
        return result;
    } else if (kv.value.indexOf('>') >= 0) {
        let src = fs.readFileSync(path.resolve('./src/js/write.js'), 'utf-8') + '\n';
        let template = _.template(src);
        let result = template({
            name: schema.name,
            key: kv.name,
            id: key.name
        });
        return result;
    }
    return '';
}