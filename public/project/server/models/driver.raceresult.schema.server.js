/**
 * Created by vedant on 4/11/16.
 */

module.exports = function(mongoose) {

    var DriverRaceResultSchema = mongoose.Schema({

        userId: String, // fact stored for user

        factType: String, // "DRR"

        driverId: String, // fact related to this driver
        driverName: String,
        driverNationality: String,

        constructorId: String,
        constructorName: String,
        raceName: String,

        season: Number,
        round: Number,

        gridPosition: Number,
        finishingPosition: Number,
        pointsEarned: Number,

    }, {collection: 'assignment.project.raceresults.driver'});
    return DriverRaceResultSchema;
};