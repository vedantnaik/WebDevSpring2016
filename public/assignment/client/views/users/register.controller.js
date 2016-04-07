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

            //console.log("register");
            //console.log(user);
            vm.message = null;

            if(!user) {vm.message = "Enter necessary details!"; return;}

            if(user.password != user.confirmPassword){
                vm.message = "Passwords do not match. Try Again!";
                return;
            }

            var userToCreate = user;
            if(userToCreate.emails) {
                //userToCreate.emails = splitByCommaAndTrim(userToCreate.emails);
                //console.log(userToCreate.emails);
                userToCreate.emails = [userToCreate.emails];
            } else {
                vm.message = "Please enter an email id to register!";
                return;
            }

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


        /**
         * Takes a comma separated value string and returns an array with each part
         * without spaces
         * */
        function splitByCommaAndTrim(csvString){
            var csvParts = csvString.split(",");
            var arrToReturn = [];

            for(var p in csvParts){
                arrToReturn.push(csvParts[p].trim());
            }
            return arrToReturn;
        }

        function makeCsvStringFromArray(arr){
            var strToReturn = "";
            for(var a in arr){
                strToReturn = strToReturn + ", " + arr[a];
            }
            return strToReturn.substr(2);
        }
    }

})();