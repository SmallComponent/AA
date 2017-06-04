exports.run = run;

function run(context) {
	electron.ipcRenderer.send('command', context);
}
