module.exports = {
	parseMessages,
};

function parseMessages(data) {
	return data.split(/\n|\r/ig)
		.filter(message => !!message.trim())
		.map(message => {
			try {
				return JSON.parse(message);
			} catch(e) {
				return message;
			}
		});
}
