/**
 * Created by vedant on 4/14/16.
 */


(function () {

    angular
        .module("F1ExplorerApp")
        .controller("EditQuizController", EditQuizController);

    function EditQuizController(QuizService, UserService, FactService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.setStandingsType = setStandingsType;
        vm.displayResults = displayResults;
        vm.makeQuestion = makeQuestion;
        vm.deleteStoredFact = deleteStoredFact;

        vm.message = null;

        vm.championshipType = 'Drivers Championship';
        vm.standingsSearchTypeDriver = true;


        init();

        function init(){

            vm.quizToEditId = $routeParams.quizId;

            QuizService
                .getQuizById(vm.quizToEditId)
                .then(
                    function(res){
                        vm.quizToEdit = res.data;
                    },
                    function(err){
                        vm.message = "Sorry, we could not find the quiz you are looking for."
                    }
                );

        }


        function setStandingsType(typ){
            vm.message = null;
            console.log("changed to " + typ);
            vm.championshipType = typ;
        }

        function displayResults(){
            vm.message = null;

            FactService.findAllFactsForUser($rootScope.currentUser._id)
                .then(
                    function( res ){

                        var storedData = res.data;
                        var driverStoredResult = storedData
                            .filter(function (rec) {return rec.factType === 'DRR';});
                        var constructorStoredResult = storedData
                            .filter(function (rec) {return rec.factType === 'CRR';});

                        if(vm.championshipType === 'Drivers Championship') {
                            vm.standingsSearchTypeDriver = true;
                            vm.displayStoredResults = null;
                            vm.displayStoredResults = driverStoredResult;
                        } else {
                            vm.standingsSearchTypeDriver = false;
                            vm.displayStoredResults = null;
                            vm.displayStoredResults = constructorStoredResult;
                        }
                    },
                    function (err)  {
                        console.log("UNABLE TO GET STORED FACTS TO CLIENT SIDE");
                    }
                );

        }

        function makeQuestion(factId){
            vm.message = null;
            FactService
                .findFactById(factId)
                .then(
                    function(res){
                        console.log(res.data);
                    },
                    function(err){
                        console.log("Fact not found");
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



    }

})();