/**
 * Created by vedant on 3/17/16.
 */

var users = require("./user.mock.json");

module.exports = function(){

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user){
        var userToAdd = {};
        userToAdd['_id'] = user.username + (new Date).getTime();

        if (user.firstName) {
            userToAdd['firstName'] = user.firstName;
        }
        if (user.lastName) {
            userToAdd['lastName'] = user.lastName;
        }
        if (user.username) {
            userToAdd['username'] = user.username;
        }
        if (user.password) {
            userToAdd['password'] = user.password;
        }
        if (user.roles) {
            userToAdd['roles'] = user.roles;
        }

        users.push(userToAdd);
        console.log(users.length + " added " + userToAdd._id);
        //callback(users);

        return users;
    }

    function findAllUsers(){
        //callback(users);
        return users;
    }

    function findUserByUsername(username) {
        for (var userIndex in users){
            if(users[userIndex].username === username){
                return users[userIndex];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for (var userIndex in users){
            if(users[userIndex]._id === userId){
                return users[userIndex];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var userIndex in users){
            var user = users[userIndex];
            if(user.username === credentials.username){
                if(user.password === credentials.password){
                    console.log("SUCCESS : found by credentials " + user);
                    //callback(user);
                    return user;
                }
            }
        }
        return null;
    }

    function updateUser(userId, user){

        for (var userIndex in users) {
            if(users[userIndex]._id === userId){
                users[userIndex]._id = user._id;

                if(users[userIndex].firstName != user.firstName && user.firstName!= "") {
                    users[userIndex].firstName = user.firstName;
                }
                if(users[userIndex].lastName != user.lastName && user.lastName!= "") {
                    users[userIndex].lastName = user.lastName;
                }
                if(users[userIndex].username != user.username && user.username!= "") {
                    users[userIndex].username = user.username;
                }
                if(users[userIndex].password != user.password && user.password!= "") {
                    users[userIndex].password = user.password;
                }
                if(users[userIndex].roles != user.roles && user.roles!= []) {
                    users[userIndex].roles = user.roles;
                }

                //callback(users[userIndex]);
            }
        }
    }

    function deleteUser(userId){
        for (var userIndex in users) {
            var user = users[userIndex];
            if(user._id === userId){
                users[userIndex].splice(userIndex, 1);
            }
        }
        //callback(users);
    }

}