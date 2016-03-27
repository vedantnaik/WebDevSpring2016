/**
 * Created by vedant on 3/27/16.
 */

module.exports = function(app, factModel, uuid) {

    app.get("/api/f1explorer/user/:userId/fact", getFactsByUserId);
    app.get("/api/f1explorer/fact/:factId", getFactById);
    app.post("/api/f1explorer/user/:userId/fact", createFactByUserId);
    app.put("/api/f1explorer/fact/:factId", updateFactById);
    app.delete("/api/f1explorer/fact/:factId", deleteFactById);

    function getFactsByUserId(req, res){
        var userId = req.params.userId;
        res.json(factModel.findAllFactsForUser(userId));
    }

    function getFactById(req, res){
        var factId = req.params.factId;
        res.json(factModel.findFactById(factId));
    }

    function createFactByUserId(req, res){
        var userId = req.params.userId;
        var factToCreate = req.body;
        factToCreate.fields = [];
        factToCreate.userId = userId;
        factToCreate._id = uuid.v1();
        res.json(factModel.createFact(factToCreate));
    }

    function updateFactById(req, res){
        var factId = req.params.factId;
        var updatedFact = req.body;
        res.json(factModel.updateFactById(factId, updatedFact));
    }

    function deleteFactById(req, res){
        var factId = req.params.factId;
        res.json(factModel.deleteFactByIn(factId));
    }
}
