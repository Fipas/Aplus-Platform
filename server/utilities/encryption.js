var crypto = require('crypto');

exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
}

exports.hashPwd = function(salt, pwd) {
    var hmac = crypto.createHmac('sha512', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd)
    hmac.end();
    return hmac.read();
}