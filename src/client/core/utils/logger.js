module.exports = {
	log,
	error,
	result,
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

function notifyUi(messageObject) {
	// var objString = console.dir(messageObject);
	var objString = JSON.stringify(messageObject);
	console.log(objString);
}
