/**
 * Created by vedant on 3/27/16.
 */

var facts = [];


module.exports = function () {

    var api = {
        createFact: createFact,
        updateFactById: updateFactById,
        deleteFactById: deleteFactById,
        findFactById: findFactById,
        findAllFacts: findAllFacts,
        findAllFactsForUser: findAllFactsForUser
    };

    return api;

    function createFact(fact){
        facts.push(fact);
        return facts;
    }

    function updateFactById(factId, newFact){

        for (var factIndex in facts) {
            if (facts[factIndex]._id == factId){

                facts[factIndex]._id = newFact._id;


                if(facts[factIndex].userId != newFact.userId && newFact.userId != "") {
                    facts[factIndex].userId = newFact.userId;
                }

                return facts[factIndex];
            }
        }

        return null;
    }

    function deleteFactById(factId){
        for (var factIndex in facts){
            if (facts[factIndex]._id == factId){
                facts.splice(factIndex, 1)
            }
        }
    }

    function findAllFacts() {
        return facts;
    }

    function findAllFactsForUser(userId){
        var factsForUser = [];
        for (var factIndex in facts){
            if (facts[factIndex].userId == userId){
                factsForUser.push(facts[factIndex]);
            }
        }
        return factsForUser;
    }

    function findFactById(factId){
        for (var factIndex in facts){
            if (facts[factIndex]._id == factId){
                return facts[factIndex];
            }
        }
        return null;
    }
}
