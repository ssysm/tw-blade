const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
	displayName: {
		type: String
	},
	nickname: {
		type: String
	},
	followerCount: {
		type: Number
	},
	avatar: {
		type: String
	},
	updatedAt: {
		type: Date
	},
	description: {
		type: String
	}
});
module.exports = ProfileSchema;
