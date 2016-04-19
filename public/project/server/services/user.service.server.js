/**
 * Created by vedant on 3/17/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require("mongoose");

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){

    var auth = authorized;
    app.post('/api/f1explorer/login', passport.authenticate('local'), login);
    app.post('/api/f1explorer/logout', logout);
    app.post('/api/f1explorer/register', register);

    app.post('/api/f1explorer/user', createUser);
    app.get('/api/f1explorer/user', getUsersAll);

    app.get('/api/f1explorer/user?username=username&password=password', getUserByCredentials);
    app.get('/api/f1explorer/user?username=username', getUserByUsername);
    app.get('/api/f1explorer/user/:id', getUserById);

    app.put('/api/f1explorer/user/:id', updateUser);
    app.delete('/api/f1explorer/user/:id', deleteUser);

    app.get('/api/f1explorer/loggedin', loggedin);
    app.post('/api/f1explorer/logout', logout);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (userResp) {
                    var user = userResp;
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (userResp) {
                    done(null, userResp);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var newUser = req.body;

        console.log("1. "+newUser.username);
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    console.log(user);
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    console.log("register5");
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        req.login(user, function(err){
                            if(err){
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createUser(req,res){
        var user = req.body;
        userModel.createUser(user)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUsersAll(req, res){
        if (req.query.username && req.query.password){
            return getUserByCredentials(req, res);
        } else if (req.query.username) {
            return getUserByUsername(req, res);
        } else if (req.params.id) {
            return getUserById(req, res);
        } else {
            return getAllUsers(req, res);
        }
    }

    function getUserByCredentials(req,res){
        var credentials = { "username" : req.query.username,
                            "password" : req.query.password };

        userModel.findUserByCredentials(credentials)
            .then(
                function( doc ){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function( err ){
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req,res){
        userModel.findAllUsers()
            .then(
                function( users ){
                    res.json(users);
                },
                function( err ){
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req,res){
        var username = req.query.username;

        userModel.findUserByUsername(username)
            .then(
                function( doc ){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function( err ){
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req,res){
        var userId = req.params.id;

        userModel.findUserById(userId)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req,res){
        console.log("update user");
        var userToUpdate = req.body;
        var userId = req.params.id;

        userModel
            .findUserById(userId)
            .then(
                function(resp){
                    var user = resp;
                    if (user.password !== userToUpdate.password){
                        userToUpdate.password = bcrypt.hashSync(userToUpdate.password);
                    }

                    userModel
                        .updateUser(userId, userToUpdate)
                        .then(
                            function (doc) {
                                req.session.currentUser = doc;
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function(err){

                }
            );



    }

    function deleteUser(req,res){
        var userId = req.params.id;

        userModel.deleteUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        //console.log("give back loggedin user "+req.session.currentUser.username);
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function authorized (req,res,next){
        if(!req.isAuthenticated())
        {
            res.send(401);   //Not authenticated so return error code
        }
        else{
            next();
        }
    };

}
