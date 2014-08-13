var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.createUser = function (req, res, next) {
    var userData = req.body;

    if (userData.password !== userData.passwordRepeat) {
        err = new Error('As senhas digitadas não correspondem!');
        res.status(400);
        return res.send({reason: err.toString()});
    }

    userData.email = userData.username.toLowerCase();
    userData.roles = [userData.access];
    userData.access = undefined;
    userData.username = undefined;
    userData.salt = encryption.createSalt();
    userData.hashedPwd = encryption.hashPwd(userData.salt, userData.password);

    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Email já registrado!');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        })
    })
}

exports.updateUser = function (req, res) {
    var userUpdates = req.body;

    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.username;

    if (userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encryption.createSalt();
        req.user.hashedPwd = encryption.hashPwd(req.user.salt, userUpdates.password);
    }

    req.user.save(function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }

        res.send(req.user);
    });
}