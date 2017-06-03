exports.run = run;

function run(config) {
	electron.ipcRenderer.send('command', config);
}
