let runner = require('./runner');
const log = require('./logger').log;

exports.run = run;

return void(0);

function run(config) {
	let instanceConfigs = config.instanceConfigs;
	startAll(instanceConfigs)
		.then(showResult)
		.catch(console.log.bind(console));
}

function startAll(instanceConfigs) {
	let process = instanceConfigs.map(context => runner.start(context));
	return Promise.all(process);
}

function showResult(contexts) {
	let results = contexts.map(context => context.status);
	log({
		id: '0',
		type: 'log',
		action: 'done',
	});
}
