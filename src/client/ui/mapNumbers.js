exports.mapNumbers = mapNumbers;
exports.withRendererCallback = mapNumbers;

exports.withLocalCallback = function() {
	return mapNumbers(function fnInMain(x) {
		return x + 1;
	});
};

function mapNumbers(mapper) {
	console.log(mapper);
	return [1, 2, 3].map(mapper);
};
