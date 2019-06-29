const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const lookupRouter = require('./routes/lookup');
const trackerRouter = require('./routes/tracker');
const statisticRouter = require('./routes/statistic');
const eventRouter = require('./routes/event');
const logRouter = require('./routes/log');

const app = express();
require('./services/database');
require('./services/cron');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/lookup', lookupRouter);
app.use('/tracker', trackerRouter);
app.use('/statistic', statisticRouter);
app.use('/event', eventRouter);
app.use('/log', logRouter);

module.exports = app;
