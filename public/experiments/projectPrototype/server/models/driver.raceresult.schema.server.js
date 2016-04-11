/**
 * Created by vedant on 4/11/16.
 */

module.exports = function(mongoose) {

    var DriverRaceResultSchema = mongoose.Schema({

        userId: String, // fact stored for user

        driverId: String, // fact related to this driver
        constructorId: String,
        constructorName: String,
        raceName: String,

        season: Number,
        round: Number,


        gridPosition: Number,
        finishingPosition: Number,
        pointsEarned: Number,

    }, {collection: 'assignment.poc.raceresults.driver'});
    return DriverRaceResultSchema;
};