/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("ProjectPrototypeApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var service = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            getCurrentUser : getCurrentUser

        };
        return service;

        function findUserByCredentials(username, password) {
            return $http.get('/api/f1explorer/user?username='+username+"&password="+password);
        }

        function findUserByUsername(username) {
            return $http.get('/api/f1explorer/user?username='+username);
        }

        function setCurrentUser(user){
            if(user) {
                $rootScope.currentUser = user;
            } else {
                $http.post('/api/f1explorer/logout');
            }
        }

        function findAllUsers(){
            return $http.get('/api/f1explorer/user');
        }

        function createUser(user){
            return $http.post('/api/f1explorer/user',user);
        }

        function deleteUserById(userId){
            return $http.delete('/api/f1explorer/user/'+userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/f1explorer/user/" + userId, user);
        }

        function getCurrentUser() {
            return $http.get('/api/f1explorer/loggedin');
        }
    }
})();
