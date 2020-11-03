const mongoose = require("mongoose")
const roleModel = require("../models/roles")

exports.role_get_all = (req,res) =>{
    roleModel.find()
    .exec()
    .then(doc =>{
        
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

exports.role_post_new = (req, res) => {
    let role = new roleModel({
        _id: new mongoose.Types.ObjectId(),
        RoleName: req.body.RoleName,
        DeleteComments: req.body.DeleteComments,
    })
    return role.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /role",
          createdProduct: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.role_get_byid = (req, res) => {
    roleModel.findById(req.params.role_id)
    .then(role => {
      if(!role){
          return res.status(404).json({
              error: "role does not exists"
          })
      }
      return res.status(200).json(role) 
    })
    }
    
    exports.role_patch = (req, res) => {
      const id = req.params.role_id;
      const updatedOps = {};
      for(const ops of req.body){
          updatedOps[ops.propName] = ops.value; 
      }
      questionModel.updateOne({ _id: id }, { $set: updatedOps })
    }
    
    exports.role_delete = (req, res) => {
      let id = req.params.role_id
      questionModel.deleteOne({_id: id})
      .exec()
      .then(result => {
          res.status(200).json({
              deletedElemenetd: result
          })
      })
    }
    