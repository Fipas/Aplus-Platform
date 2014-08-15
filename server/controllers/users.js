var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.getUser = function (req, res) {
    User.findOne({_id: req.params.id}).exec(function (err, data) {
        res.send(data);
    })
};

exports.createUser = function (req, res, next) {
    var userData = req.body;

    if (userData.password !== userData.passwordRepeat) {
        var err = new Error('As senhas digitadas não correspondem!');
        res.status(400);
        return res.send({reason: err.toString()});
    }

    if (userData.access == 'teacher') {
        userData.availableClassIds = [1, 2, 3, 4, 5];
    }

    userData.email = userData.username.toLowerCase();
    userData.roles = [userData.access];
    userData.salt = encryption.createSalt();
    userData.hashedPwd = encryption.hashPwd(userData.salt, userData.password);

    userData.access = undefined;
    userData.username = undefined;


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
            user.salt = undefined;
            user.hashedPwd = undefined;
            res.send(user);
        })
    })
}

exports.updateUser = function (req, res) {
    var userUpdates = req.body;

    User.findById(userUpdates._id, function(err, data) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }

        //if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        //    res.status(403);
        //    return res.end();
        //}

        if (userUpdates.password && userUpdates.password.length > 0) {
            data.salt = encryption.createSalt();
            data.hashedPwd = encryption.hashPwd(data.salt, userUpdates.password);
        }

        data.firstName = userUpdates.firstName || data.firstName;
        data.lastName = userUpdates.lastName || data.lastName;
        data.email = userUpdates.email || data.email;
        data.sex = userUpdates.sex || data.sex;
        data.bornDate = userUpdates.bornDate || data.bornDate;
        data.pictureUrl = userUpdates.pictureUrl || data.pictureUrl;
        data.country = userUpdates.country || data.country;
        data.institution = userUpdates.institution || data.institution;
        data.department = userUpdates.department || data.department;
        data.webpageUrl = userUpdates.webpageUrl || data.webpageUrl;
        data.classesEntered = userUpdates.classesEntered || data.classesEntered;
        data.classesEnteredPending = userUpdates.classesEnteredPending || data.classesEnteredPending;
        data.classesCreated = userUpdates.classesCreated || data.classesCreated;
        data.availableClassIds = userUpdates.availableClassIds || data.availableClassIds;
        data.roles = userUpdates.roles || data.roles;

        data.email = data.email.toLowerCase();

        data.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }

            data.salt = undefined;
            data.hashedPwd = undefined;
            res.send(data);
        });
    });
}