/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $scope, $location) {

        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (res) {
                    console.log(res.data);
                    vm.user = res.data;
                });
        }
        return init();

        function update(user) {

            vm.error = null;
            vm.message = null;

            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function ( resp ) {
                        if( resp.data ) {
                            UserService.setCurrentUser( resp.data );
                            vm.message = "Your profile was updated successfully!";
                        } else {
                            vm.error = "Unable to update your profile. Try again!";
                        }
                    });
        }

    }

})();