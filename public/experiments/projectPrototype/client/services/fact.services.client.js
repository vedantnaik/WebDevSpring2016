/**
 * Created by vedant on 3/27/16.
 */

(function (){

    angular
        .module("ProjectPrototypeApp")
        .factory("FactService", FactService);

    function FactService($http){

        var api = {
            createFactForUser: createFactForUser,
            findAllFactsForUser: findAllFactsForUser,
            deleteFactById: deleteFactById,
            updateFactById: updateFactById,
            findFactById: findFactById
        };
        return api;


        function createFactForUser(userId, fact){
            return $http.post("/api/f1explorer_poc/user/"+userId+"/fact",fact);
        }

        function findAllFactsForUser(userId){
            return $http.get("/api/f1explorer_poc/user/"+userId+"/fact");
        }

        function deleteFactById(factId){
            return $http.delete("/api/f1explorer_poc/fact/"+factId);
        }

        function updateFactById(factId, newFact){
            return $http.put("/api/f1explorer_poc/fact/"+factId, newFact);
        }

        function findFactById(factId){
            return $http.get("/api/f1explorer_poc/fact/"+factId);
        }

    }

})();