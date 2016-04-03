/**
 * Created by vedant on 3/20/16.
 */

var q = require("q");
//var forms = require("./form.mock.json");

module.exports = function (formModel, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('FieldModel', FieldSchema);

    var api = {
        findFieldById: findFieldById,
        createField: createField,
        deleteField: deleteField,
        updateField: updateField,

        //createFieldInForm: createFieldInForm,
        //deleteFieldInForm: deleteFieldInForm,
        //findFieldInForm: findFieldInForm,
        //updateFieldInForm: updateFieldInForm,
        //findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function findFieldById(fieldId) {
        var deferred = q.defer();
        FieldModel.findById(fieldId,
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createField(field) {
        var deferred = q.defer();
        FieldModel.create(field,
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteField(fieldId) {
        var deferred = q.defer();
        FieldModel.remove({_id: fieldId}, function(err, doc){
            if(err) {
                deferred.reject(err);
            }
            else {
                FieldModel.findById(fieldId,
                    function(err, doc) {
                        if(err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
            }
        });
        return deferred.promise;
    }

    function updateField(fieldId, field) {
        //forms[index].fields[i] = JSON.parse(JSON.stringify(field));
        var deferred = q.defer();
        // create new field without an _id field
        var newField = {
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        };
        FieldModel.update(
            {_id: fieldId},
            {$set: newField},
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    FieldModel.findById(fieldId,
                        function(err, doc) {
                            if(err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(doc);
                            }
                        });
                }
            });
        return deferred.promise;
    }




    //
    //
    //
    //function createFieldInForm(formId, field){
    //    var form = formModel.findFormById(formId);
    //    field._id = uuid.v1();
    //    form.fields.push(field);
    //    return form.fields;
    //}
    //
    //function deleteFieldInForm(formId, fieldId){
    //    var form = formModel.findFormById(formId);
    //    var formFields = form.fields;
    //
    //    for(fieldIndex in formFields) {
    //        if(formFields[fieldIndex]._id == fieldId){
    //            formFields.splice(fieldIndex, 1);
    //        }
    //    }
    //}
    //
    //function findFieldInForm(formId, fieldId){
    //    var form = formModel.findFormById(formId);
    //    var formFields = form.fields;
    //    for (fieldIndex in formFields) {
    //        if (formFields[fieldIndex]._id == fieldId){
    //            return formFields[fieldIndex];
    //        }
    //    }
    //}
    //
    //function updateFieldInForm(formId, fieldId, fieldToUpdate){
    //    var form = formModel.findFormById(formId);
    //    var formFields = form.fields;
    //    for(fieldIndex in formFields) {
    //        if (formFields[fieldIndex]._id == fieldId){
    //            formFields[fieldIndex] = fieldToUpdate;
    //        }
    //    }
    //}
    //
    //
    //function findFieldsByFormId(formId){
    //    var form = formModel.findFormById(formId);
    //    return form.fields;
    //}


}