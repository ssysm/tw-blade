const express = require('express');
const router = express.Router();
const { CronLog } = require('./../models');
const resBuilder = require('./../utils/responseBuilder');

router.get('/latest', (req, res) => {
	CronLog
		.find({})
		.limit(60)
		.sort({ finishedAt: -1 })
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.get('/range', (req, res) => {
	const { before, after } = req.query;
	CronLog
		.find({
			finishedAt: {
				$gte: new Date(parseInt(after)),
				$lt: new Date(parseInt(before))
			}
		})
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

module.exports = router;
