/**
 * Created by vedant on 3/17/16.
 */

module.exports = function(app, userModel){

    app.post('/api/f1explorer/user', createUser);
    app.get('/api/f1explorer/user', getUsersAll);

    app.get('/api/f1explorer/user?username=username&password=password', getUserByCredentials);
    app.get('/api/f1explorer/user?username=username', getUserByUsername);
    app.get('/api/f1explorer/user/:id', getUserById);

    app.put('/api/f1explorer/user/:id', updateUser);
    app.delete('/api/f1explorer/user/:id', deleteUser);

    app.get('/api/f1explorer/loggedin', loggedin);
    app.post('/api/f1explorer/logout', logout);

    function createUser(req,res){
        var user = req.body;
        userModel.createUser(user)
            .then(
                function( doc ) {
                    console.log("USER CREATED user.service.server.js");
                    console.log(doc);
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
                    console.log("FOUND USER BY CREDENTIALS user.service.server.js");
                    console.log(doc);
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
                    console.log("FOUND USER BY USERNAME user.service.server.js");
                    console.log(doc);
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
        var user = req.body;
        var userId = req.params.id;

        userModel
            .updateUser(userId, user)
            .then(
                function (doc) {
                    console.log("UPDATED USER user.service.server.js");
                    console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
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
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}
