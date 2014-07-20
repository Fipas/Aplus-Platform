var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('aplus db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashedPwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;

            salt = createSalt();
            hash = hashPwd(salt, 'fipas');
            User.create({firstName: 'Felipe', lastName: 'Fonseca', username: 'fipas', salt: salt, hashedPwd: hash, roles: ['admin']});

            salt = createSalt();
            hash = hashPwd(salt, 'leozera');
            User.create({firstName: 'Leonardo', lastName: 'Freitas', username: 'leozera', salt: salt, hashedPwd: hash, roles: []});

            salt = createSalt();
            hash = hashPwd(salt, 'leizerlp');
            User.create({firstName: 'Leizer', lastName: 'Pinto', username: 'leizerlp', salt: salt, hashedPwd: hash});
        }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha512', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd)
    hmac.end();
    return hmac.read();
}