const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
	name: {
		type: String
	},
	announceDate: {
		type: Date
	},
	startDate: {
		type: Date
	},
	weight: {
		type: Number
	},
	assignedTag: [{
		type: String
	}],
	assignedUID: [{
		type: Number
	}]
});
const model = mongoose.model('event', EventSchema);
module.exports = model;
