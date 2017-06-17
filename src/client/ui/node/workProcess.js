const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

module.exports = startWorkProcess();

function startWorkProcess(){
    let exePath = getNodeFullpath();
    let params = getIndexFileFullpath();

    let fullCommand = exePath + ' ' + params;
    console.log('create work process use:',fullCommand);

    return exec(fullCommand);
}

function getNodeFullpath(){
    let nodePath = path.join(__dirname,'./../../../node/node.exe');
    if(fs.existsSync(nodePath)){
        return nodePath;
    }
    return 'node';
}

function getIndexFileFullpath(){
    return path.join(__dirname,'./../../core/index.js');
}
