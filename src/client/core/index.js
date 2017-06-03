let runMulti = require('./runMulti');

process.stdin.on('data', function(chunk) {
	console.log('got command', chunk.toString());
	runMulti.run();
})
