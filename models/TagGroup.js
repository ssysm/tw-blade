const mongoose = require('mongoose');
const TagGroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    members: [{
        type: Number,
        required: true
    }]
});
const model = mongoose.model('TagGroup', TagGroupSchema);
module.exports = model;
