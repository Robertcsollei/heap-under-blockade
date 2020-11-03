module.exports = () => {
  const express = require("express");
  const router = express.Router();
  const questions = require("../controllers/QuestionController")

  /**** Routes ****/
  router.get('/question', questions.questions_get_all);

  router.get('/question/:question_id', questions.question_get_byid)
  
  router.post('/question',questions.question_post_new);

  router.get('/getQuestions/:category_id', questions.question_get_byCat)

  router.patch('/question/:question_id', questions.question_patch);

  router.patch('/question/votes/:question_id', questions.question_modify_votes);

  router.delete('/question', questions.question_delete);


  router.get('/question/:name', async (req, res) => {
    res.json({msg: `Hello, ${req.params.name}`});
  });

  return router;
}
