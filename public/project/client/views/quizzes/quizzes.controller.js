/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("QuizController", QuizController);

    function QuizController(QuizService, $scope, $rootScope, $location) {
        if ($rootScope.currentUser) {
            setCurrentUserQuizzes();
        }

        $scope.addQuiz = addQuiz;
        $scope.updateQuiz = updateQuiz;
        $scope.deleteQuiz = deleteQuiz;
        $scope.selectQuiz = selectQuiz;
        $scope.quizQuestions = quizQuestions;

        function addQuiz(selectedQuiz){
            if(selectedQuiz){
                QuizService
                    .createQuizForUser($rootScope.currentUser._id, selectedQuiz)
                    .then(
                        function( res ){
                            setCurrentUserQuizzes();
                        },
                        function( err ){
                            alert("Unable to add quiz!");
                        }
                    );
            }
        }

        function updateQuiz(selectedQuiz){
            if(selectedQuiz){
                QuizService
                    .updateQuizById(selectedQuiz._id, selectedQuiz)
                    .then(
                        function( res ){
                            setCurrentUserQuizzes();
                        },
                        function ( err ) {
                            alert("Unable to update quiz!");
                        }
                    );
            }
        }

        function deleteQuiz(index){
            QuizService
                .deleteQuizById($scope.quizzesForCurrentUser[index]._id)
                .then(
                    function ( res ) {
                        setCurrentUserQuizzes();
                    },
                    function ( err ) {
                        alert("Unable to delete quiz!");
                    }
                );
        }


        function selectQuiz(index){
            $scope.selectedQuizIndex = index;
            $scope.selectedQuiz = {};
            $scope.selectedQuiz.title = $scope.quizzesForCurrentUser[index].title;
            $scope.selectedQuiz._id = $scope.quizzesForCurrentUser[index]._id;
            $scope.selectedQuiz.userId = $scope.currentUser._id;

            console.log("selected " + $scope.selectedQuiz.title + " user " + $scope.selectedQuiz.userid);
        }


        function quizQuestions(quiz){
            $location.url("/quiz/" + quiz._id + "/fields");
        }


        // --------------- HELPERS --------------

        function setCurrentUserQuizzes(){
            QuizService.findAllQuizzesForUser($rootScope.currentUser._id)
                .then(
                    function ( res  ){
                        if (res.data) {
                            $scope.quizzesForCurrentUser = res.data;
                        }
                    },
                    function ( err ) {
                        alert("Unable to find user's quizzes!");
                    }
                );
        }
    }

})();