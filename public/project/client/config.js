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
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/quizzes", {
                templateUrl: "views/quizzes/quizzes.view.html",
                controller: "QuizzesController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedinQuizMaster
                }
            })
            .when("/quizzes/editQuiz/:quizId?", {
                templateUrl: "views/quizzes/editquiz.view.html",
                controller: "EditQuizController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedinQuizMaster
                }
            })
            .when("/quizzes/playQuiz/:quizId?", {
                templateUrl: "views/quizzes/playquiz.view.html",
                controller: "PlayQuizController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/quizzes/quizSelect/", {
                templateUrl: "views/quizzes/quizselect.view.html",
                controller: "QuizSelectController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/quizzes/playQuiz/:quizId?/score/:totalScore?/lvlUp/:levelFlag?", {
                templateUrl: "views/quizzes/quizresult.view.html",
                controller: "QuizResultController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/search/:season?/:round?/:championship?", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/stored", {
                templateUrl: "views/search/stored.view.html",
                controller: "StoredController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/driver/:driverId', {
                templateUrl: "views/details/driver.view.html",
                controller: "DriverController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedinQuizMaster = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();

        $http.get('/api/f1explorer/loggedin').success(function(user){

            if(user!=null && user.level > 1) {
                $rootScope.currentUser = user;
                $rootScope.$broadcast('newUserTheme', user.supportConstructor);
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();

        $http.get('/api/f1explorer/loggedin').success(function(user){

            if(user) {

                console.log(user);

                $rootScope.currentUser = user;
                //$rootScope.$broadcast('newUserTheme', user.supportConstructor);
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };

})();