/**
 * Created by vedant on 3/17/16.
 */

var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){

    var admin = isAdmin;
    var auth = authenticate;

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", getCurrentUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.put("/api/assignment/admin/user/:id", admin, modifyUser);
    app.get("/api/assignment/user", findUserByUsername);
    app.get("/api/assignment/admin/user", admin, findAllUsers);
    app.post("/api/assignment/register", createUser);
    app.post("/api/assignment/admin/user", admin, addUser);
    app.get("/api/assignment/admin/user/:userId", admin, findUserByID);
    app.delete("/api/assignment/admin/user/:id", admin, deleteUser);
    app.post("/api/assignment/logout", logout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );


    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserByID(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function getCurrentUser(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function createUser(req, res){
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
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


    function addUser(req, res){
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
            for (var role in newUser.roles){
                newUser.roles[role] = newUser.roles[role].trim();
            }
        } else {
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user == null) {
                        return userModel.createUser(newUser)
                            .then(
                                function () {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res){
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findUserByID(req, res){
        userModel.findUserByID(req.params.userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res){
        userModel.findUserByUsername(req.params.username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function modifyUser(req, res){
        var newUser = req.body;
        if (newUser.roles.length > 2) {
            newUser.roles = newUser.roles.split(",");
            for (var role in newUser.roles){
                newUser.roles[role] = newUser.roles[role].trim();
            }
        }
        else {
            newUser.roles = ["student"]
        }
        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var newUser = req.body;
        for (var email in newUser.emails){
            newUser.emails[email] = newUser.emails[email].trim();
        }
        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteUser(req, res){
        userModel
            .deleteUser(req.params.id)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated()  && req.user.roles.indexOf("admin") > 0) {
            next();
        } else {
            res.status(403);
        }
    }

    function authenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

}
