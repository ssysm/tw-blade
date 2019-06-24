const express = require('express');
const router = express.Router();
const FwButton = require('./../providers/followbutton');
const resBuilder = require('./../utils/responseBuilder');
const _fwButton = new FwButton();

router.get('/id/:id', (req, res) => {
	const { id } = req.params;
	_fwButton.getInfoById(id)
		.then(res => res.data)
		.then(data => {
			res.send(resBuilder(null, data[0]));
		})
		.catch(e => {
			console.error(e);
			res.status(500).send(resBuilder(e, null));
		});
});

router.get('/display_name/:name', (req, res) => {
	const { name } = req.params;
	_fwButton.getInfoByDisplayName(name)
		.then(res => res.data)
		.then(data => {
			res.send(resBuilder(null, data[0]));
		})
		.catch(e => {
			console.error(e);
			res.status(500).send(resBuilder(e, null));
		});
});

module.exports = router;
