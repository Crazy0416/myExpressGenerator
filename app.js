const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('./app/helpers/logHandler');
const errorHandle = require('./app/helpers/errors/errorHandle');

const indexRouter = require('./app/routes/index');
const usersRouter = require('./app/routes/userRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


// mongoDB setup
const mongoHandler = require('./app/helpers/mongooseHandler');
mongoHandler.connect();

// app use setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// url logger
app.use((req, res, next) => {
	res.on('finish', () => {
		logger.info(`${req.method} ${res.statusCode} ${req.originalUrl} -- ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
	});
	next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandle);

module.exports = app;
