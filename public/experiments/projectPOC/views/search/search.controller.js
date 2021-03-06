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
        $scope.standingsSearchTypeDriver = true;

        $rootScope.dataStoredByUser = false;

        $scope.searchStanding = searchStanding;
        $scope.searchDrivers = searchDrivers;
        $scope.setStandingsType = setStandingsType;

        $scope.storeResult = storeResult;
        $scope.hideResult = hideResult;


        function searchStanding(queryOn){

            if(queryOn.round === "" || !queryOn.round){
                queryOn.round = "last";
            }

            $scope.season = queryOn.season;
            $scope.round = queryOn.round;

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

        function storeResult(index){
            $rootScope.dataStoredByUser = true;

            var recordToPush = {};

            recordToPush.season = $scope.season;
            recordToPush.round = $scope.round;

            if($scope.standingsSearchTypeDriver){

                recordToPush.recordType = 'd';

                recordToPush.position = $scope.standingSearchResult[index].position;
                recordToPush.points = $scope.standingSearchResult[index].points;
                recordToPush.driverUrl = $scope.standingSearchResult[index].Driver.url;
                recordToPush.givenName = $scope.standingSearchResult[index].Driver.givenName;
                recordToPush.familyName = $scope.standingSearchResult[index].Driver.familyName;
                recordToPush.nationality = $scope.standingSearchResult[index].Driver.nationality;
                recordToPush.constructorUrl = $scope.standingSearchResult[index].Constructors[0].url;
                recordToPush.constructorName = $scope.standingSearchResult[index].Constructors[0].name;
            } else {

                recordToPush.recordType = 'c';

                recordToPush.position = $scope.standingSearchResult[index].position;
                recordToPush.points = $scope.standingSearchResult[index].points;
                recordToPush.constructorUrl = $scope.standingSearchResult[index].Constructor.url;
                recordToPush.constructorName = $scope.standingSearchResult[index].Constructor.name;
                recordToPush.nationality = $scope.standingSearchResult[index].Constructor.nationality;
            }

            ErgastService.addToStoredDataSet(recordToPush);
        }



        function hideResult(index){
            $scope.standingSearchResult.splice(index, 1);
        }


        function setStandingsType(typ){
            $scope.championshipType = typ;
        }
    }

})();