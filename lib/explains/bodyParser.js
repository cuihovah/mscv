const _ = require('underscore');
// const fs = require('fs');
// const path = require('path');

module.exports = function(schema, lang){
    let projArray = _.pluck(_.filter(schema.kv, function(x){
        return x.value.indexOf('@') >= 0;
    }), 'name');
    let result = _.object(_.map(projArray, function(x){
        return [x, 1];
    }));
    return result;
}