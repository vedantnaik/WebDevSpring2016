/**
 * Created by vedant on 3/30/16.
 */

module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        phones: [String]
    }, {collection: 'assignment.user'});
    return UserSchema;
};