/**
 * Created by vedant on 2/21/16.
 */

(function(){
    angular.module("ProjectPOCApp")
        .config(Configuration);

    function Configuration ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/quizzes", {
                templateUrl: "views/quizzes/quizzes.view.html",
                controller: "QuizController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/stored", {
                templateUrl: "views/search/stored.view.html",
                controller: "StoredController"
            })
            .when('/driver/:driverId', {
                templateUrl: "views/details/driver.view.html",
                controller: "DriverController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();