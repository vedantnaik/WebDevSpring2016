/**
 * Created by vedant on 3/17/16.
 */

var q = require("q");

module.exports = function(db, mongoose){


    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("User", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByID: findUserByID,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user){

        return UserModel.create(user);
        //
        //var deferred = q.defer();
        //
        //UserModel.create(user, function(err, doc) {
        //    if (err) {
        //        deferred.reject(err);
        //    } else {
        //        deferred.resolve(doc);
        //    }
        //});
        //
        //return deferred.promise;
    }

    function findAllUsers(){
        return UserModel.find();
        //var deferred = q.defer();
        //UserModel.find(function (err, users) {
        //    if (err) {
        //        deferred.reject(err);
        //    } else {
        //        deferred.resolve(users);
        //    }
        //});
        //return deferred.promise;
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
        //var deferred = q.defer();
        //UserModel.findOne({ username: username },
        //    function(err, user) {
        //        if (err) {
        //            deferred.reject(err);
        //        } else {
        //            deferred.resolve(user);
        //        }
        //    });
        //return deferred.promise;
    }

    function findUserByID(userId) {
        return UserModel.findById(id);
        //var deferred = q.defer();
        //UserModel.findById(userId, function(err, doc) {
        //    if( err ) { deferred.reject(err); }
        //    else { deferred.resolve(doc); }
        //});
        //return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );

        //var deferred = q.defer();
        //UserModel.findOne({ username: credentials.username, password: credentials.password },
        //    function(err, doc) {
        //        if (err) {
        //            deferred.reject(err);
        //        } else {
        //            deferred.resolve(doc);
        //        }
        //    });
        //return deferred.promise;
    }

    function updateUser(userId, user){
        return UserModel.update({_id: id},
            {
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
                roles: user.roles,
                phones: user.phones
            });
        //var deferred = q.defer();
        //
        //// create new user
        //var newUser = {
        //    username: user.username,
        //    password: user.password,
        //    firstName: user.firstName,
        //    lastName: user.lastName,
        //    emails: user.emails,
        //    phones: user.phones
        //};
        //
        //UserModel.update(
        //    {_id: userId},
        //    {$set: newUser},
        //    function(err, doc){
        //        if(err) { deferred.reject(err); }
        //        else {
        //            UserModel.findById(userId, function(err, user) {
        //                if(err){ deferred.reject(err); }
        //                else{ deferred.resolve(user); }
        //            });
        //        }
        //    }
        //);
        //
        //return deferred.promise;
    }

    function deleteUser(userId){
        return UserModel.remove({_id: id});
        //var deferred = q.defer();
        //UserModel.remove({_id: userId}, function(err, users){
        //    if (err) {
        //        deferred.reject(err);
        //    } else {
        //        deferred.resolve(users);
        //    }
        //});
        //return deferred.promise;
    }

};