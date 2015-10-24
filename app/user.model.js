'use strict';

let crypto = require('crypto');
let validator = require('validator');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function(email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    friends: {
        type: [{
            type: String
        }]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
