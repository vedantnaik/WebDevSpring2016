/**
 * Created by vedant on 2/21/16.
 */


(function (){

    angular
        .module("F1ExplorerApp")
        .controller("HomeController", HomeController);

    function HomeController(UserService, FactService, QuizService, ErgastService, $rootScope, $location) {

        var vm  = this;

        vm.goToSearchPage = goToSearchPage;

        vm.userFactCount = 0;
        vm.quizCreatedCount = 0;

        function init() {

            UserService
                .getCurrentUser()
                .then(function (res) {
                    var userFromServer = res.data;

                    $rootScope.currentUser = userFromServer;
                    if (userFromServer) {
                        vm.user = userFromServer;
                        vm.userChoosesToSupport = vm.user.supportConstructor;

                        FactService.findAllFactsForUser(userFromServer._id)
                            .then(
                                function( res ) {
                                    if (res.data) {
                                        vm.userFactCount = res.data.length;
                                    } else {
                                        vm.userFactCount = 0;
                                    }
                                });

                        QuizService
                            .getAllQuizzesForUser(userFromServer._id)
                            .then(
                                function ( res  ){
                                    if (res.data) {
                                        vm.quizCreatedCount = res.data.length;
                                    } else {
                                        vm.quizCreatedCount = 0;
                                    }
                                });
                    } else {
                        vm.userChoosesToSupport = "Ferrari";
                    }
                    var currentYear = new Date().getFullYear();
                    vm.constructorOptions = [];
                    vm.myConstructorStanding = null;
                    vm.teamColorsCard = null;

                    vm.leaderBoard = [];

                    constructorCardClassSetter();

                    UserService
                        .findAllUsers()
                        .then(
                            function (res) {
                                vm.leaderBoard = res.data.sort(
                                    function(a, b) {
                                    return parseInt(b.score) - parseInt(a.score);
                                });

                                vm.completeLeaderBoard = [];

                                var thisUser = null;
                                var rank = 1;
                                vm.leaderBoard
                                    .forEach(
                                        function(lbUser){
                                            lbUser.rank = rank;
                                            rank = rank + 1;

                                            vm.completeLeaderBoard.push(lbUser);

                                            if(vm.user) {
                                                if(vm.user.username == lbUser.username){
                                                    thisUser = lbUser;
                                                }
                                            }
                                        });

                                vm.leaderBoard.splice(10);

                                if(thisUser) {
                                    if (thisUser.rank > 10) {
                                        vm.leaderBoard.push(thisUser);
                                    }
                                }
                            }
                        );

                    ErgastService
                        .getConstructorStandingForSeasonRound(currentYear, "last")
                        .then(
                            function (latestSeasonRes) {
                                var currentSeasonList = latestSeasonRes.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                                vm.latestRaceSeason = latestSeasonRes.data.MRData.StandingsTable.StandingsLists[0].season;
                                vm.latestRaceRound = latestSeasonRes.data.MRData.StandingsTable.StandingsLists[0].round;

                                currentSeasonList
                                    .forEach(
                                        function (constr) {
                                            vm.constructorOptions.push(constr.Constructor.name);

                                            if(constr.Constructor.name == vm.userChoosesToSupport) {
                                                vm.myConstructorStanding = constr.position;
                                                vm.constructorPoints = constr.points;
                                            }
                                        }
                                    );
                            },
                            function (err){
                                // couldn't talk to Ergast
                                vm.constructorOptions = ["Williams", "Haas F1 Team", "Toro Rosso", "Renault", "Mercedes", "Ferrari", "McLaren", "Force India", "Sauber", "Manor Marussia", "Red Bull"]
                                vm.myConstructorStanding = null;
                            }
                        );

                });
        }
        init();

        // helpers
        function constructorCardClassSetter() {
            if (vm.userChoosesToSupport == "Mercedes") {
                vm.teamImageDataSrc = 'images/mercedese_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-mercedese';
            } else if (vm.userChoosesToSupport == "Ferrari") {
                vm.teamImageDataSrc = 'images/ferrari_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-ferrari';
            } else if (vm.userChoosesToSupport == "Red Bull") {
                vm.teamImageDataSrc = 'images/red_bull_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-red-bull';
            } else if (vm.userChoosesToSupport == "Force India") {
                vm.teamImageDataSrc = 'images/force_india_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-force-india';
            } else if (vm.userChoosesToSupport == "Williams") {
                vm.teamImageDataSrc = 'images/williams_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-williams';
            } else if (vm.userChoosesToSupport == "Haas F1 Team") {
                vm.teamImageDataSrc = 'images/haas_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-haas';
            } else if (vm.userChoosesToSupport == "Toro Rosso") {
                vm.teamImageDataSrc = 'images/toro-rosso_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-toro-rosso';
            } else if (vm.userChoosesToSupport == "McLaren") {
                vm.teamImageDataSrc = 'images/mclaren_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-mclaren';
            } else if (vm.userChoosesToSupport == "Renault") {
                vm.teamImageDataSrc = 'images/renault_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-renault';
            } else if (vm.userChoosesToSupport == "Sauber") {
                vm.teamImageDataSrc = 'images/sauber_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-sauber';
            } else if (vm.userChoosesToSupport == "Manor Marussia") {
                vm.teamImageDataSrc = 'images/manor_team_card.jpg';
                vm.teamColorsCard = 'constructor-card-manor';
            } else {
                vm.teamColorsCard = 'constructor-card-ferrari';
                vm.teamImageDataSrc = 'images/ferrari_team_card.jpg';
            }
        }

        function goToSearchPage(){

            $location.url("/search/"
                + vm.latestRaceSeason
                + "/" + vm.latestRaceRound
                + "/Drivers");
        }
    }


})();