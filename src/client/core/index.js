const logger = require('./utils/logger');
const parseMessages = require('./utils/utils').parseMessages;

const runMulti = require('./runMulti');

process.stdin.on('data', function(chunk) {
	var taskString = chunk.toString();
	parseMessages(taskString)
		.forEach(runTask);

});

process.on('uncaughtException', function(error) {
	logger.error({
		error,
	});
});

function runTask(task) {
	logger.log({
		action: 'command',
		task: task,
	});

	if(task.command === 'run') {
		runMulti.run(task.context);
	}

	if(task.command === 'getValidate') {
		const getValidate = require('./getValidate');
		getValidate(task.context);
	}
}
