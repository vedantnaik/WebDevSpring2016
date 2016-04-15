/**
 * Created by vedant on 4/15/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("QuizResultController", QuizResultController);

    function QuizResultController(QuizService, UserService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.message = null;

        init();

        function init() {
            vm.quizPlayedId = $routeParams.quizId;
            vm.quizPlayedScore = $routeParams.totalScore;

            QuizService
                .getQuizById(vm.quizPlayedId)
                .then(
                    function(res){
                        vm.quizJustPlayed = res.data;

                        UserService
                            .getCurrentUser()
                            .then(function (res) {
                                var userFromServer = res.data;
                                vm.userWhoPlayed = userFromServer;

                                if (vm.quizPlayedScore > 0) {
                                    // winner
                                    vm.positiveScore = true;
                                    if (vm.quizPlayedScore > 100) {
                                        vm.resultMessage = "Awesome! You scored a spectacular " + vm.quizPlayedScore + " points!";
                                    } else if (vm.quizPlayedScore > 50) {
                                        vm.resultMessage = "Wow! You scored an amazing " + vm.quizPlayedScore + " points!";
                                    } else {
                                        vm.resultMessage = "Congratulations! You scored " + vm.quizPlayedScore + " points!";
                                    }

                                    vm.userWhoPlayed.score = +vm.userWhoPlayed.score
                                        + +vm.quizPlayedScore;

                                    vm.totalScoreMessage = "Your total score so far is " + vm.userWhoPlayed.score;

                                    var userLevel = +vm.userWhoPlayed.level;
                                    var userScore = +vm.userWhoPlayed.score;
                                    var userNextLevelScore = userLevel * 100;

                                    if ((userScore - userNextLevelScore) < 0) {
                                        var rem = userNextLevelScore - userScore;
                                        vm.nextLevelMessage = "You are " + rem + " points away from the next level.";
                                    } else {
                                        vm.userWhoPlayed.level = +vm.userWhoPlayed.level + 1;
                                        vm.nextLevelMessage = "Its time to celebrate! You have levelled up!";
                                        vm.levelUpCelebrations = true;
                                        $rootScope.currentUser.level = vm.userWhoPlayed.level;
                                    }

                                } else {
                                    // looser
                                    vm.positiveScore = false;

                                    vm.resultMessage = "Things didn't go well. You scored " + vm.quizPlayedScore;

                                    vm.userWhoPlayed.score = +vm.userWhoPlayed.score
                                        + +vm.quizPlayedScore;

                                    vm.totalScoreMessage = "Your total score so far is " + vm.userWhoPlayed.score;

                                    var userLevel = +vm.userWhoPlayed.level;
                                    var userScore = +vm.userWhoPlayed.score;
                                    var userNextLevelScore = userLevel * 100;
                                    var rem = userNextLevelScore - userScore;
                                    vm.nextLevelMessage = "You are " + rem + " points away from the next level.";
                                }

                                UserService
                                    .updateUser(vm.userWhoPlayed._id, vm.userWhoPlayed)
                                    .then(
                                        function (res) {
                                            // user status updated
                                        },
                                        function (err) {
                                            // unable to update user status
                                        }
                                    );
                            });
                    }
                );

        }

    }

})();