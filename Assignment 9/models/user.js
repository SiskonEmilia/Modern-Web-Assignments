var mongodb = require('./db');

function User(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.tel = user.tel;
    this.stuid = user.stuid;
}

module.exports = User;

User.prototype.save = function (callback) {

    var user = {
        username: this.username,
        password: this.password,
        email: this.email,
        tel: this.tel,
        stuid: this.stuid
    };

    mongodb.collection('users', function (err, collection) {
        if (err) {
            return callback(err);
        }
        collection.insert(user, { safe: true }, function (err, user) {
            if (err) {
                return callback(err);
            }
            callback(null, user[0]);
        });
    });
};

User.get = function (user, callback) {
    console.log(user);
    mongodb.collection('user', function (err, collection) {
        console.log('1+');
        if (err) {
            console.log(err);
            return callback(err);
        }
        console.log('1*');
        var found, repeated = {
            username: false,
            stuid: false,
            email: false,
            tel: false
        };
        console.log('1*6');
        console.log(collection.findOne);
        collection.findOne({
            username: user.username
        }, function (err, user) {
            if (err) {
                console.log('1*5');
                return callback(err);
            }
            if (user) {
                found = user;
                repeated.username = true;
            }
        });
        console.log('1*5');
        collection.findOne({
            email: user.email
        }, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (user) {
                found = user;
                repeated.email = true;
            }
        });
        console.log('1*4');
        collection.findOne({
            tel: user.tel
        }, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (user) {
                found = user;
                repeated.tel = true;
            }
        });
        console.log('1*3');
        collection.findOne({
            stuid: user.stuid
        }, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (user) {
                found = user;
                repeated.stuid = true;
            }
        });
        console.log('1*2');
        callback(null, found, repeated);
    })
}
