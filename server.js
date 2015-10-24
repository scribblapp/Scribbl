'use strict';

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
    console.log("Up and listening! go to http://localhost:3000");
});
