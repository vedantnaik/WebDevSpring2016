/**
 * Created by vedant on 4/14/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("QuizSelectController", QuizSelectController);

    function QuizSelectController(QuizService, UserService, FactService, QuestionService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.message = null;

        vm.selectToPlay = selectToPlay;

        init();

        function init() {

            UserService
                .getCurrentUser()
                .then(
                    function (userData) {
                        vm.userWhoWantsToPlay = userData.data;
                        QuizService
                            .getPublishedQuizzes()
                            .then(
                                function(quizData){
                                    // filter out quizzes created by this user
                                    vm.allQuizzes = quizData.data
                                        .filter(
                                            function (quizRec) {
                                                return quizRec.userId !== vm.userWhoWantsToPlay._id;
                                            }
                                        );

                                    vm.allQuizzes
                                        .forEach(function(eachQuiz){
                                            if(vm.userWhoWantsToPlay.quizzesTakenListOfIds.indexOf(eachQuiz._id) > -1){
                                                eachQuiz.alreadyPlayed = true;
                                            } else {
                                                eachQuiz.alreadyPlayed = false;
                                            }

                                        });

                                    // move played quiz to bottom of the list
                                    vm.allQuizzes
                                        .sort(
                                            function(a,b){
                                                return (a.alreadyPlayed ? 1 : 0) - (b.alreadyPlayed ? 1 : 0);
                                            }
                                        );
                                },
                                function(err){
                                    vm.message = "Unable to find list of our quizzes. Please try after sometime. Or create one!";
                                }
                            );
                    },
                    function (err) {

                    }
                );

        }


        function selectToPlay(quizId){
            if(vm.userWhoWantsToPlay.quizzesTakenListOfIds.indexOf(quizId) > -1){
                vm.message = "Looks like you have already played this quiz. Please try another one.";
            } else {
                $location.url("/quizzes/playQuiz/" + quizId);
            }
        }
    }

})();