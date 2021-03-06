/**
 * Created by vedant on 3/20/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            reorderFields: reorderFields
        };

        return api;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId){
            //console.log("CLIENT SIDE GET FIELDS FOR FORM");
            //console.log(formId);
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field){
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function reorderFields(formId,fields){
            return $http.put("/api/assignment/form/" + formId + "/field", fields);
        }
    }

})();
