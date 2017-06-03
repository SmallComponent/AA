const child_process = require('child_process');
const {
	spawn,
	exec,
	fork,
} = child_process;

module.exports = run;

function run(config) {
	// console.log('runing...', config);
	// useSpawn();
	useExec(config);
	// useFork();
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

function useExec(config) {
	var win = config.win;
	win = require('./mainWindow');
	var child = exec('node ./../index.js');

	child.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
		win.webContents.send('key', {
			data: data,
		});
	});

	child.stderr.on('data', function(data) {
		// console.log('stdout: ' + data);
		win.webContents.send('key', {
			data: data,
		});
	});

	child.on('close', function(code) {
		// console.log('closing code: ' + code);
		win.webContents.send('key', {
			data: code,
		});
	});

	var writeResult = child.stdin.write(JSON.stringify(config), function() {
		console.log('writeCallback:', arguments);
	});
	console.log('writeResult:', writeResult);
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
