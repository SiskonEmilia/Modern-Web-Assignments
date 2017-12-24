var mongoCilent = require('./db');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'assignment9';
const assert = require('assert');

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

    mongoCilent.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
    
        const db = client.db(dbName);

        db.collection('users', function (err, collection) {
            if (err) {
                return callback(err);
            }

            collection.insertOne(user, function (err, users) {
                if (err) {
                    return callback(err);
                }
                callback(null, users.ops[0]);
            });
        });
    
        client.close();
    });
};

User.get = function (user, callback) {

    mongoCilent.connect(url, function(err, client) {
        assert.equal(null, err);
      
        const db = client.db(dbName);

        db.collection('users', function (err, collection) {
            if (err) {
                return callback(err);
            }
            console.log('finding user:')
            console.log(user);
            var found, repeated = {
                username: false,
                stuid: false,
                email: false,
                tel: false
            };
    
            collection.findOne({
                username: user.username
            }, function (err, userFound) {
                if (err) {
                    client.close();
                    return callback(err);
                }
                console.log('username found');
                if (userFound) {
                    found = userFound;
                    repeated.username = true;
                }

                collection.findOne({
                    email: user.email
                }, null, function (err, userFound) {
                    if (err) {
                        client.close();
                        return callback(err);
                    }
    
                    console.log('email found');
                    if (userFound) {
                        found = userFound;
                        repeated.email = true;
                    }

                    collection.findOne({
                        tel: user.tel
                    }, null, function (err, userFound) {
                        if (err) {
                            client.close();
                            return callback(err);
                        }
                        console.log('tel found');
                        if (userFound) {
                            found = userFound;
                            repeated.tel = true;
                        }

                        collection.findOne({
                            stuid: user.stuid
                        }, null, function (err, userFound) {
                            if (err) {
                                client.close();
                                return callback(err);
                            }
                            console.log('stuid found');
                            if (userFound) {
                                found = userFound;
                                repeated.stuid = true;
                            }
                            callback(null, found, repeated);
                            client.close();
                        });
                    });

                });

            });
            
        })
        
      });
    
}
