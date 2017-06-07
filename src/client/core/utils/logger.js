module.exports = {
	log,
	error,
	result,
	status,
	taskResult,
};

function log(messageObject) {
	messageObject.type = 'log';
	notifyUi(messageObject);
}

function error(messageObject) {
	messageObject.type = 'error';
	notifyUi(messageObject);
}

function result(messageObject) {
	messageObject.type = 'result';
	notifyUi(messageObject);
}

function status(messageObject) {
	messageObject.type = 'status';
	notifyUi(messageObject);
}

function taskResult(result) {
	result.type = 'taskResult';
	notifyUi(result);
}

function notifyUi(messageObject) {
	// var objString = console.dir(messageObject);
	var objString = JSON.stringify(messageObject);
	console.log(objString);
}
