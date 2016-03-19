/**
 * Created by vedant on 3/17/16.
 */

module.exports = function(app, userModel){

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user?username=username&password=password', getUserByCredentials);

    app.get('/api/assignment/user', getAllUsers);
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

    function getUserByCredentials(req,res){

        console.log("in server user service ");

        var credentials = { "username" : req.query.username,
            "password" : req.query.password };

        console.log("find  2  unme : " + credentials.username);

        res.json(userModel.findUserByCredentials(credentials));

    }

    function getAllUsers(req,res){
        console.log("in GET ALL USERS");
        res.json(userModel.findAllUsers());

    }

    function getUserByUsername(req,res){
        var username = req.query.username;
        res.json(userModel.findUserByUsername(username));
    }


    function getUserById(req,res){
        var userId = req.params.id;
        res.json(userModel.findUserById(userId));
    }

    function updateUser(req,res){
        var user = req.body;
        var userId = req.params.id;
        res.json(userModel.updateUser(userId, user));
    }

    function deleteUser(req,res){
        var userId = req.params.id;
        res.json(userModel.deleteUser(userId, user));
    }


}
