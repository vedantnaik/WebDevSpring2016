/**
 * Created by vedant on 3/27/16.
 */

module.exports = function(app, factModel, uuid) {

    app.get("/api/f1explorer_poc/user/:userId/fact", getFactsByUserId);
    app.get("/api/f1explorer_poc/fact/:factId", getFactById);
    app.post("/api/f1explorer_poc/user/:userId/fact", createFactByUserId);
    app.put("/api/f1explorer_poc/fact/:factId", updateFactById);
    app.delete("/api/f1explorer_poc/fact/:factId", deleteFactById);

    function getAllFacts(req, res){
        // first find CRRs
        factModel
            .findAllConstructorRaceResultFacts()
            .then(
                function (doc){
                    // store whatever result found
                    var storedDoc = doc;
                    // then look for DRRs
                    factModel
                        .findAllDriverRaceResultFacts()
                        .then(
                            function (doc) {
                                // concat both docs and respond
                                res.json(storedDoc.concat(doc));
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFactsByUserId(req, res){
        var userId = req.params.userId;

        console.log("get facts for user " + userId);

        // first find CRRs
        factModel
            .findAllConstructorRaceResultFactsForUser(userId)
            .then(
                function (doc){
                    // store whatever result found
                    var storedDoc = doc;
                    // then look for DRRs
                    factModel
                        .findAllDriverRaceResultFactsForUser(userId)
                        .then(
                            function (doc) {
                                // concat both docs and respond
                                res.json(storedDoc.concat(doc));
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFactById(req, res){
        var factId = req.params.factId;

        factModel
            .findDriverRaceResultFactById(factId)
            .then(
                function(doc){
                    if(doc){
                        // Fact found in DRR
                        res.json(doc);
                    } else {
                        // look for fact in CRR
                        factModel
                            .findConstructorRaceResultFactById(factId)
                            .then(
                                function(factFound){
                                    res.json(factFound);
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createFactByUserId(req, res){
        var userId = req.params.userId;
        var factToCreate = req.body;
        factToCreate.userId = userId;

        if(factToCreate.factType == "DRR"){
            factModel
                .createDriverRaceResultFact(factToCreate)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            factModel
                .createConstructorRaceResultFact(factToCreate)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function updateFactById(req, res){
        var factId = req.params.factId;
        var updatedFact = req.body;

        if(updatedFact.factType == "DRR"){
            factModel
                .updateDriverRaceResultFactById(factId, updatedFact)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            factModel
                .updateConstructorRaceResultFactById(factId, updatedFact)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function deleteFactById(req, res){
        var factId = req.params.factId;

        factModel
            .findDriverRaceResultFactById(factId)
            .then(
                function(doc){
                    if(doc){
                        factModel
                            .deleteDriverRaceResultFactById(factId)
                            .then(
                                function (doc) {
                                    res.json(doc);
                                },
                                function (err) {
                                    res.send(400).send(err);
                                }
                            );
                    } else {
                        // look for fact in CRR
                        factModel
                            .deleteConstructorRaceResultFactById(factId)
                            .then(
                                function (doc) {
                                    res.json(doc);
                                },
                                function (err) {
                                    res.send(400).send(err);
                                }
                            );
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}
