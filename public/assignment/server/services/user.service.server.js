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

    function createUser(req,res){
        console.log("in CREATE USER SERVER SERVICE");
        var user = req.body;
        userModel.createUser(user);

        res.json(userModel.findAllUsers());

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

        console.log("GET USER BY CREDENTIALS");

        var credentials = { "username" : req.query.username,
                            "password" : req.query.password };

        res.json(userModel.findUserByCredentials(credentials));

    }

    function getAllUsers(req,res){
        console.log("in GET ALL USERS");
        res.json(userModel.findAllUsers());

    }

    function getUserByUsername(req,res){
        console.log("GET USER BY USERNAME");
        var username = req.query.username;
        res.json(userModel.findUserByUsername(username));
    }


    function getUserById(req,res){
        console.log("GET USER BY ID " + req.params.id);
        var userId = req.params.id;
        res.json(userModel.findUserById(userId));
    }

    function updateUser(req,res){
        console.log("IN SERVER: UPDATE USER " + req.params.id);
        var user = req.body;
        var userId = req.params.id;
        res.json(userModel.updateUser(userId, user));
    }

    function deleteUser(req,res){
        console.log("DELETE USER " + req.params.id);
        var userId = req.params.id;
        res.json(userModel.deleteUser(userId));
    }


}
