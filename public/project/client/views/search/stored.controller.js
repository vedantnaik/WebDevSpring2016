/**
 * Created by vedant on 3/4/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("StoredController", StoredController);

    function StoredController(UserService, FactService) {
        console.log("in Stored Controller");

        var vm = this;

        vm.toggleStandingsType = toggleStandingsType;
        vm.displayResults = displayResults;
        vm.makeQuestion = makeQuestion;
        vm.deleteStoredFact = deleteStoredFact;

        vm.message = null;

        vm.championshipType = 'Drivers';
        vm.standingsSearchTypeDriver = true;


        function init(){
            displayResults();
        }

        init();

        function toggleStandingsType(){
            if (vm.championshipType == 'Drivers') {
                vm.championshipType = 'Constructors';
            } else {
                vm.championshipType = 'Drivers';
            }
            displayResults();
        }

        function displayResults(){

            UserService
                .getCurrentUser()
                .then(
                    function (res) {
                        vm.userViewingStored = res.data;

                        FactService.findAllFactsForUser(vm.userViewingStored._id)
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
                                },
                                function (err)  {
                                    console.log("UNABLE TO GET STORED FACTS TO CLIENT SIDE");
                                }
                            );

                    },
                    function (err) {
                        vm.message = "You need to be logged in to view stored facts.";
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