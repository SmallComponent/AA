exports.run = run;

function run(task) {
	if(electron){
		electron.ipcRenderer.send('command', task);
	}else{
		console.log("run:",task);
	}
}
