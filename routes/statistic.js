const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const resBuilder = require('./../utils/responseBuilder');
const pipeline = require('./../utils/aggrePipeline');
const { ProfileSchema } = require('./../models');

router.get('/latest/:id', (req, res) => {
	const { id } = req.params;
	const Profile = mongoose.model('Profile', ProfileSchema, '' + id);
	const localPipeline = pipeline;
	Profile
		.aggregate(localPipeline)
		.limit(60)
		.sort({ updatedAt: -1 })
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.get('/by/min/:id', (req, res) => {
	const { id } = req.params;
	const { before, after } = req.query;
	const Profile = mongoose.model('Profile', ProfileSchema, '' + id);
	let localPipeline = pipeline;
	localPipeline.unshift({
		'$match': {
			updatedAt: {
				$gte: new Date(parseInt(after)),
				$lt: new Date(parseInt(before))
			}
		}
	});
	Profile
		.aggregate(localPipeline)
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.get('/by/hour/:id', (req, res) => {
	const { id } = req.params;
	const { before, after } = req.query;
	const Profile = mongoose.model('Profile', ProfileSchema, '' + id);
	let localPipeline = pipeline;
	localPipeline.unshift({
		'$match': {
			updatedAt: {
				$gte: new Date(parseInt(after)),
				$lt: new Date(parseInt(before))
			}
		}
	});
	localPipeline.push({
		'$match': {
			'minute': 0
		}
	});
	Profile
		.aggregate(localPipeline)
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.get('/by/day/:id', (req, res) => {
	const { id } = req.params;
	const { before, after } = req.query;
	const Profile = mongoose.model('Profile', ProfileSchema, '' + id);
	let localPipeline = pipeline;
	localPipeline.unshift({
		'$match': {
			updatedAt: {
				$gte: new Date(parseInt(after)),
				$lt: new Date(parseInt(before))
			}
		}
	});
	localPipeline.push({
		'$match': {
			'minute': 0,
			'hour': 0
		}
	});
	Profile
		.aggregate(localPipeline)
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.get('by/month/:id', (req, res) => {
	const { id } = req.params;
	const { before, after } = req.query;
	const Profile = mongoose.model('Profile', ProfileSchema, '' + id);
	let localPipeline = pipeline;
	localPipeline.unshift({
		'$match': {
			updatedAt: {
				$gte: new Date(parseInt(after)),
				$lt: new Date(parseInt(before))
			}
		}
	});
	localPipeline.push({
		'$match': {
			'minute': 0,
			'hour': 0,
			'day': 1
		}
	});
	Profile
		.aggregate(localPipeline)
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

router.get('/by/year/:id', (req, res) => {
	const { id } = req.params;
	const { before, after } = req.query;
	const Profile = mongoose.model('Profile', ProfileSchema, '' + id);
	let localPipeline = pipeline;
	localPipeline.unshift({
		'$match': {
			updatedAt: {
				$gte: new Date(parseInt(after)),
				$lt: new Date(parseInt(before))
			}
		}
	});
	localPipeline.push({
		'$match': {
			'minute': 0,
			'hour': 0,
			'day': 1,
			'month': 1
		}
	});
	Profile
		.aggregate(localPipeline)
		.exec((err, docs) => {
			if (err) {
				res.status(500).send(resBuilder(err, null));
			} else {
				res.send(resBuilder(null, docs));
			}
		});
});

module.exports = router;
