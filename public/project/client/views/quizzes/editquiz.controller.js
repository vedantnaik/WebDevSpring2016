/**
 * Created by vedant on 4/14/16.
 */


(function () {

    angular
        .module("F1ExplorerApp")
        .controller("EditQuizController", EditQuizController);

    function EditQuizController(QuizService, UserService, FactService, QuestionService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.toggleStandingsType = toggleStandingsType;
        vm.displayResults = displayResults;
        vm.deleteStoredFact = deleteStoredFact;
        vm.hideResult = hideResult;

        vm.convertDRRFactToQuestion = convertDRRFactToQuestion;
        vm.convertCRRFactToQuestion = convertCRRFactToQuestion;

        vm.deleteAllQuestions = deleteAllQuestions;
        vm.publishQuiz = publishQuiz;
        vm.unpublishQuiz = unpublishQuiz;

        vm.updateQuizTitle = updateQuizTitle;
        vm.dismissUpdateModal = dismissUpdateModal;

        vm.message = null;

        vm.championshipType = 'Drivers';
        vm.standingsSearchTypeDriver = true;


        init();

        function init(){

            var oldVmMessage = vm.message;

            vm.quizToEditId = $routeParams.quizId;

            QuizService
                .getQuizById(vm.quizToEditId)
                .then(
                    function(res){
                        vm.quizToEdit = res.data;
                        vm.editedQuizTitle = res.data.title;
                        QuestionService
                            .findQuestionsInQuizById(vm.quizToEditId)
                            .then(
                                function(res){
                                    vm.questionsInThisQuiz = res.data;

                                    UserService
                                        .getCurrentUser()
                                        .then(
                                            function (res) {
                                                var userFromServer = res.data;
                                                vm.userEditingTheQuiz = userFromServer;
                                                FactService.findAllFactsForUser(vm.userEditingTheQuiz._id)
                                                    .then(
                                                        function( res ){

                                                            var storedData = res.data;
                                                            var driverStoredResult = storedData
                                                                .filter(function (rec) {return rec.factType === 'DRR';});
                                                            var constructorStoredResult = storedData
                                                                .filter(function (rec) {return rec.factType === 'CRR';});

                                                            if(vm.championshipType === 'Drivers') {
                                                                vm.standingsSearchTypeDriver = true;
                                                                vm.displayStoredResults = null;
                                                                vm.displayStoredResults = driverStoredResult;
                                                            } else {
                                                                vm.standingsSearchTypeDriver = false;
                                                                vm.displayStoredResults = null;
                                                                vm.displayStoredResults = constructorStoredResult;
                                                            }

                                                            displayResults();
                                                        },
                                                        function (err)  {
                                                            console.log("UNABLE TO GET STORED FACTS TO CLIENT SIDE");
                                                        }
                                                    );

                                            },
                                            function (err) {

                                            }
                                        );
                                }
                            );
                    },
                    function(err){
                        vm.message = "Sorry, we could not find the quiz you are looking for."
                    }
                );
        }


        function toggleStandingsType(){
            if (vm.championshipType == 'Drivers') {
                vm.championshipType = 'Constructors';
            } else {
                vm.championshipType = 'Drivers';
            }
            displayResults();
        }

        function displayResults(){

            FactService.findAllFactsForUser(vm.userEditingTheQuiz._id)
                .then(
                    function( res ){

                        var storedData = res.data;
                        var driverStoredResult = storedData
                            .filter(function (rec) {return rec.factType === 'DRR';});
                        var constructorStoredResult = storedData
                            .filter(function (rec) {return rec.factType === 'CRR';});

                        if(vm.championshipType === 'Drivers') {
                            vm.standingsSearchTypeDriver = true;
                            vm.displayStoredResults = null;

                            driverStoredResult
                                .forEach(
                                    function (eachFact) {
                                        eachFact.readableFact = eachFact.season + " " +
                                            eachFact.raceName + " " + eachFact.driverName +
                                            " finished at " + eachFact.finishingPosition;
                                    }
                                );

                            vm.displayStoredResults = driverStoredResult;
                        } else {
                            vm.standingsSearchTypeDriver = false;
                            vm.displayStoredResults = null;

                            constructorStoredResult
                                .forEach(
                                    function (eachFact) {
                                        eachFact.readableFact = eachFact.season + " " +
                                            eachFact.raceName + " " + eachFact.constructorName +
                                            " finished at " + eachFact.bestFinishingPosition;
                                    }
                                );

                            vm.displayStoredResults = constructorStoredResult;
                        }
                    },
                    function (err)  {
                        console.log("UNABLE TO GET STORED FACTS TO CLIENT SIDE");
                    }
                );

        }

        function deleteStoredFact(factId, factAbout) {
            vm.message = null;
            FactService
                .deleteFactById(factId)
                .then(
                    function(res){
                        vm.message = "Deleted fact related to " + factAbout;
                        displayResults();
                    },
                    function(err){
                        vm.message = "There was some problem deleting this fact. Please try again.";
                    }
                );
        }

        function hideResult(index){
            vm.displayStoredResults.splice(index, 1);
        }

        function updateQuizTable(){
            QuestionService
                .findQuestionsInQuizById(vm.quizToEditId)
                .then(
                    function(res) {
                        vm.questionsInThisQuiz = res.data;
                    });
        }

        // making questions

        function convertDRRFactToQuestion(factId, index){
            QuestionService
                .makeDRRFactQuestion(factId, vm.quizToEditId)
                .then(
                    function(res){
                        updateQuizTable();
                        vm.displayStoredResults.splice(index, 1);
                        vm.message = "We have converted this fact into a question for your quiz!";
                    },
                    function(err){
                        vm.message = "Could not convert this fact into a question. It probably already exists in this quiz.";
                    }
                );
        }

        function convertCRRFactToQuestion(factId, index){
            QuestionService
                .makeCRRFactQuestion(factId, vm.quizToEditId)
                .then(
                    function(res){
                        updateQuizTable();
                        vm.displayStoredResults.splice(index, 1);
                        vm.message = "We have converted this fact into a question for your quiz!";
                    },
                    function(err){
                        vm.message = "Could not convert this fact into a question. Please try again.";
                    }
                );
        }

        function deleteAllQuestions(listOfQuestions){
            vm.message = null;

            QuizService
                .getQuizById(vm.quizToEditId)
                .then(
                    function (res) {
                        var quizToEmpty = res.data;
                        quizToEmpty.questions = [];

                        QuizService
                            .updateQuizById(vm.quizToEditId, quizToEmpty)
                            .then(
                                function(res){
                                    vm.message = "Questions deleted from quiz. Your quiz will no longer be published";
                                    unpublishQuiz();
                                },
                                function(err){
                                    vm.message = "Caution: Questions may not have been deleted properly";
                                }
                            );
                    },
                    function (err) {
                        vm.message = "Caution: Questions may not have been deleted properly";
                    }
                );


            for(var questionIndex in listOfQuestions){

                console.log(listOfQuestions[questionIndex]._id);

                QuestionService
                    .deleteQuestionById(listOfQuestions[questionIndex]._id)
                    .then(
                        function(res){
                            updateQuizTable();
                        },function(err){
                            vm.message = "There was some error deleting questions from this quiz.";
                        }
                    );
            }

            console.log("Deleted for complete");
        }

        function publishQuiz(){
            vm.message = null;

            QuizService
                .getQuizById(vm.quizToEditId)
                .then(
                    function (res) {
                        var quizToPublish = res.data;

                        if(quizToPublish.questions.length < 1){
                            quizToPublish.publishedStatus = "NOT PUBLISHED";
                            vm.message = "Please add some questions to your quiz before publishing.";

                            QuizService                     // update quiz as unpublished
                                .updateQuizById(vm.quizToEditId, quizToPublish)
                                .then(
                                    function (unpublishedRes) {
                                        init();
                                    },
                                    function (err) {
                                        vm.message = "Unable to update the status of your quiz. Please try again.";
                                    }
                                );

                        } else {
                            quizToPublish.publishedStatus = "PUBLISHED";

                            QuizService
                                .updateQuizById(vm.quizToEditId, quizToPublish)
                                .then(
                                    function (publishedRes) {
                                        vm.message = "Your quiz is now published! Thank you!";
                                        init();
                                    },
                                    function (err) {
                                        vm.message = "Unable to update the status of your quiz. Please try again.";
                                    }
                                );
                        }
                    },
                    function (err) {
                        vm.message = "Some thing went wrong. Please try again."
                    }
                );
        }

        function unpublishQuiz() {
            QuizService
                .getQuizById(vm.quizToEditId)
                .then(
                    function (res) {
                        var quizToUnpublish = res.data;
                        quizToUnpublish.publishedStatus = "NOT PUBLISHED";

                        QuizService                     // update quiz as unpublished
                            .updateQuizById(vm.quizToEditId, quizToUnpublish)
                            .then(
                                function (unpublishedRes) {
                                    init();
                                    vm.message = "Your quiz is no longer published.";
                                },
                                function (err) {
                                    vm.message = "Unable to update the status of your quiz. Please try again.";
                                }
                            );
                    },
                    function (err) {
                        vm.message = "Unable to take down your quiz. It is still live."
                    }
                );
        }

        function updateQuizTitle(newTitle) {


            QuizService
                .getQuizzesByTitle(newTitle)
                .then(
                    function(res){
                        if(res.data.length > 0){
                            vm.message = "The quiz title has already been used. Please try with another title.";
                            //setCurrentUserQuizzes();
                        } else {
                            vm.quizToEdit.title = newTitle;

                            QuizService
                                .updateQuizById(vm.quizToEditId, vm.quizToEdit)
                                .then(
                                    function (renamedQuiz) {
                                        init();
                                        vm.message = "Quiz renamed!.";
                                    },
                                    function (err) {
                                        vm.message = "Unable to rename quiz. Please try again.";
                                    }
                                );
                        }
                    });




        }

        function dismissUpdateModal() {
            vm.editedQuizTitle = vm.quizToEdit.title;
        }
    }

})();