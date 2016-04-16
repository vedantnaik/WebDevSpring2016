/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("F1ExplorerApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, ErgastService, $rootScope, $scope) {

        var vm  = this;

        vm.error = null;
        vm.message = null;
        vm.update = update;
        vm.selectedConstructor = selectedConstructor;

        function init() {

            UserService
                .getCurrentUser()
                .then(function (res) {
                    var userFromServer = res.data;

                    console.log("LOGGED IN USER FROM SERVER INIT PROFILE CONTROLLER");
                    console.log(userFromServer);

                    $rootScope.currentUser = userFromServer;

                    vm.user = userFromServer;
                    vm.userChoosesToSupport = vm.user.supportConstructor;
                    var currentYear = new Date().getFullYear();
                    vm.constructorOptions = [];

                    ErgastService
                        .getConstructorStandingForSeasonRound(currentYear, "last")
                        .then(
                            function (latestSeasonRes) {
                                var currentSeasonList = latestSeasonRes.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                                currentSeasonList
                                    .forEach(
                                        function (constr) {
                                            vm.constructorOptions.push(constr.Constructor.name);
                                        }
                                    );
                            },
                            function (err){
                                // couldn't talk to Ergast
                                vm.constructorOptions = ["Williams", "Haas F1 Team", "Toro Rosso", "Renault", "Mercedes", "Ferrari", "McLaren", "Force India", "Sauber", "Manor Marussia", "Red Bull"]
                            }
                        );

                });
        }
        return init();


        function update(user) {

            //console.log("UPDATE USER IN CONTROLLER: " + vm.user._id);
            vm.error = null;
            vm.message = null;

            user.supportConstructor = vm.userChoosesToSupport;

            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function ( resp ) {
                        if( resp.data ) {
                            UserService.setCurrentUser( resp.data );
                            vm.message = "Your profile was updated successfully!";
                            $rootScope.$broadcast('newUserTheme', resp.data.supportConstructor);
                            $location.url("/profile");
                            //console.log("Your profile was updated successfully!");
                        } else {
                            vm.error = "Unable to update your profile. Try again!";
                            //console.log("Unable to update your profile. Try again!");
                        }
                    });
        }

        function selectedConstructor(constructor){
            vm.userChoosesToSupport = constructor;
        }
    }


})();