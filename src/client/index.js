let runMulti = require('./core/runMulti');

process.stdin.on('data', function(chunk) {
	console.log(chunk.toString());
	runMulti.run();
})
