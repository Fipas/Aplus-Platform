var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encryption.createSalt();
    userData.hashedPwd = encryption.hashPwd(userData.salt, userData.password);

    User.create(userData, function(err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Nome de usuário indisponível');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.send(user);
        })
    })
}