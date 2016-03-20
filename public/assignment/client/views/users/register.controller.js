/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location ) {
        $scope.register = register;

        function register(user) {

            if(user.password != user.confirmPassword){
                alert("Passwords do not match. Try Again!");

            } else {

                var userToCreate = {
                    "username" : user.username,
                    "password" : user.password,
                    "email" : user.email
                };

                console.log(userToCreate);

                UserService
                    .createUser(userToCreate)
                    .then(
                        function ( resp ){
                            // new user created
                            UserService
                                .findUserByUsername(userToCreate.username)
                                .then(
                                    function ( respGetNewUser ) {
                                        $rootScope.currentUser = respGetNewUser.data;
                                    },
                                    function ( errGettingNewUser ) {
                                        alert("Could not find newly created user on server");
                                    });

                            $location.url("/profile");
                        },
                        function ( err ) {
                            // error creating new user
                            alert("Unable to create new user. Try Again!");
                        });
            }
        }
    }

})();