/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("F1ExplorerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, ErgastService, $scope, $rootScope, $location){
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.goToSearchPage = goToSearchPage;

        function init(){
            // show the latest driver results on search page

            $scope.latestSeason = new Date().getFullYear();

            ErgastService
                .getRaceResultsInSeason($scope.latestSeason)
                .then(
                    function(res){
                        $scope.latestRound = res.data.MRData.RaceTable.round;
                    }
                );

            $scope.championshipType = "Drivers";

            UserService
                .getCurrentUser()
                .then(function (res) {
                    var userFromServer = res.data;
                    $rootScope.currentUser = userFromServer;
                    setTeamColors(userFromServer.supportConstructor);
                });
        }

        init();

        function logout(){
            $rootScope.currentUser = null;
            UserService.setCurrentUser(null);
            setTeamColors("Ferrari");
        }

        function goToSearchPage(){

            $location.url("/search/"
                        + $scope.latestSeason
                        + "/" + $scope.latestRound
                        + "/" + $scope.championshipType);
        }

        // helpers

        $scope.$on('newUserTheme', function(event, msg) {
            setTeamColors(msg);
        });

        function setTeamColors(constructorTeam) {
            if (constructorTeam == "Mercedes") {
                $scope.teamColorsForUser = 'navbar-team-mercedese';
            } else if (constructorTeam == "Ferrari") {
                $scope.teamColorsForUser = 'navbar-team-ferrari';
            } else if (constructorTeam == "Red Bull") {
                $scope.teamColorsForUser = 'navbar-team-red-bull';
            } else if (constructorTeam == "Force India") {
                $scope.teamColorsForUser = 'navbar-team-force-india';
            } else if (constructorTeam == "Williams") {
                $scope.teamColorsForUser = 'navbar-team-williams';
            } else if (constructorTeam == "Haas F1 Team") {
                $scope.teamColorsForUser = 'navbar-team-haas';
            } else if (constructorTeam == "Toro Rosso") {
                $scope.teamColorsForUser = 'navbar-team-toro-rosso';
            } else if (constructorTeam == "McLaren") {
                $scope.teamColorsForUser = 'navbar-team-mclaren';
            } else if (constructorTeam == "Renault") {
                $scope.teamColorsForUser = 'navbar-team-renault';
            } else if (constructorTeam == "Sauber") {
                $scope.teamColorsForUser = 'navbar-team-sauber';
            } else if (constructorTeam == "Manor Marussia") {
                $scope.teamColorsForUser = 'navbar-team-manor';
            } else {
                $scope.teamColorsForUser = 'navbar-team-ferrari';
            }


        }
    }

})();