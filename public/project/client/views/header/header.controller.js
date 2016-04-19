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

            UserService
                .logout()
                .then(
                    function(res){
                        $rootScope.currentUser = null;
                        setTeamColors("Ferrari");
                        $location.url("/home");
                    }
                );
            //$rootScope.currentUser = null;
            //UserService.setCurrentUser(null);
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
                $rootScope.teamColorsForUser = 'navbar-team-mercedese';
            } else if (constructorTeam == "Ferrari") {
                $rootScope.teamColorsForUser = 'navbar-team-ferrari';
            } else if (constructorTeam == "Red Bull") {
                $rootScope.teamColorsForUser = 'navbar-team-red-bull';
            } else if (constructorTeam == "Force India") {
                $rootScope.teamColorsForUser = 'navbar-team-force-india';
            } else if (constructorTeam == "Williams") {
                $rootScope.teamColorsForUser = 'navbar-team-williams';
            } else if (constructorTeam == "Haas F1 Team") {
                $rootScope.teamColorsForUser = 'navbar-team-haas';
            } else if (constructorTeam == "Toro Rosso") {
                $rootScope.teamColorsForUser = 'navbar-team-toro-rosso';
            } else if (constructorTeam == "McLaren") {
                $rootScope.teamColorsForUser = 'navbar-team-mclaren';
            } else if (constructorTeam == "Renault") {
                $rootScope.teamColorsForUser = 'navbar-team-renault';
            } else if (constructorTeam == "Sauber") {
                $rootScope.teamColorsForUser = 'navbar-team-sauber';
            } else if (constructorTeam == "Manor Marussia") {
                $rootScope.teamColorsForUser = 'navbar-team-manor';
            } else {
                $rootScope.teamColorsForUser = 'navbar-team-ferrari';
            }
        }
    }

})();