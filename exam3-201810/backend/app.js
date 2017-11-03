const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const shows = require('./routes/shows');


const app = express();

const dbURI = 'mongodb://localhost/broadwayshows';
mongoose.connect(dbURI, {
    useMongoClient: true
}, () => {
    console.log(`App is connected to mongodb database at ${dbURI}`);
});

const port = process.env.PORT || '4500';

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/api/shows', shows);

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});

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