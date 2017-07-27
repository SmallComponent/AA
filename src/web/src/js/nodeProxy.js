module.exports = {
	getPayBody: getPayBody,
};

function getPayBody(path) {
	if(electron) {
		electron.ipcRenderer.send('command', task);
	} else {
		console.log("run:", task);
	}
}
