/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("F1ExplorerApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var service = {
            createUser: createUser,     // register
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            register: register,

            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials, // used for login
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            getCurrentUser : getCurrentUser,

            login: login,   // should get whole user object
            logout: logout

        };
        return service;

        function login(user) {
            return $http.post('/api/f1explorer/login', user);
        }

        function logout() {
            return $http.post('/api/f1explorer/logout');
        }

        function register(user) {
            return $http.post('/api/f1explorer/register', user);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/f1explorer/user?username='+username+"&password="+password);
        }

        function findUserByUsername(username) {
            return $http.get('/api/f1explorer/user?username='+username);
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
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
