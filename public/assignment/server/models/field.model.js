/**
 * Created by vedant on 3/20/16.
 */

var forms = require("./form.mock.json");

module.exports = function (uuid, formModel) {

    var api = {
        createFieldInForm: createFieldInForm,
        deleteFeildInForm: deleteFeildInForm,
        findFieldInForm: findFieldInForm,
        updateFieldInForm: updateFieldInForm,
        findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function createFieldInForm(formId, field){
        var form = formModel.findFormById(formId);
        field._id = uuid.v1();
        form.fields.push(field);
    }

    function deleteFeildInForm(formId, fieldId){
        var form = formModel.findFormById(formId);
        var formFields = form.fields;

        for(fieldIndex in formFields) {
            if(formFields[fieldIndex]._id == fieldId){
                fields.splice(fieldIndex, 1);
            }
        }
    }

    function findFieldInForm(formId, fieldId){
        var form = formModel.findFormById(formId);
        var formFields = form.fields;
        for (fieldIndex in formFields) {
            if (formFields[fieldIndex]._id == fieldId){
                return formFields[fieldIndex];
            }
        }
    }

    function updateFieldInForm(formId, fieldId, fieldToUpdate){
        var form = formModel.findFormById(formId);
        var formFields = form.fields;
        for(fieldIndex in formFields) {
            if (formFields[fieldIndex]._id == fieldId){
                formFields[fieldIndex] = fieldToUpdate;
            }
        }
    }


    function findFieldsByFormId(formId){
        var form = formModel.findFormById(formId);
        return form.fields;
    }


}