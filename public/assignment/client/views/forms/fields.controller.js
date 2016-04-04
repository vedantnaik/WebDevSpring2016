/**
 * Created by vedant on 2/21/16.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService, FormService, UserService){

        var vm = this;

        vm.addField = addField;
        vm.updateField = updateField;
        vm.updateFields = updateFields;
        vm.removeField = removeField;

        vm.renderModal = renderModal;

        vm.field = {};

        function init(){

            vm.formId = $routeParams.formId;
            UserService
                .getCurrentUser()
                .then(
                    function(response){
                        vm.currentUser = response.data;
                        updateFormFieldsListForUser();
                    }
                );

            FormService
                .findFormById(vm.formId)
                .then(
                    function(response){
                        vm.form = response.data;
                    }
                );
        }

        var sortableEle;


        vm.dragStart = function(e, ui) {
            ui.item.data('start', ui.item.index());
        };
        vm.dragEnd = function(e, ui) {
            var start = ui.item.data('start'),
                end = ui.item.index();

            vm.fields.splice(end, 0, vm.fields.splice(start, 1)[0]);

            vm.$apply();
        };

        sortableEle = $('#sortable').sortable({
            start: vm.dragStart,
            update: vm.dragEnd
        });

        return init();


        function addField(type){
            if(!type) return;

            var fieldToAdd = {"type" : type};

            if (type == "TEXT"){

                fieldToAdd = {
                    label: "New Text Field",
                    type : "TEXT",
                    placeholder : "New Field"
                }
            }
            else if (type == "TEXTAREA"){
                fieldToAdd = {
                    label: "New Text Field",
                    type : "TEXTAREA",
                    placeholder : "New Field"
                }
            }
            else if (type == "DATE"){
                fieldToAdd = {
                    label: "New Date Field",
                    type : "DATE"
                }
            }
            else if (type == "OPTIONS"){
                fieldToAdd = {
                    label: "New Dropdown",
                    type : "OPTIONS",
                    options : [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                }
            }
            else if (type == "CHECKBOXES"){
                fieldToAdd = {
                    label: "New Checkboxes",
                    type : "CHECKBOXES",
                    options : [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                }
            }
            else if (type == "RADIOS"){
                fieldToAdd = {
                    label: "New Radio Buttons",
                    type : "RADIOS",
                    options : [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }
            }

            FieldService
                .createFieldForForm(vm.formId, fieldToAdd)
                .then(
                    function( res ){
                        updateFormFieldsListForUser();
                    },
                    function( err ){
                        console.log("UNABLE TO CREATE FIELD");
                    }
                );
        }

        function updateField(newField) {
            if(newField.optionsStr) {
                var newOptions = [];
                var optionLine = vm.field.optionsStr.split("\n");
                for(var o in optionLine) {
                    if (optionLine[o]) {
                        var items = optionLine[o].split(":");
                        var option = {"label": items[0], "value": items[1]};
                        newOptions.push(option);
                    }
                }
                newField.options = newOptions;
                delete newField.optionsStr;
            }
            FieldService
                .updateField(vm.formId, newField._id, newField)
                .then(function (response) {
                    vm.fields = response.data;
                });
        }

        function updateFields() {
            FormService
                .sortFields(vm.formId,vm.fields)
                .then(function (response) {
                    console.log("after sorting");
                    console.log(response.data)
                    vm.fields = response.data.fields;
                });
        }


        function removeField(fieldId) {
            FieldService
                .deleteFieldFromForm(vm.formId, fieldId)
                .then(function (response) {
                    vm.fields = response.data;
                });
        }



        function renderModal(fieldId){
            var fieldIndex;
            for (fieldIndex in vm.fields){
                if(vm.fields[fieldIndex] === fieldId){
                    break;
                }
            }
            vm.field = angular.copy(vm.fields[fieldIndex]);

            if(vm.field.options) {
                vm.field.optionsStr = "";
                for(var optIndex in vm.field.options){
                    vm.field.optionsStr += vm.field.options[optIndex].label.toString() + ":" +
                                            vm.field.options[optIndex].value.toString() + "\n";
                }
            }

            $("#myModal").modal();
        }

        function createField(field){

            if (vm.editHuh){
                vm.editHuh = false;
                editField(field);
            } else {

                FieldService
                    .createFieldForForm($routeParams.formId, vm.field)
                    .then(
                        function(response){
                            init();
                        },
                        function( err ){
                            console.log("UNABLE TO CREATE FIELD");
                        }
                    );
            }

        }


        function updateFormFieldsListForUser(){
            FieldService
                .getFieldsForForm(vm.formId)
                .then(function (response) {
                    vm.fields = response.data;
                });
        }
    }
})();