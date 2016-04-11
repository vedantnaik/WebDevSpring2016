/**
 * Created by vedant on 4/8/16.
 */

module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
    }, {collection: 'assignment.poc.user'});
    return UserSchema;
};