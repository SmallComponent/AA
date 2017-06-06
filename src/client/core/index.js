const logger = require('./utils/logger');

let runMulti = require('./runMulti');

process.stdin.on('data', function(chunk) {
	var taskString = chunk.toString();

	var task = JSON.parse(taskString);

	console.log(taskString);

	logger.log({
		action: 'command',
		data: taskString,
	});

	if(task.command === 'run') {
		runMulti.run(task.context);
	}

	if(task.command === 'getValidate') {
		logger.log(task);
		const getValidate = require('./getValidate');
		getValidate(task.context);
	}
});

process.on('uncaughtException', function(error) {
	logger.error({
		error,
	});
});
