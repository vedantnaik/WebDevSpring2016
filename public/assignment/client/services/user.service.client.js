/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($rootScope, $http, $location) {
        var service = {
            login: login,
            logout: logout,
            register: register,

            createUser : createUser,
            findAllUsers : findAllUsers,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            getCurrentUser: getCurrentUser
        };
        return service;

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }




        function createUser(user){
            return $http.post('/api/assignment/admin/user',user);
        }

        function findAllUsers(){
            return $http.get('/api/assignment/admin/user');
        }

        function deleteUserById(userId){
            return $http.delete('/api/assignment/admin/user/'+userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getCurrentUser() {
            //var currentUsername = $rootScope.currentUser.username;
            //console.log("GET CURRENT USER");
            //console.log(currentUsername);
            return $http.get('/api/assignment/loggedin');
        }
    }

})();