module.exports = () => {
    const express = require("express");
    const router = express.Router();
    const roles = require("../controllers/RoleController")
  
    /**** Routes ****/
    router.get('/role', roles.role_get_all);
  
    router.get('/role/:role_id', roles.role_get_byid)
    
    router.post('/role',roles.role_post_new);
  
  
    router.patch('/role/:role_id', roles.role_patch);
  
    router.delete('/role/:role_id', roles.role_delete);
  
  
  
    return router;
  }
  