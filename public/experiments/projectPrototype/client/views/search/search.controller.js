/**
 * Created by vedant on 3/3/16.
 */

(function () {

    angular
        .module("ProjectPrototypeApp")
        .controller("SearchController", SearchController);

    function SearchController(ErgastService, FactService, $rootScope, $location) {
        console.log("in Quiz Controller");

        var vm = this;
        
        vm.championshipType = 'Drivers Championship';
        vm.standingsSearchTypeDriver = true;

        $rootScope.dataStoredByUser = true;

        vm.searchStanding = searchStanding;
        vm.searchDrivers = searchDrivers;
        vm.setStandingsType = setStandingsType;

        vm.storeResult = storeResult;
        vm.hideResult = hideResult;


        function searchStanding(queryOn){

            if(!queryOn.round || queryOn.round === ""){
                queryOn.round = "last";
            }

            vm.season = queryOn.season;
            vm.round = queryOn.round;

            console.log("in search");

            if(vm.championshipType === 'Drivers Championship'){

                ErgastService.getDriverStandingForSeasonRound(queryOn.season, queryOn.round)
                    .then(
                        function( res ){
                            vm.standingsSearchTypeDriver = true;
                            vm.standingSearchResult = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                        },
                        function( err ){
                            console.log("UNABLE TO SEARCH DRIVER STANDINGS FOR ROUND");
                        }
                    );


                //ErgastService.getDriverStandingForSeasonRound(queryOn.season, queryOn.round, function(data){
                //    vm.standingsSearchTypeDriver = true;
                //    vm.standingSearchResult = data;
                //});
            } else if (vm.championshipType === 'Constructors Championship'){

                ErgastService.getConstructorStandingForSeasonRound(queryOn.season, queryOn.round)
                    .then(
                        function( res ){
                            vm.standingsSearchTypeDriver = false;
                            vm.standingSearchResult = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                        },
                        function( err ){
                            console.log("UNABLE TO SEARCH CONSTRUCTOR STANDINGS FOR ROUND");
                        }
                    );


                //ErgastService.getConstructorStandingForSeasonRound(queryOn.season, queryOn.round, function(data){
                //    vm.standingsSearchTypeDriver = false;
                //    vm.standingSearchResult = data;
                //});
            }

        }

        function searchDrivers(season){
            console.log(season);

            ErgastService.getDriversForSeason(season)
                .then(
                    function( res ){
                        vm.driverSearchResult = data;
                    },
                    function( err ){
                        alert("Unable to search drivers for season.");
                    }
                );


            //ErgastService.getDriversForSeason(season, function(data){
            //    console.log("in search drivers " + data);
            //    vm.driverSearchResult = data;
            //});

            console.log("in search drivers " + vm.driverSearchResult);
        }

        function storeResult(index){

            var recordToPush = {};

            recordToPush.season = vm.season;
            recordToPush.round = vm.round;

            if(vm.standingsSearchTypeDriver){

                recordToPush.recordType = 'd';

                recordToPush.position = vm.standingSearchResult[index].position;
                recordToPush.points = vm.standingSearchResult[index].points;
                recordToPush.driverUrl = vm.standingSearchResult[index].Driver.url;
                recordToPush.givenName = vm.standingSearchResult[index].Driver.givenName;
                recordToPush.familyName = vm.standingSearchResult[index].Driver.familyName;
                recordToPush.nationality = vm.standingSearchResult[index].Driver.nationality;
                recordToPush.constructorUrl = vm.standingSearchResult[index].Constructors[0].url;
                recordToPush.constructorName = vm.standingSearchResult[index].Constructors[0].name;
            } else {

                recordToPush.recordType = 'c';

                recordToPush.position = vm.standingSearchResult[index].position;
                recordToPush.points = vm.standingSearchResult[index].points;
                recordToPush.constructorUrl = vm.standingSearchResult[index].Constructor.url;
                recordToPush.constructorName = vm.standingSearchResult[index].Constructor.name;
                recordToPush.nationality = vm.standingSearchResult[index].Constructor.nationality;
            }

            //ErgastService.addToStoredDataSet(recordToPush);
            FactService.createFactForUser($rootScope.currentUser._id, recordToPush)
                .then(
                    function ( res ) {

                    },
                    function ( err ) {
                        alert("Unable to store fact to server");
                    }
                );
        }



        function hideResult(index){
            vm.standingSearchResult.splice(index, 1);
        }


        function setStandingsType(typ){
            vm.championshipType = typ;
        }
    }

})();