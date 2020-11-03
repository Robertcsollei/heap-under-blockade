module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const comment = require("../controllers/CommentController")
  
    /**** Routes ****/
    router.get('/comment', comment.comment_get_all_byUser);
  
    router.get('/comment/:comment_id', comment.comment_get_byid)
    
     router.post('/comment/:question_id', comment.comment_post_new);
  
     router.patch('/comment/votes/:comment_id', comment.comment_modify_voted)
  
    router.patch('/comment/:comment_id', comment.comment_patch);
  
    router.delete('/comment/:comment_id', comment.comment_delete);
  

  
    return router;
  }
  