/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($rootScope, $http, $location) {
        var service = {
            createUser : createUser,
            updateUser : updateUser,
            deleteUserById : deleteUserById,

            findUserByUsername: findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,

            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser
        };
        return service;

        function findUserByCredentials(username, password) {
            return $http.get('/api/assignment/user?username='+username+"&password="+password);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username='+username);
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function findAllUsers(){
            return $http.get('/api/assignment/user');
        }

        function createUser(user){
            return $http.post('/api/assignment/user',user);
        }

        function deleteUserById(userId){
            return $http.delete('/api/assignment/user/'+userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getCurrentUser() {
            var currentUsername = $rootScope.currentUser.username;
            return $http.get('/api/assignment/user?username='+currentUsername);
        }
    }

})();
