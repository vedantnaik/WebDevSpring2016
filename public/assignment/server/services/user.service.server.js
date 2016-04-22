/**
 * Created by vedant on 3/17/16.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){

    var auth = authorized;

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.get("/api/assignment/loggedin", loggedin);


    app.get("/api/assignment/admin/user", auth ,findAllUsers);
    app.put("/api/assignment/user/:id",auth,updateUser);
    app.delete("/api/assignment/admin/user/:id",auth, deleteUser);
    app.post("/api/assignment/admin/user", auth, createUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
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
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }




    function createUser(req,res){
        //console.log("in CREATE USER SERVER SERVICE");
        var newUser = req.body;

        //if(newUser.roles == null || newUser.roles.length < 1) {
        //    newUser.roles.push("student");
        //}

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )

    }

    function findAllUsers(req,res){

        if(isAdmin(req.user)) {

            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403).send("Unautorized access!");
        }
    }



    function updateUser(req,res){
        var newUser = req.body;

        userModel
            .findUserById(newUser._id)
            .then(
                function(resp) {
                    var user = resp;
                    if (user.password !== newUser.password) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                    }
                    userModel
                        .updateUser(req.params.id, newUser)
                        .then(
                            function(user){
                                if(!isAdmin(req.user) || req.session.passport.user._id == req.params.id){
                                    return user;
                                }else{
                                    return userModel.findAllUsers();
                                }

                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        )
                        .then(function(users){
                                res.json(users);
                            },
                            function(err){
                                res.status(400).send(err);
                            });
                });

    }

    function deleteUser(req,res){
        if(isAdmin(req.user)) {

            userModel
                .deleteUser(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {

        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        console.log(newUser.password );
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                console.log("login err");
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(user) {

        if(user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Authentication failed!");
        } else {
            next();
        }
    }
};
