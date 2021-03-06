/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("F1ExplorerApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, ErgastService, $rootScope, $location) {

        var vm  = this;

        vm.error = null;
        vm.message = null;
        vm.update = update;
        vm.selectedConstructor = selectedConstructor;
        vm.togglePasswordDisplay = togglePasswordDisplay;

        function init() {

            vm.passwordDisplay = false;
            UserService
                .getCurrentUser()
                .then(function (res) {
                    var userFromServer = res.data;

                    $rootScope.currentUser = userFromServer;

                    vm.user = userFromServer;
                    vm.originalUsername = userFromServer.username;
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

            vm.error = null;
            vm.message = null;

            user.supportConstructor = vm.userChoosesToSupport;

            UserService
                .findUserByUsername(user.username)
                .then(
                    function(unameRes){

                        if(vm.originalUsername !== user.username && unameRes.data){
                            vm.message = "Unable to update your profile. The username seems to be taken.";
                            return;
                        }

                        UserService
                            .updateUser(vm.user._id, user)
                            .then(function(res){
                                UserService
                                    .getCurrentUser()
                                    .then(function (resp) {
                                            if( resp.data ) {
                                                vm.message = "Your profile was updated successfully!";
                                                $rootScope.$broadcast('newUserTheme', resp.data.supportConstructor);
                                                $location.url("/profile");
                                            } else {
                                                vm.message = "Unable to update your profile. Try again!";
                                            }
                                        },
                                        function (err) {
                                            vm.message = "Unable to update your profile. Try again!";
                                        });
                            });
                    }
                );
        }

        function selectedConstructor(constructor){
            vm.userChoosesToSupport = constructor;
        }

        function togglePasswordDisplay(){
            vm.passwordDisplay = !vm.passwordDisplay;
        }
    }


})();