/**
 * Created by vedant on 2/21/16.
 */

(function(){
    angular.module("F1ExplorerApp")
        .config(Configuration);

    function Configuration ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile/:username?", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/quizzes", {
                templateUrl: "views/quizzes/quizzes.view.html",
                controller: "QuizController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/stored", {
                templateUrl: "views/search/stored.view.html",
                controller: "StoredController",
                controllerAs: "model"
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