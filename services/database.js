const mongoose = require('mongoose');
const { db } = require('./../config/');
mongoose
	.connect(db.uri, { dbName: db.database, useNewUrlParser: true })
	.then(() => console.info('MongoDB Connected'))
	.catch(err => console.error(err));
