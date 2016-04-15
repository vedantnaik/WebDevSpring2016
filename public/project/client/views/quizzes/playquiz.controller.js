/**
 * Created by vedant on 4/14/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("PlayQuizController", PlayQuizController);

    function PlayQuizController(QuizService, UserService, FactService, QuestionService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.message = null;

        vm.updatedSelectedAnwer = updatedSelectedAnwer;
        vm.clearAllSelections = clearAllSelections;
        vm.submitAnswers = submitAnswers;


        init();

        function init() {

            vm.quizToPlayId = $routeParams.quizId;

            QuizService
                .getQuizById(vm.quizToPlayId)
                .then(
                    function(quizData){
                        vm.quizToPlay = quizData.data;
                        vm.questionsInThisQuiz = vm.quizToPlay.questions;

                        vm.questionsInThisQuiz
                            .forEach(function(ques){
                                ques.selectedAnswer = "";
                                ques.options = [ques.option_A, ques.option_B, ques.option_C, ques.option_D];
                            });
                    },
                    function(err){
                        vm.message = "Unable to find this quiz. Please try some other quiz";
                    }
                );

        }

        function updatedSelectedAnwer(questionIndex, selectedOption){
            //console.log(questionIndex, selectedOption);
            vm.questionsInThisQuiz[questionIndex].selectedAnswer = selectedOption;
        }

        function clearAllSelections(){
            vm.questionsInThisQuiz
                .forEach(function(ques){
                    ques.selectedAnswer = "";
                });
        }

        function submitAnswers(){
            console.log("Start evaluating");

            var totalScore = 0;
            vm.questionsInThisQuiz
                .forEach(function(ques){
                    if (ques.selectedAnswer != "") {
                        if (ques.selectedAnswer == ques.answer) {
                            totalScore = totalScore + 10;
                        } else {
                            totalScore = totalScore - 5;
                        }
                    }
                });

            console.log(totalScore);
            console.log("Done evaluating");


            UserService
                .getCurrentUser()
                .then(function (res) {
                    var userFromServer = res.data;
                    vm.userWhoPlayed = userFromServer;

                    vm.userWhoPlayed.score = +vm.userWhoPlayed.score + +totalScore;

                    var userLevel = +vm.userWhoPlayed.level;
                    var userScore = +vm.userWhoPlayed.score;
                    var userNextLevelScore = userLevel * 100;

                    var locationUrlStr = "/quizzes/playQuiz/"+vm.quizToPlayId+"/score/"+totalScore+"/lvlUp/false";
                    if ((userScore - userNextLevelScore) > 0) {
                        vm.userWhoPlayed.level = +vm.userWhoPlayed.level + 1;
                        $rootScope.currentUser.level = vm.userWhoPlayed.level;
                        locationUrlStr = "/quizzes/playQuiz/"+vm.quizToPlayId+"/score/"+totalScore+"/lvlUp/true";
                    }

                    UserService
                        .updateUser(vm.userWhoPlayed._id, vm.userWhoPlayed)
                        .then(
                            function (res) {
                                // user status updated
                                $location.url(locationUrlStr);
                            },
                            function (err) {
                                // unable to update user status
                            }
                        );
                });
        }
    }

})();