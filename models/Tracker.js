const mongoose = require('mongoose');
const TrackerSchema = new mongoose.Schema({
	displayName: {
		type: String
	},
	uid: {
		type: Number,
		unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	remark: {
		type: String
	},
	tags: [{
		type: String
	}]
});
TrackerSchema.index({
	tags: 'text'
});
const model = mongoose.model('tracker', TrackerSchema);
model.createIndexes();
module.exports = model;
