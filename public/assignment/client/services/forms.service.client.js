/**
 * Created by vedant on 2/29/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById,
            sortFields: sortFields
        }
        return api;

        function createFormForUser(userId, form){
            return $http.post("/api/assignment/user/"+userId+"/form",form);
        }

        function findAllFormsForUser(userId){
            console.log("looking for forms for userid " + userId);
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/"+formId,newForm);
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/"+formId);
        }

        function sortFields(formId,fields){
            return $http.put("/api/assignment/form/" + formId + "/field/", fields);
        }
    }
})();