/**
 * Created by vedant on 2/21/16.
 */

(function(){
    console.log("Config.js");
    angular.module("FormBuilderApp")
        .config( function ($routeProvider) {
            console.log("Configuration Called");
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html"
                })
                .when("/fields", {
                    templateUrl: "views/forms/fields.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });




})();