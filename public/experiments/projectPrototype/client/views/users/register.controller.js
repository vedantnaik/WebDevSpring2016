/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("ProjectPrototypeApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location ) {

        var vm = this;

        vm.errorMessage = null;

        vm.register = register;

        function register(user) {

            vm.errorMessage = null;

            if(!user) {vm.errorMessage = "Enter necessary details!"; return;}

            if(user.password != user.confirmPassword){
                vm.errorMessage = "Passwords do not match. Try Again!";
                return;
            }

            var userToCreate = user;
            if(!userToCreate.email) {
                vm.errorMessage = "Please enter an email id to register!";
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .then(function(res){
                    if(res.data) {
                        vm.errorMessage = "We're sorry, another user has already taken this username! " +
                            "Please try registering with another username.";
                        return;
                    } else {
                        UserService
                            .createUser(userToCreate)
                            .then(
                                function ( resp ){
                                    // new user created
                                    UserService
                                        .findUserByUsername(userToCreate.username)
                                        .then(
                                            function ( respGetNewUser ) {
                                                UserService.setCurrentUser(respGetNewUser.data);
                                                $location.url("/profile");
                                            },
                                            function ( errGettingNewUser ) {
                                                vm.errorMessage = "Some problem occurred. Please try again later";
                                                alert("Could not find newly created user on server");
                                            });
                                },
                                function ( err ) {
                                    // error creating new user
                                    // alert("Unable to create new user. Try Again!");
                                    vm.errorMessage = "Unable to register user. Please try again later.";
                                });
                    }
                });

        }
    }

})();