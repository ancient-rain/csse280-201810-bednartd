const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const db = require('./model/db');

const routes = require('./routes/index');
const books = require('./routes/books');


const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/', routes);
app.use('/books', books);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use( (err, req, res) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stack traces leaked to user
app.use( (err, req, res) => {
    res.status(err.status || 500);
    res.json( {
        message: err.message,
        error: {}
    });
});

module.exports = app;