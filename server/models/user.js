var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    email: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    sex: String,
    bornDate: Date,
    pictureUrl: String,
    country: { type: String, required: '{PATH} is required!'},
    state: String,
    city: { type: String, required: '{PATH} is required!'},
    institution: String,
    department: String,
    webpageUrl: String,
    classesBelonged: [mongoose.Schema.Types.ObjectId],
    classesCreated: [mongoose.Schema.Types.ObjectId],
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
            User.create({firstName: 'Felipe', lastName: 'Fonseca', email: 'fonsecafel@gmail.com', salt: salt, country: 'Brasil', city: 'Goiânia', hashedPwd: hash, roles: ['admin', 'student']});
            User.create({firstName: 'Leizer', lastName: 'Pinto', email: 'leizerlp@gmail.com', salt: salt, country: 'Brasil', city: 'Goiânia', hashedPwd: hash, roles: ['admin', 'teacher']});
            User.create({firstName: 'Leonardo', lastName: 'dos Santos', email: 'leonardo_freitas1995@gmail.com', salt: salt, country: 'Brasil', city: 'Goiânia', hashedPwd: hash, roles: ['admin', 'student']});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;

