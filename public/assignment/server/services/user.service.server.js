/**
 * Created by vedant on 3/17/16.
 */

module.exports=function(app,userModel){

    app.post('api/assignment/user', createUser);
    app.get('/api/assignment/user', getAllUsers);
    app.get('/api/assignment/user/:id', getUserById);
    app.get('/api/assignment/user?username=username', getUserByUsername);
    app.get('/api/assignment/user?username=alice&password=wonderland', getUserByCredentials);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function createUser(req,res){
        var user = req.body;
        userModel.createUser(user);

        userModel.findAllUsers()
            .then(
                function( allUsers ) {
                    res.json(allUsers);
                    res.send(200);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req,res){
        userModel.findAllUsers()
            .then(
                function( allUsers ) {
                    res.json(allUsers);
                    res.send(200);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req,res){
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function( user ) {
                    res.json(user);
                    res.send(200);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req,res){

    }

    function getUserByCredentials(req,res){

    }

    function updateUser(req,res){

    }

    function deleteUser(req,res){


    }



}
