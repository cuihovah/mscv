const Schema = require('./schema.js');

module.exports = function(src){
    let name = '';
    let script = '';
    let start = false;
    let result = [];
    for(let ix in src) {
        let char = src[ix];
        if (char.charCodeAt() < 33 || char.charCodeAt > 126) {
            continue;
        }
        if (char === '{') {
            start = true;
            continue;
        }
        if (char === '}') {
            start = false;
            result.push(new Schema(name, script));
            name = '';
            script = '';
            continue;
        }
        if (start === false) {
            name += char;
        } else {
            script += char;
        }
    }
    return result;
}