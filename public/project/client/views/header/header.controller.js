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
        }


        init();


        UserService
            .getCurrentUser()
            .then(function (res) {
                var userFromServer = res.data;
                $rootScope.currentUser = userFromServer;
            });


        function logout(){
            $rootScope.currentUser = null;
            UserService.setCurrentUser(null);
        }

        function goToSearchPage(){

            $location.url("/search/"
                        + $scope.latestSeason
                        + "/" + $scope.latestRound
                        + "/" + $scope.championshipType);
        }
    }

})();