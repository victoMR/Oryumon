var crypto = require('crypto');

function encriptarPassword(password) {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return {
        salt,
        hash
    }
};

function compararPassword(password, hash, salt) {
    var hashEvaluar = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hashEvaluar === hash;

};

// var {salt,hash}=encriptarPassword('123456');
// // console.log(salt);
// console.log(hash);
// console.log(compararPassword('123456',hash,salt));

module.exports = {
    encriptarPassword,
    compararPassword
}