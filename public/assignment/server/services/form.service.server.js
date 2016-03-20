/**
 * Created by vedant on 3/20/16.
 */

module.exports = function(app, formModel, uuid) {

    app.get("/api/assignment/user/:userId/form", getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function getFormsByUserId(req, res){
        var userId = req.params.userId;
        res.json(formModel.findAllFormsForUser(userId));
    }

    function getFormById(req, res){
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    }

    function createFormByUserId(req, res){
        var userId = req.params.userId;
        var formToCreate = req.body;
        formToCreate.fields = [];
        formToCreate.userId = userId;
        formToCreate._id = uuid.v1();
        res.json(formModel.createForm(formToCreate));
    }

    function updateFormById(req, res){
        var formId = req.params.formId;
        var updatedForm = req.body;
        res.json(formModel.updateFormById(formId, updatedForm));
    }

    function deleteFormById(req, res){
        var formId = req.params.formId;
        res.json(formModel.deleteFormByIn(formId));
    }
}
