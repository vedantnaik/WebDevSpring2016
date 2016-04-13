/**
 * Created by vedant on 4/11/16.
 */


module.exports = function(app, request) {

    // This server side service is to help users make "facts" out of a row they select from the search page.

    app.get("/api/f1explorer/ergast/drrfact/:season/:round/:driverId", generateDriverRRFact);
    app.get("/api/f1explorer/ergast/crrfact/:season/:round/:constructorId", generateConstructorRRFact);

    var QUERY_DRIVER_RACE_RESULT_SEASON_ROUND = "http://ergast.com/api/f1/SEASON/ROUND/drivers/DRIVERID/results.json";
    var QUERY_CONSTRUCTOR_RACE_RESULT_SEASON_ROUND = "http://ergast.com/api/f1/SEASON/ROUND/constructors/CONSTRUCTORID/results.json";

    function generateDriverRRFact(req, res){
        var season = req.params.season;
        var round = req.params.round;
        var driverId = req.params.driverId;

        request(
            QUERY_DRIVER_RACE_RESULT_SEASON_ROUND
                .replace("SEASON", season)
                .replace("ROUND", round)
                .replace("DRIVERID", driverId),
            function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var info = JSON.parse(body);

                    var drrFact = {};

                    //drrFact.userId: String; // fact stored for user

                    drrFact.factType = "DRR"; // "DRR"

                    drrFact.driverId = info.MRData.RaceTable.driverId; // fact related to this driver
                    drrFact.driverName = firstDriverName(info);
                    drrFact.driverNationality = info.MRData.RaceTable.Races[0].Results[0].Driver.nationality;

                    drrFact.constructorId = info.MRData.RaceTable.Races[0].Results[0].Constructor.constructorId;
                    drrFact.constructorName = info.MRData.RaceTable.Races[0].Results[0].Constructor.name;
                    drrFact.raceName = info.MRData.RaceTable.Races[0].raceName;

                    drrFact.season = info.MRData.RaceTable.Races[0].season;
                    drrFact.round = info.MRData.RaceTable.Races[0].round;

                    drrFact.gridPosition = info.MRData.RaceTable.Races[0].Results[0].grid;
                    drrFact.finishingPosition = info.MRData.RaceTable.Races[0].Results[0].position;
                    drrFact.pointsEarned = info.MRData.RaceTable.Races[0].Results[0].points;

                    res.send(drrFact);
                } else {
                    res.status(400).send(err);
                }
            }
        );
    }

    function generateConstructorRRFact(req, res){
        var season = req.params.season;
        var round = req.params.round;
        var constructorId = req.params.constructorId;

        console.log("search ergast for season " + season);
        request(
            QUERY_CONSTRUCTOR_RACE_RESULT_SEASON_ROUND
                .replace("SEASON", season)
                .replace("ROUND", round)
                .replace("CONSTRUCTORID", constructorId),
            function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var info = JSON.parse(body);

                    var crrFact = {};

                    //userId = String; // fact stored for user

                    crrFact.factType = "CRR"; // "CRR"

                    crrFact.constructorId = info.MRData.RaceTable.constructorId; // fact related to this constructor
                    crrFact.constructorNationality = info.MRData.RaceTable.Races[0].Results[0].Constructor.nationality;

                    crrFact.driverName_1 = firstDriverName(info);
                    crrFact.driverName_2 = secondDriverName(info);

                    crrFact.constructorName = info.MRData.RaceTable.Races[0].Results[0].Constructor.name;
                    crrFact.raceName = info.MRData.RaceTable.Races[0].raceName;

                    crrFact.season = info.MRData.RaceTable.season;
                    crrFact.round = info.MRData.RaceTable.round;

                    crrFact.bestGridPosition = calculateBestGridPos(info);       // better of both drivers
                    crrFact.bestFinishingPosition = calculateBestFinishingPosition(info);  // better of both drivers
                    crrFact.pointsEarned = calculateTotalPointsOfRace(info);           // sum of both drivers

                    res.send(crrFact);
                } else {
                    res.status(400).send(err);
                }
            }
        );
    }

    // helper functions

    function firstDriverName(info){
        return info.MRData.RaceTable.Races[0].Results[0].Driver.givenName
            + " " + info.MRData.RaceTable.Races[0].Results[0].Driver.familyName;
    }

    function secondDriverName(info){
        return info.MRData.RaceTable.Races[0].Results[1].Driver.givenName
            + " " + info.MRData.RaceTable.Races[0].Results[1].Driver.familyName;
    }

    function calculateBestGridPos(info){
        if (parseInt(info.MRData.RaceTable.Races[0].Results[0].grid)
            < parseInt(info.MRData.RaceTable.Races[0].Results[1].grid)) {
            return info.MRData.RaceTable.Races[0].Results[0].grid;
        } else {
            return info.MRData.RaceTable.Races[0].Results[1].grid;
        }
    }

    function calculateBestFinishingPosition(info){
        return info.MRData.RaceTable.Races[0].Results[0].position;
    }

    function calculateTotalPointsOfRace(info){
        return parseInt(info.MRData.RaceTable.Races[0].Results[0].points)
            + parseInt(info.MRData.RaceTable.Races[0].Results[1].points);
    }
}
