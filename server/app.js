import { ApiResponse } from './helpers/apiResponse';

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const router = require('./routes/route');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const settings = require('./config/config')(app);
settings.baseDir = __dirname;

// seed data
// require('./models/seed/seederConfig')(settings);

switch (app.get('env')) {
    case 'development':
        // compact, colourful dev logging
        app.use(require('morgan')('dev'));
        break;
    case 'production':
        app.use(require('express-logger')({
            path: __dirname + "/log/requests.txt"
        }));
        break;
}

mongoose.connect(settings.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: 1,
}, (err) => {
    if (!err) return;
    console.log('Database connection error: ')
    console.log(err);
});

// register routes
router(app);

// catch 404
app.use(function (req, res, next) {
    ApiResponse.handleError(res, 404, 'Resource not found');
});

// catch errors
app.use((err, req, res, next) => {
    ApiResponse.handleError(res, err.statusCode || 500, err.message || err);
})

app.listen(settings.port, () => {
    console.log('Task Manager Server started in ' + app.get('env') + 'mode on http://localhost:' + settings.port + '; press Ctrl+c to terminate');
})

module.exports = app;