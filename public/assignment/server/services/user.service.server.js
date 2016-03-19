/**
 * Created by vedant on 3/17/16.
 */

module.exports = function(app, userModel){

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', getAllUsers);
    app.get('/api/assignment/user/:id', getUserById);
    app.get('/api/assignment/user?username=username', getUserByUsername);
    app.get('/api/assignment/user?username=username&password=password', getUserByCredentials);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function createUser(req,res){
        console.log("in CREATE USER SERVER SERVICE");
        var user = req.body;
        userModel.createUser(user);

        res.json(user);
        //userModel.findAllUsers()
        //    .then(
        //        function( allUsers ) {
        //            res.json(allUsers);
        //            res.send(200);
        //        },
        //        function( err ) {
        //            res.status(400).send(err);
        //        }
        //    );
    }

    function getAllUsers(req,res){
        console.log("in GET ALL USERS");
        res.json(userModel.findAllUsers());
        //userModel.findAllUsers()
        //    .then(
        //        function( allUsers ) {
        //            res.json(allUsers);
        //            res.send(200);
        //        },
        //        function( err ) {
        //            res.status(400).send(err);
        //        }
        //    );
    }

    function getUserById(req,res){


        var userId = req.params.id;

        res.json(userModel.findUserById(userId));

        //userModel.findUserById(userId)
        //    .then(
        //        function( user ) {
        //            res.json(user);
        //            res.send(200);
        //        },
        //        function( err ) {
        //            res.status(400).send(err);
        //        }
        //    );
    }

    function getUserByUsername(req,res){

        var username = req.query.username;

        res.json(userModel.findUserByUsername(username));
        //userModel.findUserByUsername(username)
        //    .then(
        //        function ( user ) {
        //            res.json(user);
        //            res.send(200);
        //        }, function ( err ) {
        //            res.send(400).send(err);
        //        }
        //    );


    }

    function getUserByCredentials(req,res){

        console.log("in server user service ");

        var credentials = { "username" : req.query.username,
                            "password" : req.query.password };

        console.log("find  2  unme : " + credentials.username);

        res.json(userModel.findUserByCredentials(credentials));

        //userModel.findUserByCredentials(credentials)
        //    .then(
        //        function ( user ) {
        //            res.json(user);
        //            res.send(200);
        //        }, function ( err ) {
        //            res.send(400).send(err);
        //        }
        //    );
    }

    function updateUser(req,res){

        var user = req.body;
        var userId = req.params.id;

        userModel.updateUser(userId, user);

        res.send(200);

        //userModel.updateUser(userId, user)
        //    .then(
        //        function ( doc ){
        //            res.send(200);
        //        },
        //        function ( err ){
        //            res.send(400).send(err);
        //        }
        //    );

    }

    function deleteUser(req,res){

        var userId = req.params.id;

        userModel.deleteUser(userId, user);

        res.json(200);
        //userModel.deleteUser(userId, user)
        //    .then(
        //        function ( doc ){
        //
        //            userModel.findAllUsers()
        //                .then(
        //                    function( allUsers ) {
        //                        res.json(allUsers);
        //                        res.send(200);
        //                    },
        //                    function( err ) {
        //                        res.status(400).send(err);
        //                    }
        //                );
        //
        //        },
        //        function ( err ){
        //            res.send(400).send(err);
        //        }
        //    );

    }


}
