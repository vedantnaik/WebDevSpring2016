/**
 * Created by vedant on 3/20/16.
 */

module.exports = function(app, quizModel) {

    app.post("/api/f1explorer/user/:userId/quiz", createQuizByUserId);
    app.put("/api/f1explorer/quiz/:quizId", updateQuizById);
    app.delete("/api/f1explorer/quiz/:quizId", deleteQuizById);

    app.get("/api/f1explorer/quizzes/", getAllQuizzes);
    app.get("/api/f1explorer/quiz/:quizId", getQuizById);
    app.get("/api/f1explorer/quizzes/quiz/:quizTitle", getQuizzesByTitle);
    app.get("/api/f1explorer/quizzes/user/:userId/quiz/:quizTitle",
        getQuizzesForUserByTitle);
    app.get("/api/f1explorer/quizzes/user/:userId", getAllQuizzesForUser);

    app.get("/api/f1explorer/quizzes/published/", getPublishedQuizzes);

    function createQuizByUserId(req, res){
        var userId = req.params.userId;
        var quizToCreate = req.body;
        quizToCreate.userId = userId;

        quizModel
            .createQuiz(quizToCreate)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateQuizById(req, res){
        var quizId = req.params.quizId;
        var updatedQuiz = req.body;

        quizModel
            .updateQuizById(quizId, updatedQuiz)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteQuizById(req, res){
        var quizId = req.params.quizId;

        quizModel
            .deleteQuizById(quizId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllQuizzes(req, res){
        quizModel
            .findAllQuizzes()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getQuizById(req, res){
        var quizId = req.params.quizId;

        quizModel
            .findQuizById(quizId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getQuizzesByTitle(req, res){
        var quizTitle = req.params.quizTitle;

        quizModel
            .findQuizzesByTitle(quizTitle)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getQuizzesForUserByTitle(req, res){
        var userId = req.params.userId;
        var quizTitle = req.params.quizTitle;

        quizModel
            .findQuizzesForUserByTitle(userId, quizTitle)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllQuizzesForUser(req, res){
        var userId = req.params.userId;

        quizModel
            .findAllQuizzesForUser(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getPublishedQuizzes(req, res){

        quizModel
            .findAllPublishedQuizzes()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}
