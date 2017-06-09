const exec = require('child_process').exec;

const workProcess = exec('node ./core/index.js');

let context = {
	id: 1,
};

let task = {
	command: 'getValidate',
	context: context,
};

command = JSON.stringify(task);

workProcess.stdin.write(command + '\n');
workProcess.stdin.write(command + '\n');
workProcess.stdin.write(command + '\n');

workProcess.stdout.on('data', function(data) {
	console.log(data);
});
