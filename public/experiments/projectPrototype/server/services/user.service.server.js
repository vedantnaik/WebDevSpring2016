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

    function createUser(req,res){
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

        var credentials = { "username" : req.query.username,
                            "password" : req.query.password };

        res.json(userModel.findUserByCredentials(credentials));
    }

    function getAllUsers(req,res){
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
        res.json(userModel.deleteUser(userId));
    }
}
