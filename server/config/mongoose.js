var mongoose = require('mongoose'),
    userModel = require('../models/user'),
    classModel = require('../models/class');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('aplus db opened');
    });

    userModel.createDefaultUsers();
    classModel.createDefaultClass();
};
