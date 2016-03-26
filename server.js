var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var public_folder = __dirname + '/public';
var app = express();
var uuid=require('node-uuid');

app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(public_folder));

app.get('/assignment', function(req, res){
    res.sendfile('/assignment/client/index.html');
});

require('./public/assignment/server/app.js')(app, uuid);
require('./public/experiments/projectPrototype/server/app.js')(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname } );
});

app.listen(port, ipaddress);
