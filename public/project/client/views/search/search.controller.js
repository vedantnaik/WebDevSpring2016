/**
 * Created by vedant on 3/3/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("SearchController", SearchController);

    function SearchController(ErgastService, FactService, $rootScope, $location) {
        console.log("in Quiz Controller");

        var vm = this;

        vm.message = null;
        vm.queryOn = {};

        vm.searchStanding = searchStanding;
        vm.searchDrivers = searchDrivers;
        vm.setStandingsType = setStandingsType;

        vm.storeResult = storeResult;
        vm.hideResult = hideResult;

        vm.seasonUpdated = seasonUpdated;
        vm.roundUpdated = roundUpdated;

        // Set data values
        init();


        function init(){
            vm.seasonsList = [];
            var currentYear = new Date().getFullYear();
            for(var yr = 1951; yr <= currentYear; yr++){
                vm.seasonsList.push(yr);
            }
            vm.queryOn.season = currentYear;

            vm.roundsList = [];

            updateRoundsDropDownList(currentYear);

            vm.championshipType = 'Drivers';
            vm.standingsSearchTypeDriver = true;

            $rootScope.dataStoredByUser = true;
        }



        function searchStanding(queryOn){

            vm.message = null;

            vm.season = vm.queryOn.season;
            vm.round = vm.queryOn.round;


            if(vm.championshipType == 'Drivers'){


                ErgastService.getDriverStandingForSeasonRound(vm.season, vm.round)
                    .then(
                        function( res ){
                            console.log("in search",vm.season, vm.round);
                            vm.standingsSearchTypeDriver = true;
                            vm.standingSearchResult = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                        },
                        function( err ){
                            console.log("UNABLE TO SEARCH DRIVER STANDINGS FOR ROUND");
                        }
                    );

            } else if (vm.championshipType == 'Constructors'){

                ErgastService.getConstructorStandingForSeasonRound(vm.season, vm.round)
                    .then(
                        function( res ){
                            vm.standingsSearchTypeDriver = false;
                            vm.standingSearchResult = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                        },
                        function( err ){
                            console.log("UNABLE TO SEARCH CONSTRUCTOR STANDINGS FOR ROUND");
                        }
                    );

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

        }

        function storeResult(index){

            vm.message = null;

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

        }



        function hideResult(index){
            vm.standingSearchResult.splice(index, 1);
        }


        function setStandingsType(typ){
            vm.championshipType = typ;
        }

        function seasonUpdated(season){
            console.log("season updated to " + season);
            vm.queryOn.season = season;
            updateRoundsDropDownList(season);
        }

        function roundUpdated(round){
            vm.queryOn.round = round;
        }

        // helpers

        function updateRoundsDropDownList(forYear){
            ErgastService
                .getRaceResultsInSeason(forYear)
                .then(
                    function(res){
                        vm.roundsList = [];
                        var racesInSeasonSoFar = res.data.MRData.RaceTable.round;
                        for(var r = 1; r <= racesInSeasonSoFar; r++){
                            vm.roundsList.push(r);
                        }
                        vm.queryOn.round = racesInSeasonSoFar;
                    },
                    function(err){
                        vm.message = "Some problem occured while connecting to our 3rd party API. Please try again";
                    }
                );
        }
    }

})();