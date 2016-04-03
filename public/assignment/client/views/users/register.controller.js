/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location ) {

        var vm = this;

        vm.message = null;

        vm.register = register;

        function register(user) {

            console.log("register");
            console.log(user);
            vm.message = null;

            if(!user) {vm.message = "Enter necessary details!"; return;}

            if(user.password != user.confirmPassword){
                vm.message = "Passwords do not match. Try Again!";
                return;
            }

            var userToCreate = user;


            UserService
                .findUserByUsername(user.username)
                .then(function(res){
                    if(res.data) {
                        vm.message = "We're sorry, another user has already taken this username! " +
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
                                                alert("Could not find newly created user on server");
                                            });
                                },
                                function ( err ) {
                                    // error creating new user
                                    alert("Unable to create new user. Try Again!");
                                });
                    }
                });




        }
    }

})();