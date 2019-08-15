const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { TagGroup } = require('./../models');
const resBuilder = require('./../utils/responseBuilder');

router.get('/all', (req, res) => {
    TagGroup
        .find()
        .select('groupName')
        .exec((err, docs) => {
            if (err) {
                res.status(500).send(resBuilder(err, null));
            } else {
                res.send(resBuilder(null, docs));
            }
        });
});

router.get('/detail/group_name/:groupName', (req, res) => {
    const { groupName } = req.params;
    TagGroup
        .find({ groupName })
        .exec((err, docs) => {
            if (err) {
                res.status(500).send(resBuilder(err, null));
            } else {
                res.send(resBuilder(null, docs));
            }
        });
});

router.get('/detail/id/:_id', (req, res) => {
    const { _id } = req.params;
    TagGroup
        .find({ _id: mongoose.Types.ObjectId(_id) })
        .exec((err, docs) => {
            if (err) {
                res.status(500).send(resBuilder(err, null));
            } else {
                res.send(resBuilder(null, docs));
            }
        });
});

// TODO:Implement Push and pop logic
module.exports = router;
