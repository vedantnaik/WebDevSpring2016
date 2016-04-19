/**
 * Created by vedant on 2/21/16.
 */

(function (){
    angular
        .module("F1ExplorerApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $scope, $location, $rootScope){

        var vm = this;

        vm.message = null;
        vm.login = login;

        function login(user){
            vm.message = null;

            if(!user) {vm.message = "Enter username and password!"; return;}
            if(!user.username) {vm.message = "Enter username and password!"; return;}
            if(!user.password) {vm.message = "Enter password!"; return;}

            UserService
                .login(user)
                .then(
                    function( res ){
                        if(res.data){
                            UserService.setCurrentUser(res.data);
                            $rootScope.$broadcast('newUserTheme', res.data.supportConstructor);
                            $location.url("/home");
                        } else {
                            vm.message = "We were unable to authenticate you.";
                        }
                    },
                    function( err ){
                        vm.message = "Unable to Login!";
                        console.log("Unable to login.");
                    }
                );

            //UserService
            //    .findUserByCredentials(user.username, user.password)
            //    .then(
            //        function( res ){
            //            if(res.data){
            //                UserService.setCurrentUser(res.data);
            //                $rootScope.$broadcast('newUserTheme', res.data.supportConstructor);
            //                $location.url("/home");
            //            } else {
            //                vm.message = "Unable to Login!";
            //            }
            //        },
            //        function( err ){
            //            vm.message = "Unable to Login!";
            //            console.log("Unable to login.");
            //        }
            //    );
        }
    }
})();