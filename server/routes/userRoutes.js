module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const user = require("../controllers/UserController")
  
    /**** Routes ****/
    router.get('/user', user.user_get_all);

    router.post('/user', user.user_post_new);
  
    router.get('/user/:user_id', user.user_get_byid)
  
    router.patch('/user/:user_id', user.user_patch);
  
    router.delete('/user/:user_id', user.user_delete);
  
  
    return router;
  }
  