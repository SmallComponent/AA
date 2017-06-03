const logger = require('./utils/logger');

let runMulti = require('./runMulti');

process.stdin.on('data', function(chunk) {
	var configString = chunk.toString();
	var config = JSON.parse(configString);

	logger.log({
		action: 'command',
		data: configString,
	});

	runMulti.run(config);
});

process.on('uncaughtException', function(error) {
	logger.error({
		error,
	});
});
