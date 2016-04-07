var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var public_folder = __dirname + '/public';
var app = express();
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var dbName = 'assignment';
var connectionString = 'mongodb://localhost/' + dbName;

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);


app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(public_folder));
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/assignment', function(req, res){
    res.sendfile('/assignment/client/index.html');
});

require('./public/assignment/server/app.js')(app, db, mongoose);
require('./public/experiments/projectPrototype/server/app.js')(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname } );
});

app.listen(port, ipaddress);