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

        vm.message = null;

        vm.championshipType = 'Drivers Championship';
        vm.standingsSearchTypeDriver = true;

        $rootScope.dataStoredByUser = true;

        vm.searchStanding = searchStanding;
        vm.searchDrivers = searchDrivers;
        vm.setStandingsType = setStandingsType;

        vm.storeResult = storeResult;
        vm.hideResult = hideResult;


        function searchStanding(queryOn){

            vm.message = null;

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
            vm.message = null;

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

            vm.message = null;

            console.log(vm.standingSearchResult[index]);
            var recordToPush = {};

            if(vm.standingsSearchTypeDriver){
                ErgastService
                    .generateDriverRRFact(vm.season,
                                        vm.round,
                                        vm.standingSearchResult[index].Driver.driverId)
                    .then(
                        function(res){
                            recordToPush = res.data;
                            recordToPush.userId = $rootScope.currentUser._id; // fact stored for user
                            FactService
                                .createFactForUser($rootScope.currentUser._id, recordToPush)
                                .then(
                                    function(res){
                                        console.log("Fact stored in mongo");
                                    },
                                    function(err){
                                        console.log("Unable to store fact");
                                    }
                                );
                        },
                        function(err){
                            vm.message = "Unable to generate fact for this driver's race result.";
                        }
                    );


            } else {
                ErgastService
                    .generateConstructorRRFact(vm.season,
                                        vm.round,
                                        vm.standingSearchResult[index].Constructor.constructorId)
                    .then(
                        function(res){
                            recordToPush = res.data;
                            recordToPush.userId = $rootScope.currentUser._id; // fact stored for user
                            FactService
                                .createFactForUser($rootScope.currentUser._id, recordToPush)
                                .then(
                                    function(res){
                                        console.log("Fact stored in mongo");
                                    },
                                    function(err){
                                        console.log("Unable to store fact");
                                    }
                                );
                        },
                        function(err){
                            vm.message = "Unable to generate fact for this constructor's race result.";
                        }
                    );
            }

            console.log(recordToPush);

        }



        function hideResult(index){
            vm.standingSearchResult.splice(index, 1);
        }


        function setStandingsType(typ){
            vm.championshipType = typ;
        }
    }

})();