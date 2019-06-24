const express = require('express');
const router = express.Router();
const { Tracker } = require('./../models');
const resBuilder = require('./../utils/responseBuilder');

router.get('/', (req, res) => {
	let { page, limit } = req.query;
	if (page && limit) { page = parseInt(page); limit = parseInt(limit); }
	Tracker
		.find()
		.skip(limit * (page - 1))
		.limit(limit * (page - 1) + limit)
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.post('/single', (req, res) => {
	const { uid, displayName } = req.body;
	Tracker
		.create({ uid, displayName, createdAt: Date.now() }, (err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.delete('/single', (req, res) => {
	const { uid } = req.body;
	Tracker
		.deleteOne({ uid }, (err) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, { deleted: 'ok' }));
			}
		});
});

router.post('/bulk', (req, res) => {
	Tracker.insertMany(req.body.bulk, { ordered: false }, (err, docs) => {
		if (err) {
			res.status(500).send(resBuilder(err, null));
		} else {
			res.send(resBuilder(null, docs));
		}
	});
});

// TODO:Impl Bulk user delete function
router.delete('/bulk', (req, res) => { });

module.exports = router;
