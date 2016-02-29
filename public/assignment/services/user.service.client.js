/**
 * Created by vedant on 2/21/16.
 */

(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var model = {
            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ],
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser
        };
        return model;

        function findUserByCredentials(credentials) {

            console.log("in service");

            for (var userIndex in model.users){
                var user = model.users[userIndex];
                if(user.username === credentials.username){
                    if(user.password === credentials.password){
                        console.log("SUCCESS : " + user);
                        return user;
                    }
                }
            }
            return null;
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

    }
})();
