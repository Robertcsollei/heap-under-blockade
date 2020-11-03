module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const category = require("../controllers/CategoryController")
  
    /**** Routes ****/
    router.get('/category', category.category_get_all);
  
    router.get('/category/:category_id', category.category_get_byid)
    
     router.post('/category', category.category_post_new);
  
    router.patch('/category/:category_id', category.category_patch);
  
    router.delete('/category/:category_id', category.category_delete);
  
  
  
    return router;
  }
  