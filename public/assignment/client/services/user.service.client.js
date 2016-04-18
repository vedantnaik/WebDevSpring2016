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
            getCurrentUser : getCurrentUser,

            logout: logout,
            findUserByID: findUserByID,
            addUser: addUser,
            modifyUser: modifyUser
        };
        return service;

        function findUserByCredentials(user) {
            //console.log("in FIND USER CLIENT SERVICE");
            return $http.post("/api/assignment/login", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
            //console.log("SET CURRENT USER TO");
            //console.log($rootScope.currentUser);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user){
            return $http.post("/api/assignment/register", user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getCurrentUser() {
            //var currentUsername = $rootScope.currentUser.username;
            //console.log("GET CURRENT USER");
            //console.log(currentUsername);
            return $http.get("/api/assignment/loggedin");
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function findUserByID(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function modifyUser(user){
            return $http.put("/api/assignment/admin/user/" + user._id, user);
        }

        function addUser(user){
            return $http.post("/api/assignment/admin/user", user);
        }
    }

})();
