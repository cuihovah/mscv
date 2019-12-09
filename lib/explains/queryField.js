const _ = require('underscore');
// const fs = require('fs');
// const path = require('path');

module.exports = function(schema, lang = 'js'){
    let result = _.pluck(_.filter(schema.kv, function(x){
        return x.value.indexOf('?') >= 0;
    }), 'name');
    return result;
}