/**
 * Created by vedant on 3/20/16.
 */

module.exports = function(app, formModel) {

    app.get("/api/assignment/user/:userId/form", getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.put("/api/assignment/form/:formId/field/", sortFields);

    function getFormsByUserId(req, res){
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId)
            .then(function (forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function getFormById(req, res){
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function createFormByUserId(req, res){
        var userId = req.params.userId;
        var formToCreate = req.body;
        formModel.createFormForUser(userId, formToCreate)
            .then(
                function (form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res){
        var formId = req.params.formId;
        var updatedForm = req.body;
        formModel.updateForm(formId, updatedForm)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function deleteFormById(req, res){
        var formId = req.params.formId;
        formModel.deleteForm(formId)
            .then(
                function() {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function sortFields(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        formModel.sortFields(formId, fields)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }
}
