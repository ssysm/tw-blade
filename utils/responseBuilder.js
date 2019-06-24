module.exports = (error, result) => {
	if (error) {
		return {
			error: true,
			errorMessage: error,
			result: null
		};
	} else {
		return {
			error: false,
			errorMessage: null,
			result: result
		};
	}
};
