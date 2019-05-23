const users = require('../src/assets/users/fakeUsers.json');
// const bcrypt = require('bcrypt');

module.exports.getUserByUsername = (username, callback) => {
    users.users.forEach((user) => {
        console.log(user);
        if(user.username === username) {
            callback(null, user);
            return;
        }
    });
    callback (null, null);
};

module.exports.comparePasswords = (candidatePassword, hash, callback) => {
    // // use bcrypt here to compare the hashes / passwords
    // bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    //     if(err) throw err;
    //     callback(null, isMatch);
    // });
        callback(null, candidatePassword === hash);
}