/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("QuizController", QuizController);

    function QuizController(QuizService, UserService, $scope, $rootScope, $location) {

        var vm = this;

        vm.addQuiz = addQuiz;
        vm.updateQuiz = updateQuiz;
        vm.deleteQuiz = deleteQuiz;
        vm.selectQuiz = selectQuiz;
        vm.quizQuestions = quizQuestions;

        // initialize
        setCurrentUserQuizzes();

        function addQuiz(selectedQuiz){
            // create new quiz

            vm.message = null;

            if(selectedQuiz){
                UserService
                    .getCurrentUser()
                    .then(function (res) {
                        var loggedInUser = res.data;

                        QuizService
                            .getQuizzesByTitle(selectedQuiz.title)
                            .then(
                                function(res){
                                    if(res.data.length > 0){
                                        vm.message = "The quiz title has already been used. Please try with another title.";
                                        setCurrentUserQuizzes();
                                    } else {
                                        // user seems to have manually updated the title of selected quiz
                                        // so store it as a new quiz by deleting the _id
                                        delete selectedQuiz['_id'];

                                        QuizService
                                            .createQuizByUserId(loggedInUser._id, selectedQuiz)
                                            .then(
                                                function( res ){
                                                    vm.message = "Successfully created " + selectedQuiz.title;
                                                    setCurrentUserQuizzes();
                                                },
                                                function( err ){
                                                    vm.message = "Sorry, we were unable to create the quiz. Please try again.";
                                                    setCurrentUserQuizzes();
                                                }
                                            );
                                    }
                                },
                                function(err){

                                }

                            );
                    });
            }
        }

        function updateQuiz(selectedQuiz){
            // update quiz
            vm.message = null;

            if(selectedQuiz){

                UserService
                    .getCurrentUser()
                    .then(function (res) {
                        var loggedInUser = res.data;

                        QuizService
                            .getQuizzesByTitle(selectedQuiz.title)
                            .then(
                                function(res){
                                    if(res.data.length > 0){
                                        vm.message = "The quiz title has already been used. Please try with another title.";
                                        setCurrentUserQuizzes();
                                    } else {
                                        QuizService
                                            .updateQuizById(selectedQuiz._id, selectedQuiz)
                                            .then(
                                                function( res ){
                                                    vm.message = "Successfully updated " + selectedQuiz.title;
                                                    setCurrentUserQuizzes();
                                                },
                                                function ( err ) {
                                                    vm.message = "We were unable to update the quiz. Please try again.";
                                                }
                                            );
                                    }
                                },
                                function(err){

                                }

                            );


                    });



            }
        }

        function deleteQuiz(index){
            vm.message = null;

            var deleteQuizTitle = vm.quizzesForCurrentUser[index].title;

            QuizService
                .deleteQuizById(vm.quizzesForCurrentUser[index]._id)
                .then(
                    function ( res ) {
                        vm.message = "Deleted quiz " + deleteQuizTitle;
                        setCurrentUserQuizzes();
                    },
                    function ( err ) {
                        vm.message = "We were unable to delete " + deleteQuizTitle;
                    }
                );
        }


        function selectQuiz(index){
            vm.message = null;

            QuizService
                .getQuizById(vm.quizzesForCurrentUser[index]._id)
                .then(
                    function (res) {
                        vm.selectedQuiz = res.data;
                    }
                );

        }


        function quizQuestions(quiz){
            $location.url("/quiz/" + quiz._id + "/fields");
        }


        // --------------- HELPERS --------------

        function setCurrentUserQuizzes(){
            UserService
                .getCurrentUser()
                .then(function (res) {
                    var loggedInUser = res.data;

                    QuizService
                        .getAllQuizzesForUser(loggedInUser._id)
                        .then(
                            function ( res  ){
                                if (res.data) {
                                    vm.quizzesForCurrentUser = res.data;
                                    vm.selectedQuiz = null;

                                    if (vm.message == null && res.data.length == 0){
                                        vm.message = "Seems like you do no have any quizzes yet. Go ahead! Make some!";
                                    }

                                }
                            },
                            function ( err ) {
                                vm.message = "Seems like you do no have any quizzes yet. Go ahead! Make some!";
                            }
                        );
                });
        }
    }

})();