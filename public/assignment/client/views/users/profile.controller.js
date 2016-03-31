/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $scope, $location) {

        var vm = this;

        vm.update = update;

        vm.user = UserService
            .getCurrentUser()
            .then(function( res ){
                console.log(res.data);
                vm.user = res.data;
            });

        function update(user) {
            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function ( resp ) {
                        if( resp.data ) {
                            UserService.setCurrentUser( resp.data );
                        } else {
                            alert ("Unable to udpate user. Try again!");
                        }
                    });
        }

    }

})();