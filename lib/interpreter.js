const _ = require('underscore');
const fs = require('fs');
const path = require('path');

module.exports = function(schema){
    let result = '';
    // 
    let projArray = _.pluck(_.filter(schema.kv, function(x){
        return x.value.indexOf('@') >= 0;
    }), 'name');
    let proj = _.object(_.map(projArray, function(x){
        return [x, 1];
    }));
    let key = _.find(schema.kv, function(x){
        return x.key === '*';
    });
    let src = fs.readFileSync(path.resolve('./src/js/key.js'), 'utf-8') + '\n';
    let template = _.template(src);
    let script = template({
        name: schema.name,
        key: key.name,
        project: JSON.stringify(proj)
    });
    result += script;
    for (let kv of schema.kv) {
        if (kv.value.indexOf('&') >= 0) {
            // console.error(kv.name);
            let src = fs.readFileSync(path.resolve('./src/js/encrypted.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name
            });
            result += script;
        }
        if (kv.value.indexOf('^') >= 0) {
            // console.error(kv.name);
            let src = fs.readFileSync(path.resolve('./src/js/check.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name,
                id: key.name
            });
            result += script;
        }
        if (kv.value.indexOf('+') >= 0) {
            let src = fs.readFileSync(path.resolve('./src/js/push.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name,
                id: key.name
            });
            result += script;
        }
        if (kv.value.indexOf('-') >= 0) {
            let src = fs.readFileSync(path.resolve('./src/js/pop.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name,
                id: key.name
            });
            result += script;
        }
        // 写
        if (kv.value.indexOf('>>') >= 0) {
            let src = fs.readFileSync(path.resolve('./src/js/check_and_write.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name,
                id: key.name
            });
            result += script;
        } else if (kv.value.indexOf('>') >= 0) {
            let src = fs.readFileSync(path.resolve('./src/js/write.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name,
                id: key.name
            });
            result += script;
        }
        // 读
        if (kv.value.indexOf('<<') >= 0) {
            let src = fs.readFileSync(path.resolve('./src/js/check_and_read.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name,
                id: key.name
            });
            result += script;
        } else if (kv.value.indexOf('<') >= 0) {
            let src = fs.readFileSync(path.resolve('./src/js/read.js'), 'utf-8') + '\n';
            let template = _.template(src);
            let script = template({
                name: schema.name,
                key: kv.name,
                id: key.name
            });
            result += script;
        }
    }
    return result;
}