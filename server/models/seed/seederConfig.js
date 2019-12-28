const seeder = require('mongoose-seed');
const path = require('path');

module.exports = function (settings) {

    seeder.connect(settings.connectionString, function () {
        let dir = path.join(settings.baseDir, 'models');
        seeder.loadModels([
            dir + '/status.js',
            dir + '/priority.js',
            dir + '/country.js'
        ]);

        seeder.clearModels(['Status', 'Priority', 'Country'], function () {
            seeder.populateModels(require('./seed'), function () {
                seeder.disconnect();
            })
        })
    })
}