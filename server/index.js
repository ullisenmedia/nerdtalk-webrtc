var config = require('getconfig');
var express = require('express');

var app = express();

app.use(express.static('../client'));

var signal = require('signal-master')(app);