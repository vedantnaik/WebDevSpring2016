/**
 * Created by vedant on 3/17/16.
 */

module.exports = function(app, userModel){

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', getUsersAll);

    app.get('/api/assignment/user?username=username&password=password', getUserByCredentials);
    app.get('/api/assignment/user?username=username', getUserByUsername);
    app.get('/api/assignment/user/:id', getUserById);

    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    function createUser(req,res){
        //console.log("in CREATE USER SERVER SERVICE");
        var user = req.body;

        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function getUsersAll(req, res){
        //console.log("in FIND USER ALL SERVER SERVICE");
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
        //console.log("in GET USER BY CREDENTIALS SERVER SERVICE");
        var credentials = { "username" : req.query.username,
                            "password" : req.query.password };

        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function getAllUsers(req,res){
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function getUserByUsername(req,res){
        var username = req.query.username;
        userModel
            .findUserByUsername(req.query.username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }


    function getUserById(req,res){
        var userId = req.params.id;
        var user = model.findUserById(userId)
                        .then(
                            function(doc) {
                                res.json(doc);
                            },
                            function(err) {
                                res.status(400).send(err);
                            }
                        );

    }

    function updateUser(req,res){
        var user = req.body;
        var userId = req.params.id;
        var userId = req.params.id;
        var user = req.body;
        userModel
            .updateUser(userId, user)
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
