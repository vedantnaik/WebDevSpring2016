/**
 * Created by vedant on 3/20/16.
 */

module.exports = function (app, questionModel) {

    app.get("/api/f1explorer/question/:questionId", getQuestionsById);
    app.get("/api/f1explorer/quiz/:quizId/question/", getQuestionsInQuizById);
    app.get("/api/f1explorer/user/:userId/question/", getQuestionsForUserById);

    app.post("/api/f1explorer/question", addQuestion);

    app.put("/api/f1explorer/question/:questionId", updateQuestionById);

    app.delete("/api/f1explorer/question/:questionId", deleteQuestionById);

    function getQuestionsById(req, res){
        var questionId = req.params.questionId;

        questionModel
            .findQuestionById(questionId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getQuestionsInQuizById(req, res){
        var quizId = req.params.quizId;

        questionModel
            .findQuestionsByQuizId(quizId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getQuestionsForUserById(req, res){
        var userId = req.params.userId;

        questionModel
            .findQuestionsByUserId(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function addQuestion(req, res){
        var question = req.body;
        questionModel
            .createQuestion(question)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateQuestionById(req, res){
        var question = req.body;
        var questionId = req.params.id;

        questionModel
            .updateUser(questionId, question)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteQuestionById(req, res){
        var questionId = req.params.id;

        questionModel
            .deleteQuestionById(questionId)
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