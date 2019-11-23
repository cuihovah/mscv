const fs = require('fs');
const path = require('path');
const engine = require('../lib/engine.js');
const interpreter = require('../lib/interpreter.js');

function run(){
    let filePath = path.resolve(process.argv[2]);
    let script = fs.readFileSync(filePath, 'utf-8');
    let result = engine.scanner(script);
    for (let sch of result) {
        let scripts = sch.script.split(',');
        for (let scr of scripts) {
            let x = new engine.KV(scr);
            sch.kv.push(x);
            
            // console.log(res);
            // console.log(JSON.stringify(x, '\t', 3));
        }
        delete sch.script;
        let res = interpreter(sch);
        console.log(res);
    }
    // console.log(JSON.stringify(result, '\t', 3));

}

run();