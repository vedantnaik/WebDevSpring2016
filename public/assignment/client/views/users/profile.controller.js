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
                    var userFromServer = res.data;
                    if(userFromServer.phones) {
                        userFromServer.phones = makeCsvStringFromArray(userFromServer.phones);
                    }
                    vm.user = userFromServer;
                });
        }
        return init();

        function update(user) {

            console.log("UPDATE USER IN CONTROLLER: " + vm.user._id);
            vm.error = null;
            vm.message = null;

            user.phones = splitByCommaAndTrim(user.phones);
            //user.email = splitByCommaAndTrim(user.email);

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