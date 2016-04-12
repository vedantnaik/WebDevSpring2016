/**
 * Created by vedant on 3/20/16.
 */

module.exports = function(app, quizModel, uuid) {

    app.get("/api/f1explorer_poc/user/:userId/quiz", getQuizsByUserId);
    app.get("/api/f1explorer_poc/quiz/:quizId", getQuizById);
    app.post("/api/f1explorer_poc/user/:userId/quiz", createQuizByUserId);
    app.put("/api/f1explorer_poc/quiz/:quizId", updateQuizById);
    app.delete("/api/f1explorer_poc/quiz/:quizId", deleteQuizById);

    function getQuizsByUserId(req, res){
        var userId = req.params.userId;
        res.json(quizModel.findAllQuizsForUser(userId));
    }

    function getQuizById(req, res){
        var quizId = req.params.quizId;
        res.json(quizModel.findQuizById(quizId));
    }

    function createQuizByUserId(req, res){
        var userId = req.params.userId;
        var quizToCreate = req.body;
        quizToCreate.fields = [];
        quizToCreate.userId = userId;
        quizToCreate._id = uuid.v1();
        res.json(quizModel.createQuiz(quizToCreate));
    }

    function updateQuizById(req, res){
        var quizId = req.params.quizId;
        var updatedQuiz = req.body;
        res.json(quizModel.updateQuizById(quizId, updatedQuiz));
    }

    function deleteQuizById(req, res){
        var quizId = req.params.quizId;
        res.json(quizModel.deleteQuizByIn(quizId));
    }
}
