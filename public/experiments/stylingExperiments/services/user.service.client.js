/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("ProjectPOCApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var model = {
            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ],
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return model;

        function findUserByCredentials(username, password, callback) {
            for (var userIndex in model.users){
                var user = model.users[userIndex];
                if(user.username === username){
                    if(user.password === password){
                        console.log("SUCCESS : " + user);
                        callback(user);
                        return user;
                    }
                }
            }
            return null;
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function findAllUsers(callback){
            callback(model.users);
        }

        function createUser(user, callback){
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

            model.users.push(userToAdd);
            console.log(model.users.length + " added " + userToAdd._id);
            callback(userToAdd);
        }

        function deleteUserById(userId, callback){
            var updatedUserList = [];

            for (var userIndex in model.users) {
                var user = model.users[userIndex];
                if(user._id != userId){
                    updatedUserList.push(user);
                }
            }

            model.users = updatedUserList;
            callback(model.users);
        }

        function updateUser(userId, user, callback){

            for (var userIndex in model.users) {
                if(model.users[userIndex]._id === userId){
                    model.users[userIndex]._id = user._id;

                    if(model.users[userIndex].firstName != user.firstName && user.firstName!= "") {
                        model.users[userIndex].firstName = user.firstName;
                    }
                    if(model.users[userIndex].lastName != user.lastName && user.lastName!= "") {
                        model.users[userIndex].lastName = user.lastName;
                    }
                    if(model.users[userIndex].username != user.username && user.username!= "") {
                        model.users[userIndex].username = user.username;
                    }
                    if(model.users[userIndex].password != user.password && user.password!= "") {
                        model.users[userIndex].password = user.password;
                    }
                    if(model.users[userIndex].roles != user.roles && user.roles!= []) {
                        model.users[userIndex].roles = user.roles;
                    }

                    callback(model.users[userIndex]);
                }
            }

        }
    }
})();
