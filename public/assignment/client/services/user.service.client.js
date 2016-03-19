/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($rootScope, $http) {
        var service = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById,

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return service;

        function findUserByCredentials(username, password) {
            console.log("2");
            console.log("find unme : " + username);

            return $http.get('/api/assignment/user?username='+username+"&password="+password);

        }


        function setCurrentUser(user){
            console.log("set user" + user.username);
            $rootScope.currentUser = user;
        }

        function findAllUsers(){
            return $http.get('/api/assignment/user');
        }

        function createUser(user){
            return $http.post('api/assignment/user',user);
        }

        function deleteUserById(userId){
            return $http.delete('/api/assignment/user/'+userId);
        }

        function updateUser(userId, user){
            return $http.put('/api/assignment/user/'+userId,user);
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }

})();
