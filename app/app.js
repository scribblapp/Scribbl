'use strict';
/*global require, __dirname*/

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/signup', (req, res) => {
    
});

app.post('/signin', (req, res) => {
    
});

app.listen(3000, () => {
    console.log("Up and listening! go to http://localhost:3000");
});
