/**
 * Created by vedant on 3/3/16.
 */

(function () {

    angular
        .module("ProjectPOCApp")
        .controller("SearchController", SearchController);

    function SearchController(ErgastService, $scope, $rootScope, $location) {
        console.log("in Quiz Controller");

        $scope.championshipType = 'Drivers Championship';


        $scope.searchStanding = searchStanding;
        $scope.searchDrivers = searchDrivers;
        $scope.setStandingsType = setStandingsType;


        function searchStanding(queryOn){


            if(queryOn.round === "" || !queryOn.round){
                queryOn.round = "last";
            }

            console.log("in search");

            if($scope.championshipType === 'Drivers Championship'){
                ErgastService.getDriverStandingForSeasonRound(queryOn.season, queryOn.round, function(data){
                    $scope.standingsSearchTypeDriver = true;
                    $scope.standingSearchResult = data;
                });
            } else if ($scope.championshipType === 'Constructors Championship'){
                ErgastService.getConstructorStandingForSeasonRound(queryOn.season, queryOn.round, function(data){
                    $scope.standingsSearchTypeDriver = false;
                    $scope.standingSearchResult = data;
                });
            }

        }



        function searchDrivers(season){
            console.log(season);

            ErgastService.getDriversForSeason(season, function(data){
                console.log("in search drivers " + data);
                $scope.driverSearchResult = data;
            });

            console.log("in search drivers " + $scope.driverSearchResult);
        }


        function setStandingsType(typ){
            $scope.championshipType = typ;
        }
    }

})();