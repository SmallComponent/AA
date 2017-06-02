const child_process = require('child_process');
const {
	spawn,
	exec,
	fork,
} = child_process;

module.exports = run;

function run(config) {
	console.log('runing...', config);
	// useSpawn();
	// useExec();
	useFork();
}

function useFork() {
	// var child = fork('./../index.js');
	var child = fork('./testRun.js', {
		// execPath: 'C:\\Program Files\\nodejs\\node.exe',
	});

	// console.log(child);

	child.on('message', function(data) {
		console.log('in main:', data);
		child.send('got');
	})
}

function useExec() {
	var exec = require('child_process').exec;
	var child = exec('node ./../index.js');

	child.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	});
	child.stderr.on('data', function(data) {
		console.log('stdout: ' + data);
	});
	child.on('close', function(code) {
		console.log('closing code: ' + code);
	});
}

function useSpawn() {
	var child = spawn("node", ["./../index.js"], {
		// stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
	});

	child.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	});

	child.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});

	child.on('exit', function(code) {
		console.log('child process exited with code ' + code);
	});

}
