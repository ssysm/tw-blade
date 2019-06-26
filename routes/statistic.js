const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const resBuilder = require('./../utils/responseBuilder');
const { ProfileSchema } = require('./../models');

router.get('/latest/:id', (req, res) => {
	const { id } = req.params;
	const Profile = mongoose.model('Profile', ProfileSchema, '' + id);
	Profile
		.find()
		.limit(10)
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
	Profile
		.find({
			updatedAt: {
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

router.get('/by/hour/:id', (req, res) => {

});

router.get('/by/day/:id', (req, res) => {

});

router.get('by/month/:id', (req, res) => {

});

router.get('/by/year/:id', (req, res) => {

});

module.exports = router;
