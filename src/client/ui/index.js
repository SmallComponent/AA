;
(function() {
	$(function() {
		bindHandlers();
	});

	return void(0);

	function bindHandlers() {

		$('#run').click(function() {
			const remote = require('electron').remote;
			var run = remote.require('./run');
			run({
				userName: 'zs',
			});
		});
	}

})();
