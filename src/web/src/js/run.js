exports.run = run;

function run(task) {
	electron.ipcRenderer.send('command', task);
}
