/**
 * Created by vedant on 2/21/16.
 */

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($rootScope, $http) {
        var service = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserByCredentials: findUserByCredentials,
            loginUserByCredentials: loginUserByCredentials,
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return service;

        function findUserByCredentials(username, password, callback) {

            console.log("find unme : " + username);
            var user = $http.post("/api/assignment/user?username=" + username + "&password=" + password);
            callback(user);
            return user;

        }

        function loginUserByCredentials(username, password) {
            var credentials = {
                username: username,
                password: password
            }

            $http.post("/api/assignment/login", credentials);

            return $http.get('/api/assignment/user?username=' + username);
        }

        function setCurrentUser(user){
            console.log("set user" + user.username);
            $rootScope.currentUser = user;
        }

        function findAllUsers(callback){
            callback($http.get('/api/assignment/user'));
        }

        function createUser(user, callback){

            $http.post("/api/assignment/user", user);

            callback($http.get('/api/assignment/user'));
        }

        function deleteUserById(userId, callback){

            $http.delete("/api/assignment/user/" + userId);

            callback($http.get("/api/assignment/user"));
        }

        function updateUser(userId, user, callback){

            $http.put("/api/assignment/user/" + userId, user);

            callback($http.get('/api/assignment/user/:id', userId));

        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }

})();
