/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("ProjectPrototypeApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $scope) {

        var vm  = this;

        vm.error = null;
        vm.message = null;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (res) {
                    var userFromServer = res.data;

                    console.log("LOGGED IN USER FROM SERVER INIT PROFILE CONTROLLER");
                    console.log(userFromServer);

                    $rootScope.currentUser = userFromServer;

                    vm.user = userFromServer;
                });
        }
        return init();


        function update(user) {

            //console.log("UPDATE USER IN CONTROLLER: " + vm.user._id);
            vm.error = null;
            vm.message = null;

            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function ( resp ) {
                        if( resp.data ) {
                            UserService.setCurrentUser( resp.data );
                            vm.message = "Your profile was updated successfully!";
                            //console.log("Your profile was updated successfully!");
                        } else {
                            vm.error = "Unable to update your profile. Try again!";
                            //console.log("Unable to update your profile. Try again!");
                        }
                    });
        }
    }


})();