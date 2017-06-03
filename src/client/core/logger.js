exports.log = log;

function log(msessage) {
	console.log(JSON.stringify(msessage, null, 4));
}
