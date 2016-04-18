/**
 * Created by vedant on 2/21/16.
 */

(function(){
    angular.module("F1ExplorerApp")
        .config(Configuration);

    function Configuration ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
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
                controller: "QuizzesController",
                controllerAs: "model"
            })
            .when("/quizzes/editQuiz/:quizId?", {
                templateUrl: "views/quizzes/editquiz.view.html",
                controller: "EditQuizController",
                controllerAs: "model"
            })
            .when("/quizzes/playQuiz/:quizId?", {
                templateUrl: "views/quizzes/playquiz.view.html",
                controller: "PlayQuizController",
                controllerAs: "model"
            })
            .when("/quizzes/quizSelect/", {
                templateUrl: "views/quizzes/quizselect.view.html",
                controller: "QuizSelectController",
                controllerAs: "model"
            })
            .when("/quizzes/playQuiz/:quizId?/score/:totalScore?/lvlUp/:levelFlag?", {
                templateUrl: "views/quizzes/quizresult.view.html",
                controller: "QuizResultController",
                controllerAs: "model"
            })
            .when("/search/:season?/:round?/:championship?", {
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