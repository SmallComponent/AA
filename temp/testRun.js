console.log('test runing...');

console.log(console.read());
// require('node-libcurl');

process.on('message', function(m) {
	console.log('CHILD got message:', m);
});

process.send({
	foo: 'bar'
});
