/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("F1ExplorerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, ErgastService, $scope, $rootScope, $location ) {

        var vm = this;

        vm.message = null;

        vm.register = register;
        vm.selectedConstructor = selectedConstructor;

        function init() {
            var currentYear = new Date().getFullYear();
            vm.constructorOptions = [];

            ErgastService
                .getConstructorStandingForSeasonRound(currentYear, "last")
                .then(
                    function (latestSeasonRes) {
                        var currentSeasonList = latestSeasonRes.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                        vm.userChoosesToSupport = currentSeasonList[0].Constructor.name;
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

        }

        init();

        function register(user) {

            vm.message = null;

            if(!user) {vm.message = "Enter necessary details!"; return;}

            if(user.password != user.confirmPassword){
                vm.message = "Passwords do not match. Try Again!";
                return;
            }

            var userToCreate = user;
            if(!userToCreate.email) {
                vm.message = "Please enter an email id to register!";
                return;
            }

            user.supportConstructor = vm.userChoosesToSupport;

            UserService
                .findUserByUsername(user.username)
                .then(function(res){
                    if(res.data) {
                        vm.message = "We're sorry, another user has already taken this username! " +
                            "Please try registering with another username.";
                        return;
                    } else {
                        userToCreate.level = 1;

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
                                                $rootScope.$broadcast('newUserTheme', respGetNewUser.data.supportConstructor);
                                                $location.url("/home");
                                            },
                                            function ( errGettingNewUser ) {
                                                vm.message = "Some problem occurred. Please try again later";
                                                alert("Could not find newly created user on server");
                                            });
                                },
                                function ( err ) {
                                    // error creating new user
                                    // alert("Unable to create new user. Try Again!");
                                    vm.message = "Unable to register user. Please try again later.";
                                });
                    }
                });

        }

        function selectedConstructor(constructor){
            vm.userChoosesToSupport = constructor;
        }
    }

})();