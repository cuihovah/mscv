module.exports = function KV(src) {
    this.name = '';
    this.type = '';
    this.key = ''; // 键属性
    this.value = []; // 值属性

    let stag = 'before';
    let value = false;
    for(let ix in src) {
        let char = src[ix];
        if (char.charCodeAt() < 33 || char.charCodeAt > 126) {
            continue;
        }
        if (stag === 'before' && char === ':'){
            stag = 'after';
        }else if (stag === 'before' && ['*', '+', '-', '#', '~'].indexOf(char) >= 0) {
            this.key = char;
            continue;
        } else if (stag === 'before') {
            this.name += char;    
        } else if (stag === 'after' && char === '[') {
            value = true;
        } else if (stag === 'after' && value === false) {
            this.type += char
        } else if (stag === 'after' && char === ']') {
            break;
        } else {
            this.value.push(char);
        }
    }
}