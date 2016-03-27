/**
 * Created by vedant on 3/20/16.
 */

module.exports = function (app, quizModel, questionModel, uuid) {

    app.get("/api/f1explorer/quiz/:quizId/question", getQuestionsForQuizIdById);
    app.get("/api/f1explorer/quiz/:quizId/question/:questionId", getQuestionByIdInQuizById);
    app.delete("/api/f1explorer/quiz/:quizId/question/:questionId", deleteQuestionByIdInQuizById);
    app.post("/api/f1explorer/quiz/:quizId/question", addQuestionInQuizById);
    app.put("/api/f1explorer/quiz/:quizId/question/:questionId", updateQuestionByIdInQuizById);


    function getQuestionsForQuizIdById (req, res) {
        //console.log(req.params);
        var quizId = req.params.quizId;
        res.json(questionModel.findQuestionsByQuizId(quizId));
    }

    function getQuestionByIdInQuizById (req, res) {
        var questionId = req.params.questionId;
        var quizId = req.params.quizId;
        res.json(questionModel.findQuestionInQuiz(quizId,questionId));
    }

    function deleteQuestionByIdInQuizById (req, res) {
        var questionId = req.params.questionId;
        var quizId = req.params.quizId;
        questionModel.deleteQuestionInQuiz(quizId, questionId);
        res.send(200);
    }

    function addQuestionInQuizById (req, res) {
        var quizId = req.params.quizId;
        var question = req.body;
        res.json(questionModel.createQuestionInQuiz(quizId, question));
    }

    function updateQuestionByIdInQuizById(req, res) {
        var questionId = req.params.questionId;
        var quizId = req.params.quizId;
        var questionToUpdate = req.body;
        res.json(questionModel.updateQuestionInQuiz(quizId, questionId, questionToUpdate))
    }


}