const exec = require('child_process').exec;

const workProcess = exec('node ./core/index.js');

let context = {};

let task = {
	command: 'getValidate',
	context: context,
};

command = JSON.stringify(task);

workProcess.stdin.write(command);

workProcess.stdout.on('data', function(data) {
	console.log(data);
});
