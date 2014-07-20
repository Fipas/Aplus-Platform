var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH} is required!'},
    hashedPwd: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;

            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'fipas');
            User.create({firstName: 'Felipe', lastName: 'Fonseca', username: 'fipas', salt: salt, hashedPwd: hash, roles: ['admin']});

            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'leozera');
            User.create({firstName: 'Leonardo', lastName: 'Freitas', username: 'leozera', salt: salt, hashedPwd: hash, roles: []});

            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'leizerlp');
            User.create({firstName: 'Leizer', lastName: 'Pinto', username: 'leizerlp', salt: salt, hashedPwd: hash});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;

