'use strict';

let mongoose = require('mongoose');
let passport = require('passport');
let _ = require('lodash');
let LocalStrategy = require('passport-local').Strategy;
let User = mongoose.model('User');
let Image = mongoose.model('Image');

// Serialize sessions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize sessions
passport.deserializeUser((id, done) => {
    User.findOne({
        _id: id
    }, '-salt -password', (err, user) => {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        User.findOne({
            username: username.toLowerCase()
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user || !user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid username or password'
                });
            }

            return done(null, user);
        });
    })
);


exports.signup = (req, res) => {
    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    // Init Variables
    var user = new User(req.body);

    // Add missing user fields
    user.provider = 'local';

    // Then save the user
    user.save(err => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, err => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    });
};

exports.signin = (req, res, next) => {
    console.log(req.user);
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, err => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
};

exports.add = (req, res) => {
    // We really should verify these people against the DB...
    req.body.forEach(function(addition) {
        req.user.friends.push(addition.username);
    });

    User.findOne({
        username: req.user.username
    }).update({
        $set: {
            "friends": req.user.friends
        }
    }, (err, updated) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send("ADDED");
        }
    });
};

exports.list = (req, res) => {
    var friends = {};

    req.user.friends.forEach(friend => {
        friends[friend] = true;
    });

    User.find({}, {
        username: 1
    }, (err, users) => {
        if (err) {
            res.status(400).send(err);
        } else {
            users = _.filter(users, user => {
                return !friends[user.username];
            });

            res.json(users);
        }
    });
};

exports.friends = (req, res) => {
    if (req.user) {
        User.findOne({
            username: req.user.username
        }, (err, user) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(user.friends);
            }
        });
    } else {
        res.json({});
    }
};

function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}

exports.sendMessage = (req, res) => {
    if (req.body.oldId) {
        console.log('Yes');
        Image.update({
            _id: req.body.oldId
        }, {
            $set: {
                responded: true
            }
        }).exec(function(err, updated) {
            if (err) {
                console.log(err);
            }
        });
    }
 
    var image = new Image({
        sharedBy: req.user.username,
        responded: false,
        width: req.body.width,
        height: req.body.height,
        data: req.body.image,
        sharedWith: req.body.recipients[0].username,
        created: new Date(),
        turns: req.body.turns
    });
    
    image.save((err, image) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.jsonp(image);
        }
    });
};

exports.getMessages = (req, res) => {
    Image.find({
        sharedWith: req.user.username,
        responded: false
    }, { data: 0 }).exec((err, messages) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(messages);
            res.json(messages);
        }
    });
};

exports.messageByID = (req, res, next, id) => {
    Image.findOne({
        _id: id
    }, function(err, message) {
        if (err)
            next(err);
        else {
            req.message = message;
            next();
        }
    });
};

exports.getMessage = (req, res) => {
    res.json(req.message);
};
