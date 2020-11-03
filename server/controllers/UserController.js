require('dotenv').config() 
const mongoose = require("mongoose")
const userModel = require("../models/users")



exports.user_get_all = (req,res) =>{
    userModel.find()
    .exec()
    .then(doc =>{
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

exports.user_post_new = (req, res) => {
    let user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        UserName: req.body.userName,
        Password: req.body.password,
        Email: req.body.email,
        Description: req.body.description,
        RegistrationDate: Date.now(),
        UserRole: req.body.role_id,
        isBlocked: false,
        ProfileImage: req.body.profileImage
    })
    return user.save()
}

exports.user_get_byid = (req, res) => {
    userModel.findById(req.params.user_id)
    .then(user => {
      if(!user){
          return res.status(404).json({
              error: "user does not exists"
          })
      }
      return res.status(200).json(user)
    })
    }
    
    exports.user_patch = (req, res) => {
      const id = req.params.user_id;
      const updatedOps = {};
      for(const ops of Object.keys(req.body)){
          updatedOps[ops.propName] = ops.value; 
      }
      userModel.updateOne({ _id: id }, { $set: updatedOps }).exec()
    }
    
    exports.user_delete = (req, res) => {
      let id = req.params.user_id
      userModel.deleteOne({_id: id})
      .exec()
      .then(result => {
          res.status(200).json({
              deletedElemenetd: result
          })
      })
    }
    