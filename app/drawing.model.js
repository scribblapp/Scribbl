'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * Drawing Schema
 */
var DrawingSchema = new Schema({
    data: {
        type: Buffer
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
    currentTurn: {
        type: String
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

mongoose.model('Drawing', DrawingSchema);
