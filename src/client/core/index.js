let runMulti = require('./runMulti');

process.stdin.on('data', function(chunk) {
	var configString = chunk.toString();
	var config = JSON.parse(configString);

	console.log('got command', configString);

	runMulti.run(config);
})
