/**
 * Created by vedant on 3/3/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("SearchController", SearchController);

    function SearchController(ErgastService, FactService, UserService, $rootScope, $routeParams, $location) {

        var vm = this;

        vm.message = null;
        vm.searchStanding = searchStanding;

        vm.searchDrivers = searchDrivers;
        vm.setStandingsType = setStandingsType;
        vm.storeResult = storeResult;

        vm.hideResult = hideResult;
        vm.seasonUpdated = seasonUpdated;

        vm.roundUpdated = roundUpdated;

        vm.goBackOneRace = goBackOneRace;
        vm.goAheadOneRace = goAheadOneRace;

        vm.processing = null;

        // Set data values
        init();

        function init(){
            vm.queryOn = { season:  $routeParams.season,
                           round:   $routeParams.round };

            vm.championshipType = $routeParams.championship;

            // load all seasons so far
            // Fun Fact : Formula 1 started in the year 1951!
            vm.seasonsList = [];
            var currentYear = new Date().getFullYear();
            for(var yr = currentYear; yr >= 1951; yr--){
                vm.seasonsList.push(yr);
            }

            // update rounds list to a list of races that happened that season
            vm.roundsList = [];
            updateRoundsDropDownList($routeParams.season);

            // update the table based on the vm.queryOn and vm.championshipType values
            searchStanding();

            // show drivers table if championship type is drivers
            vm.standingsSearchTypeDriver = (vm.championshipType == 'Drivers');
        }

        function searchStanding(){
            vm.message = null;

            vm.season = vm.queryOn.season;
            vm.round = vm.queryOn.round;

            // update the URL to maintain these values even when we navigate away
            $location.url("/search/"
                + vm.season
                + "/" + vm.round
                + "/" + vm.championshipType);

            if(vm.championshipType == 'Drivers'){
                ErgastService
                    .getDriverStandingForSeasonRound(vm.season, vm.round)
                    .then(
                        function( res ){
                            console.log("in search",vm.season, vm.round);
                            vm.standingsSearchTypeDriver = true;
                            vm.standingSearchResult = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

                            UserService
                                .getCurrentUser()
                                .then(
                                    function(userRes){
                                        if(userRes.data){
                                            var loggedInUser = userRes.data;
                                            FactService
                                                .findAllFactsForUser(loggedInUser._id)
                                                .then(
                                                    function(factsRes){
                                                        var myFacts = factsRes.data;

                                                        myFacts.filter(function (myFact) {
                                                            return myFact.factType == "DRR";
                                                        });

                                                        vm.standingSearchResult
                                                            .forEach(
                                                                function(apiResult){
                                                                    var apiName = apiResult.Driver.givenName + " " + apiResult.Driver.familyName;

                                                                    myFacts.forEach(
                                                                        function(myFact){
                                                                            if(myFact.driverName == apiName
                                                                            && myFact.factType == "DRR"
                                                                            && myFact.season == vm.queryOn.season
                                                                            && myFact.round == vm.queryOn.round){
                                                                                apiResult.alreadyStored = true;
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                    }
                                                );
                                        }
                                    }
                                );
                        },
                        function( err ){
                            console.log("UNABLE TO SEARCH DRIVER STANDINGS FOR ROUND");
                        }
                    );

            } else if (vm.championshipType == 'Constructors'){
                ErgastService
                    .getConstructorStandingForSeasonRound(vm.season, vm.round)
                    .then(
                        function( res ){
                            vm.standingsSearchTypeDriver = false;
                            vm.standingSearchResult = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

                            UserService
                                .getCurrentUser()
                                .then(
                                    function(userRes){
                                        if(userRes.data){
                                            var loggedInUser = userRes.data;
                                            FactService
                                                .findAllFactsForUser(loggedInUser._id)
                                                .then(
                                                    function(factsRes){
                                                        var myFacts = factsRes.data;

                                                        myFacts.filter(function (myFact) {
                                                           return myFact.factType == "CRR";
                                                        });

                                                        vm.standingSearchResult
                                                            .forEach(
                                                                function(apiResult){
                                                                    var apiName = apiResult.Constructor.name;

                                                                    myFacts.forEach(
                                                                        function(myFact){
                                                                            if(myFact.constructorName == apiName
                                                                            && myFact.factType == "CRR"
                                                                            && myFact.season == vm.queryOn.season
                                                                            && myFact.round == vm.queryOn.round){
                                                                                apiResult.alreadyStored = true;
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                    }
                                                );
                                        }
                                    }
                                );
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
                                        searchStanding();
                                    },
                                    function(err){
                                        vm.message = "Unable to store fact";
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
                                        searchStanding();
                                    },
                                    function(err){
                                        vm.message = "Unable to store fact";
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
            searchStanding();
        }

        function seasonUpdated(season){
            vm.queryOn.season = season;
            updateRoundsDropDownList(season);
            searchStanding();
        }

        function roundUpdated(round){
            vm.queryOn.round = round;
            searchStanding();
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
                    },
                    function(err){
                        vm.message = "Some problem occured while connecting to our 3rd party API. Please try again";
                    }
                );
        }

        function goBackOneRace(){
            vm.message = null;

            console.log(vm.roundsList.indexOf(+vm.queryOn.round));

            if( vm.roundsList.indexOf(+vm.queryOn.round) == 0 ){
                vm.message = "This was the first round of " + vm.queryOn.season + " season.";
            } else {
                vm.queryOn.round = (+vm.round - 1);
                searchStanding();
            }
        }

        function goAheadOneRace(){
            vm.message = null;

            console.log(vm.roundsList.indexOf(+vm.queryOn.round));

            if ( vm.roundsList.indexOf(+vm.queryOn.round) == (vm.roundsList.length - 1) ){
                vm.message = "This was the last round of " + vm.queryOn.season + " season.";
            } else {
                vm.queryOn.round = (+vm.round + 1);
                searchStanding();
            }
        }
    }

})();