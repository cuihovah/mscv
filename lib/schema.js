function Schema(name, script){
    this.name = name;
    this.script = script;
    this.kv = [];
}

module.exports = Schema;