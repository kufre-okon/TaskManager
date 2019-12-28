var ContactController = require('./contactController');
var TaskController = require('./taskController');

module.exports = function (app) {
    app.use('/contact', ContactController);
    app.use('/task', TaskController);
}