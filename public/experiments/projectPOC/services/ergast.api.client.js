/**
 * Created by vedant on 3/3/16.
 */

(function(){

    var QUERY_DRIVER_STANDING_SEASON_ROUND = 'http://ergast.com/api/f1/SEASON/ROUND/driverStandings.json';
    var QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND = 'http://ergast.com/api/f1/SEASON/ROUND/constructorStandings.json';


    angular
        .module("ProjectPOCApp")
        .factory("ErgastService", ErgastService);

    function ErgastService($http) {

        var model = {
            apiData: [],        // store data received from latest API call
            getDriversForSeason: getDriversForSeason,
            getDriverStandingForSeasonRound: getDriverStandingForSeasonRound,
            getConstructorStandingForSeasonRound: getConstructorStandingForSeasonRound
        };
        return model;

        function getDriversForSeason(season,callback){
            console.log("look for drivers in " + season);

            $http({
                method: 'GET',
                url: 'http://ergast.com/api/f1/'+season+'/Drivers.json'
            }).success(function(data){
                model.apiData = data.MRData.DriverTable.Drivers;
                callback(data.MRData.DriverTable.Drivers);
            });

        }

        function getDriverStandingForSeasonRound(season, round, callback){

            $http({
                method: 'GET',
                url: QUERY_DRIVER_STANDING_SEASON_ROUND
                    .replace("SEASON", season)
                    .replace("ROUND", round)
            }).success(function(data){
                model.apiData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                callback(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

            });

        }

        function getConstructorStandingForSeasonRound(season, round, callback){

            $http({
                method: 'GET',
                url: QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND
                    .replace("SEASON", season)
                    .replace("ROUND", round)
            }).success(function(data){
                model.apiData = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                callback(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

            });

        }

    }

})();