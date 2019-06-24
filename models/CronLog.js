const mongoose = require('mongoose');
const CronLogSchema = new mongoose.Schema({
	date: { type: Date },
	failedList: [{ type: Number }],
	finishedAt: { type: Date }
});
const model = mongoose.model('CronLog', CronLogSchema);
module.exports = model;
