/**
 * Created by vedant on 3/20/16.
 */

module.exports = function (app, formModel, fieldModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsForFormIdById);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByIdInFormById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdInFormById);
    app.post("/api/assignment/form/:formId/field", addFieldInFormById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdInFormById);


    function getFieldsForFormIdById (req, res) {
        //console.log(req.params);
        var formId = req.params.formId;
        //res.json(fieldModel.findFieldsByFormId(formId));

        formModel.findFormById(formId)
            .then(
                function(form) {
                    res.json(form.fields);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function getFieldByIdInFormById (req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        //res.json(fieldModel.findFieldInForm(formId,fieldId));
        fieldModel.findFieldById(fieldId)
            .then(
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function deleteFieldByIdInFormById (req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        //fieldModel.deleteFieldInForm(formId, fieldId);
        //res.send(200);

        formModel.findFormById(formId)
            .then(
                function(form) {
                    fieldModel.deleteField(fieldId)
                        .then(
                            function (doc) {
                                form.fields.id(fieldId).remove();
                                form.save();
                                res.json(form.fields);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function addFieldInFormById (req, res) {
        var formId = req.params.formId;
        var field = req.body;
        //res.json(fieldModel.createFieldInForm(formId, field));

        formModel.findFormById(formId)
            .then(
                function(form) {
                    fieldModel.createField(field)
                        .then(
                            function (field) {
                                form.fields.push(field);
                                form.save();
                                res.json(form.fields);
                            },
                            function(err) {
                                res.status(400).send(err);
                            });
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function updateFieldByIdInFormById(req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var fieldToUpdate = req.body;
        //res.json(fieldModel.updateFieldInForm(formId, fieldId, fieldToUpdate))
        formModel
            .findFormById(formId)
            .then(
                function(form) {
                    fieldModel
                        .updateField(fieldId, fieldToUpdate)
                        .then(
                            function(field){
                                form.fields.id(fieldId).remove();
                                form.fields.push(field);
                                form.save();
                                res.json(form.fields);
                            },
                            function(err){ res.status(400).send(err); }
                        );
                },
                function(err) { res.status(400).send(err); }
            );
    }


}