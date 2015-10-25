'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * Image Schema
 */
var ImageSchema = new Schema({
    data: {
        type: String
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    created: {
        type: Date
    },
    responded: {
        type: Boolean
    },
    turns: {
        type: Number  
    },
    sharedBy: {
        // Username
        type: String
    },
    sharedWith: {
        // Username
        type: String
    }
});

mongoose.model('Image', ImageSchema);
